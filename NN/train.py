import os
import tensorflow as tf
from keras.callbacks import ReduceLROnPlateau
import numpy as np
import configuration
from lstm import cnn_lstm_model
from data_processing import generate_train_dataset
from evaluation import evaluate

def get_model():
    if configuration.model_name == "CNN":
        model = cnn_lstm_model()

    # model.summary()
    if configuration.optimizer_fn == 'sgd':
        optimizer = tf.keras.optimizers.SGD(configuration.learning_rate, configuration.momentum)
    elif configuration.optimizer_fn == 'adam':
        optimizer = tf.keras.optimizers.Adam(configuration.learning_rate, configuration.momentum)
    elif configuration.optimizer_fn == 'rmsprop':
        optimizer = tf.keras.optimizers.RMSprop(configuration.learning_rate, configuration.momentum)
    else:
        print("add another optimizer")
    
    model.compile(optimizer= optimizer,
                    loss=configuration.loss_fn,
                    metrics=['accuracy'])
  

    return model

if __name__ == '__main__':
    # GPU settings
    gpus = tf.config.experimental.list_physical_devices('GPU')
    if gpus:
        for gpu in gpus:
            tf.config.experimental.set_memory_growth(gpu, True)
            print(f"GPU found: {gpu}")
    for data_file in configuration.data_files:
      if not os.path.exists(configuration.result_dir):
          os.mkdir(configuration.result_dir)
      result_save_path = os.path.join(configuration.result_dir, configuration.model_name)
      if not os.path.exists(result_save_path):
          os.mkdir(result_save_path)
      log_dir = os.path.join(result_save_path, "logs/logs_{}_{}".format(configuration.version, data_file.split('.')[0]))
      if not os.path.exists(log_dir):
          os.mkdir(log_dir)
      log_train = os.path.join(log_dir, 'train')
      if not os.path.exists(log_train):
          os.mkdir(log_train)
      log_valid = os.path.join(log_dir, 'valid')
      if not os.path.exists(log_valid):
          os.mkdir(log_valid)
      train_dataset, valid_dataset = generate_train_dataset(data_file)
      model = get_model()
      tensorboard_callback = tf.keras.callbacks.TensorBoard(log_dir=log_dir)
      rlrop = ReduceLROnPlateau(monitor='val_loss', factor=0.1, patience=10)
      callback_list = [rlrop, tensorboard_callback]

      if configuration.model_name == "CNN":
        cnn_train = np.reshape(train_dataset[0], (train_dataset[0].shape[0], 25, 4, 2)) 
        cnn_valid = np.reshape(valid_dataset[0], (valid_dataset[0].shape[0], 25, 4, 2)) 
        
      model.fit(cnn_train, train_dataset[1],
                  epochs= configuration.EPOCHS,
                  validation_data=(cnn_valid, valid_dataset[1]),
                  batch_size = configuration.BATCH_SIZE,
                  callbacks=callback_list,
                  verbose=1)

      # save model
      model_name="{}_{}_{}".format(configuration.model_name, configuration.version, data_file.split('.')[0])
      model_save_path = os.path.join(result_save_path, model_name)
      model.save(model_save_path, save_format='tf')
      rmse = evaluate(data_file)
      text = f"{data_file} : {rmse}\n"
      with open("rmse.txt","a") as file:
          file.write(text)

      print(f"RMSE{rmse}")