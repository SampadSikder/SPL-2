from sslcommerz_lib import SSLCOMMERZ 
from shurjopay_plugin import *
from aamarpay.aamarpay import aamarPay

def session_create(request):
    sp_config = ShurjoPayConfigModel(
    SP_USERNAME='sp_sandbox',
    SP_PASSWORD='pyyk97hu&6u6',
    SP_ENDPOINT='https://dev.engine.shurjopayment.com',
    SP_RETURN='https://dev.engine.shurjopayment.com/response',
    SP_CANCEL='https://dev.engine.shurjopayment.com/response',
    SP_PREFIX='NOK',
    SP_LOGDIR=''
    )
    shurjopay_plugin = ShurjopayPlugin(sp_config)
    payment_request = PaymentRequestModel(
                amount=1000,
                order_id='001',
                currency='BDT',
                customer_name='Mahabubul Hasan',
                customer_address='Mohakhali',
                customer_phone='01311310975',
                customer_city='Dhaka',
                customer_post_code='1229',
            )
    payment_details=shurjopay_plugin.make_payment(payment_request)
    print(payment_details)
    return 'xx'
    # pay = aamarPay(isSandbox=True,transactionAmount=600)
    # paymentpath = pay.payment()
    # return paymentpath
