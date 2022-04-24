import base64
from io import BytesIO, StringIO
import numpy as np

import time
from flask import Flask, jsonify, send_file
import matplotlib.pyplot as plt

app = Flask(__name__)


@app.route('/')
def landingpage():
    return "hello world :)"


@app.route('/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/data')
def get_data():  # put application's code here
    # just making data straight up using numpy random generator here:

    np_arr = np.array([np.random.random(10) for i in range(7)])
    # print(np_arr.shape)

    week_days = ['s', 'm', 't', 'w', 'th', 'f', 's']

    data = []
    for idx, day in enumerate(week_days):
        data.append({
            'label': day,
            'x': idx,
            'y': np.mean(np_arr[idx])
        })

    # data = [
    #     {'label': "S", 'x': 0, 'y': np.mean(np_arr[0])},
    #     {'label': "M", 'x': 1, 'y': np.mean(np_arr[0])},
    #     {'label': "T", 'x': 2, 'y': 0},
    #     {'label': "W", 'x': 3, 'y': 0},
    #     {'label': "TH", 'x': 4, 'y': 400},
    #     {'label': "F", 'x': 5, 'y': 400},
    #     {'label': "S", 'x': 6, 'y': 400}
    # ]
    # print(data)
    return jsonify(data)


@app.route('/dataplot')
def plot_data():
    # Generate the figure **without using pyplot**.
    # fig = Figure()
    print('plotting...')
    fig, ax = plt.subplots(figsize=[8, 4])
    ax.plot(np.random.random(100))
    # Save it to a temporary buffer.
    format_ = 'png'
    if format_ == 'png':
        content_type_tag_ = 'image/png'
        imdata = BytesIO()
        fig.savefig(imdata, format='png')
        imdata.seek(0)
        # buf = imdata
        # buf = buf.getbuffer()

        # return send_file(imdata, mimetype='image/png')
    elif format_ == 'svg':
        content_type_tag_ = 'image/svg+xml'
        imdata = BytesIO()
        fig.savefig(imdata, format='svg')
        # imdata.seek(0)
        buf = imdata.getvalue()

    # Embed the result in the html output.
    # data = base64.b64encode(buf).decode("ascii")
    # print(data)
    # return f"<img src='data:{content_type_tag_};base64,{data}'/>"
    return send_file(imdata, download_name='plot.png', mimetype='image/png')

@app.route('/livedata')
def yield_livedata():
    def generate():
        for i in range(10):
            yield f"{i} - livedata\n"

    return app.response_class(generate(), mimetype='text')


if __name__ == '__main__':
    app.run()
