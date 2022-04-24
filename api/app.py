import base64
import time
from io import BytesIO, StringIO

import numpy as np
from flask import Flask, send_file, render_template
from matplotlib import pyplot as plt
from flask_cors import CORS
from data_model import generate_data


def create_app(data):
    app = Flask(__name__)
    CORS(app)

    @app.route('/')
    def hello_world(name=None):
        # return 'Hello World!'
        return render_template('index.html', name=name)

    @app.route('/data')
    def get_data():  # put application's code here
        assert type(data) == dict, 'incorrect type of data.'
        return data

    @app.route('/time')
    def get_current_time():
        return {'time': time.time()}

    @app.route('/dataplot.svg')
    def return_data_as_plot():
        # Generate the figure **without using pyplot**.
        # fig = Figure()
        print('plotting data as scatter plot ...\n')
        # print(data)
        assert type(data) == dict and 'scatterplotdata' in [*data], 'data needs to be a dict of key `scatterplotdata`, and containing x and y keys of equal length for scatter plot'
        # data = data['scatterplotdata']
        assert 'x' in data['scatterplotdata']
        assert 'y' in data['scatterplotdata']
        assert len(data['scatterplotdata']['x']) == len(data['scatterplotdata']['y']), f"mismatch in x length ({len(data['scatterplotdata']['x'])}) and y length ({len(data['scatterplotdata']['y'])}) "

        fig, ax = plt.subplots(figsize=[4, 4])
        # ax.plot(np.random.random(100))
        ax.scatter(data['scatterplotdata']['x'], data['scatterplotdata']['y'], alpha=0.4)
        # Save it to a temporary buffer.
        format_ = 'svg'
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
            imdata = BytesIO()  # use if using base64 encoding later
            # imdata = StringIO()
            fig.savefig(imdata, format='svg')
            imdata.seek(0)
            buf = imdata.getvalue()
            # return {'data': str(buf)}  # trying to see if nonbase64 encoding might work?
        else:
            raise ValueError('need to provide format as svg or png.')

        # Embed the result in the html output.
        # return send_file(imdata, download_name='plot.png', mimetype=content_type_tag_)

        data2 = base64.b64encode(buf).decode("ascii")
        # print(data2)
        # return f"<img src='data:{content_type_tag_};base64,{data2}'/>"  # for rendering directly from flask
        return {'data': str(data2)}  # this sends the data across as a SVG XML after converting to base64


    return app


def run_app(data):
    """
    Create and also run the newly created flask app.
    :param data: some data to pass through flask app.
    """
    app = create_app(data=data)
    app.run()


if __name__ == '__main__':
    app = create_app(data=generate_data())
    app.run()
