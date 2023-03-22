import requests
from datetime import datetime, timedelta
import json

def percentage(part, whole):
    if whole == 0:
        return "N/A"
    else:
        percentage = 100 * float(part) / float(whole)
        return round(percentage, 2)

class company_data:
    def __init__(self, full_name, ltp, closep, change, ycp, trading_code):
        self.full_name = full_name
        self.ltp = ltp
        self.closep = closep
        self.change = change
        self.ycp = ycp
        self.trading_code = trading_code
        self.percentage = percentage(abs(ycp - ltp), ycp)

def get_market_data():
    arr = []
    response = requests.get(
        "https://www.amarstock.com/LatestPrice/34267d8d73dd?fbclid=IwAR3Nnl2tdnlEuJTOlZgH4yBuQR9ngbSg7y70e_kskcaWqwBfdqSkE7E8-II")

    for item in response.json():
        obj = company_data(item['FullName'], item['LTP'], item['Close'], item['Change'], item['YCP'], item['Scrip'])
        arr.append(obj.__dict__)

    return arr
