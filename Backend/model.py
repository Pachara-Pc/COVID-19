from ast import Str
from matplotlib.pyplot import table
from mongoengine import Document, StringField ,IntField

class Customer(Document):
    name = StringField(max_length=100)
    table = StringField(max_length=10)
    start = StringField(max_length=100)
    stop = StringField(max_length=100)
    status = StringField(max_length=10)