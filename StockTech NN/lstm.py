import tensorflow as tf
from keras import Model, Sequential
from keras.layers import Dense, Bidirectional, LSTM, Dropout, TimeDistributed, Flatten, Conv1D, MaxPooling1D

def cnn_lstm_model():
  model_lstm = Sequential()
  model_lstm.add(TimeDistributed(Conv1D(32, 1), input_shape=(None, 4 , 2)))
  model_lstm.add(TimeDistributed(MaxPooling1D()))
  model_lstm.add(TimeDistributed(Flatten()))
  model_lstm.add(LSTM(32))
  model_lstm.add(Dense(2))

  return model_lstm