import time
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import os
import requests
import logging
import json
import sys

app = Flask(__name__)
cors = CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/geo/my')
def geo_my():
    headers = dict(request.headers)
    ip = request.remote_addr
    if 'X-Forwarded-For' in headers:
        ip = headers['X-Forwarded-For'].split(",")[0]

    return geo(ip)

@app.route('/geo/<path:ip_address>')
def geo(ip_address):
    geoip_baseurl = os.environ['GEOIP_BASE']
    url = "{}/{}".format(geoip_baseurl,ip_address)
    err = None
    res = None
    try:
        resp = requests.get(url)
        if resp.status_code == 200:
            res = resp.json()
        else:
            raise ValueError("Geo lookup on {} resulted in {}".format(ip_address,resp.status_code))
    except:
        err = sys.exc_info()[1]

    if res is None or err is not None:
        res = {
          "country": None,
          "latitude": None,
          "longitude": None,
          "timezone": None,
          "hasError": True,
          "error": "{}".format(err)
        }

    res["ip"] = ip_address
    res["headers"] = dict(request.headers)

    return json.dumps(res)
