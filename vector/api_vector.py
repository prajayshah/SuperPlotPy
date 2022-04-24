from flask import Flask, render_template


def create_app():
    app = Flask(__name__)

    @app.route('/')
    def landingpage():  # put application's code here
        print('landing page')
        return render_template('index.html', name=None)

    return app


def run_app(data):
    """
    Create and also run the newly created flask app.
    :param data: some data to pass through flask app.
    """
    app = create_app()
    app.run()

if __name__ == '__main__':
    app = Flask(__name__)


    @app.route('/')
    def landingpage():  # put application's code here
        print('landing page')
        return render_template('index.html', name=None)

    app.run()
