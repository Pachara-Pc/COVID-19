
import json
import fastapi
from typing import Optional
from fastapi import FastAPI
from numpy import append
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from mongoengine import connect
import Command as CM 
# import Test.img as funcImg
from model import Customer
 

app = FastAPI()
connect(db="NSC",host="localhost",port=27017)

class Path(BaseModel):
    path: str
    person : list = []

class Person(BaseModel):
    name :str
    
class newCustomer(BaseModel):
    name: str
    table : str
    start : str
    stop : str

class File(BaseModel):
    name:str

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/loadCsv/")
def loadCSV(file:str):
    return FileResponse(path=f"./History/{file}.csv", filename=f"{file}.csv", media_type='text/csv')

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/checkIn")
def checkIn(customer: newCustomer):
    newCustomer = Customer( name=customer.name,
                            table=customer.table,
                            start=customer.start,
                            stop=customer.stop )
    newCustomer.save()
    return {"message" : "save data"}

@app.post("/checkOut")
def checkOut(customer: newCustomer):
    Customer.objects(name=customer.name).update(stop=customer.stop)
    return {"message" : "update data"}

@app.post("/assess")
def riskAssess(person: Person):
    try:
        user = Customer.objects.get(name=person.name)
        # print(user.start)
        # print(user.stop)
        status = CM.assessment(user.start,user.stop,user.table)
        print(status)
        return status
    except:
        print("error")
        return "not found"
        
    
@app.get("/listVDO")
def readVDO() :
    CM.writeListVdo() 
    f = open('./VDO.json')
    data = json.load(f)
    f.close()
    return  data

@app.get("/listHistory")
def readHistory():
    CM.writeListhistory() 
    f = open('./listHistory.json')
    data = json.load(f)
    f.close()
    return  data

@app.post("/scan")
def readItem(item : Path):
    dirName = item.path[4:-4]
    select = []
    for index in item.person :
        # print(index)
        Person = json.loads(json.dumps(index))
        print(Person)
        if(Person["select"]  == True): 
            select.append(Person["Name"])
    # print(select)
    CM.splitVdo(dirName)
    CM.buildFilecsv(dirName,select)
    # result = funcImg.show(item.path)
    return  item.path

