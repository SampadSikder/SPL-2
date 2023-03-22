import pandas as pd
import ta,json,requests,os

def fetchData(request):
    # req=json.load(request)
    # code=req['code']
    # dateFrom=req['dateFrom']
    code='GP'
    dateFrom='2022-03-19'
    response = requests.get(f"https://www.amarstock.com/data/afe01cd8b512070a/?scrip={code}&cycle=Day1&dtFrom={dateFrom}T05%3A02%3A13.318Z&fbclid=IwAR0qZBhgiqSV6L6xTerlCEsXvVwtaLMaQvTqqMfUmjloMfBO2jocwV95DE8")
    if (response.status_code == 200):
        result = json.loads(response.text)
    df=pd.DataFrame(result)
    return df

def getSMA(request):
    df=fetchData(request)
    df['SMA50']= ta.trend.sma_indicator(df['Close'], window=50)
    
    df = df.fillna('')
    my_array = df['DateEpoch'].values
    array1=my_array.astype(str).tolist()
    last_50_elements = array1[-50:]
    array2 = df['SMA50'].values
    last_50_elements2 = array2[-50:]
    key_value_dict = {}
    for i in range(len(last_50_elements)):
        key_value_dict[last_50_elements[i]] = last_50_elements2[i]
    return key_value_dict

def getEMA(request):
    df=fetchData(request)

    ema = ta.trend.ema_indicator(df['Close'], window=50)
    df['EMA50']=ema
    df = df.fillna('')
    my_array = df['DateEpoch'].values
    array1=my_array.astype(str).tolist()
    last_50_elements = array1[-50:]
    array2 = df['EMA50'].values
    last_50_elements2 = array2[-50:]
    key_value_dict = {}
    for i in range(len(last_50_elements)):
        key_value_dict[last_50_elements[i]] = last_50_elements2[i]
    return key_value_dict

def getMACD(request):
    df=fetchData(request)
    macd = ta.trend.MACD(df['Close'])
    df['MACD'] = macd.macd()
    df = df.fillna('')
    my_array = df['DateEpoch'].values
    array1=my_array.astype(str).tolist()
    last_50_elements = array1[-50:]
    array2 = df['MACD'].values
    last_50_elements2 = array2[-50:]
    key_value_dict = {}
    for i in range(len(last_50_elements)):
        key_value_dict[last_50_elements[i]] = last_50_elements2[i]
    return key_value_dict

def getSTOCH(request):
    df=fetchData(request)
    stoch = ta.momentum.StochasticOscillator(high=df['High'], low=df['Low'], close=df['Close'], window=14, smooth_window=3)

    df['SlowK'] = stoch.stoch()
    df['SlowD'] = stoch.stoch_signal()
    df = df.fillna('')
    return df

def getBB(request):
    df=fetchData(request)
    bb = ta.volatility.BollingerBands(close=df['Close'], window=20, window_dev=2)

    df['UpperBB'] = bb.bollinger_hband()
    df['LowerBB'] = bb.bollinger_lband()
    df['MA_BB'] = (df['UpperBB'] + df['LowerBB']) / 2
    df = df.fillna('')
    return df

def getRSI(request):
    df=fetchData(request)
    rsi = ta.momentum.RSIIndicator(close=df['Close'], window=14)

    df['RSI'] = rsi.rsi()
    df = df.fillna('')
    return df



