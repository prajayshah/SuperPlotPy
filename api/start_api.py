import numpy as np

from app import run_app

data = {'scatterplotdata':
            {'x': np.linspace(-50, 50, 10).tolist(),
             'y': np.random.random(10).tolist()}
        }

run_app(data=data)
