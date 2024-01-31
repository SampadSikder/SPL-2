import os
from sklearn.preprocessing import MinMaxScaler
from unittest import result

data_dir = 'CompanyData'

start_index = 246
end_index = 300

data_files = os.listdir(data_dir)[start_index:end_index] #'ACI.csv'

print('data files: ', data_files)

num_classes = 2
class_names = ['closing_price', 'volume']
train_test_ratio = .10
window = 100

EPOCHS = 100
BATCH_SIZE = 32

optimizer = "sgd"
optimizer_fn = "adam"
optimizer = "rmsprop"
loss_fn = 'mse'

learning_rate = 0.01
momentum = 0.9
model_name = "CNN"

result_dir = 'results'

scaler = MinMaxScaler(feature_range=(0,1))

version = '1.0'