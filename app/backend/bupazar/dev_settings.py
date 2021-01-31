from .settings import *

# Override production settings
DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'djongo',
        'NAME': 'localBupazarDB',
        'host': 'localhost',
        'port': 27017,
    }
}
