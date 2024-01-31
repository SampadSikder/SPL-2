import tensorflow as tf

gpus = tf.config.list_physical_devices('GPU')
print(tf.__version_)
if gpus:
    for gpu in gpus:
        tf.config.experimental.set_memory_growth(gpu, True)
        print(f"GPU found: {gpu}")