from flask import Flask, jsonify
import json

app = Flask(__name__)
app.secret_key = 'celeron0912'

j = open("data.json")
data = json.load(j)


def findOrder(order_id):
    for i in range (0,len(data['fulfillments'])):
        if data['fulfillments'][i]['order_id'] == order_id:
            return (data['fulfillments'][i])
    return 0

@app.route('/')
def index():
    return 'Hello!'

@app.route('/orderid/<int:id>', methods=['GET'])
def fulfillment(id):
    if findOrder(id) == 0:
        return jsonify({'status': 'failed', 'Error': 'cannot find order id', })
    else:
        return jsonify({'status': 'ok', 'resp': findOrder(id)})

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,Connection')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', True)
    return response

if __name__ == '__main__':
    app.run(debug=True,port=8000)