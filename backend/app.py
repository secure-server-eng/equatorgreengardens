from flask import Flask, request, jsonify
import requests
from requests.auth import HTTPBasicAuth
import datetime
import base64

app = Flask(__name__)

# Safaricom credentials
CONSUMER_KEY = "your_consumer_key"
CONSUMER_SECRET = "your_consumer_secret"
BUSINESS_SHORT_CODE = "174379"
PASSKEY = "your_passkey"
API_URL = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
CALLBACK_URL = "https://yourdomain.com/callback"

# Generate Access Token
def get_access_token():
    auth_url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    response = requests.get(auth_url, auth=HTTPBasicAuth(CONSUMER_KEY, CONSUMER_SECRET))
    response_json = response.json()
    return response_json["access_token"]

# Generate STK Push Password
def generate_password():
    timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    password_str = BUSINESS_SHORT_CODE + PASSKEY + timestamp
    password = base64.b64encode(password_str.encode()).decode()
    return password, timestamp

# STK Push Endpoint
@app.route('/stkpush', methods=['POST'])
def stk_push():
    data = request.get_json()
    phone_number = data.get("phoneNumber")
    amount = data.get("amount")

    access_token = get_access_token()
    password, timestamp = generate_password()

    headers = {"Authorization": f"Bearer {access_token}"}
    payload = {
        "BusinessShortCode": BUSINESS_SHORT_CODE,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone_number,
        "PartyB": BUSINESS_SHORT_CODE,
        "PhoneNumber": phone_number,
        "CallBackURL": CALLBACK_URL,
        "AccountReference": "Resort123",
        "TransactionDesc": "Payment for Services",
    }

    response = requests.post(API_URL, json=payload, headers=headers)
    return jsonify(response.json())

if __name__ == "__main__":
    app.run(debug=True)
