import os , time
import json
import cv2
import sys
import pandas as pd
import datetime
sys.path.insert(0, './objectDetection')
import detectWaiter 
vdoPath = "./VDO"
historyPath = "./History"
pathDir ="./split/"

def CompareFile(VDO,CSV) :
    for file in CSV :
        # print(f"{file}  and {VDO}")
        if (file == VDO ):
            return True
    return False

def writeListVdo() :
    detail =[]
    listCSV = []
    listVDO = []
    for file in  os.listdir(historyPath) :
        CSV = file.split('.')
        listCSV.append(CSV[0])
    # print(listCSV)
    for file in  os.listdir(vdoPath) :
        date = time.localtime(os.path.getctime(vdoPath+"/"+file))
        dateText = f'{date.tm_mday}/{date.tm_mon}/{date.tm_year}'
        
        index = os.listdir(vdoPath).index(file)
        filename = file.split('.')
        detail.append({"id" :index+1,"fileName": file ,"date": dateText, "path":f"VDO/{file}", "status": CompareFile(filename[0],listCSV) })
        
    
    with open("VDO.json", "w") as outfile:
            json.dump(detail, outfile)

def writeListhistory():
    detail =[]
    for file in  os.listdir(historyPath) :
        
        print(f'fileName:{file}   ',)
        # print(f'Created:{date.tm_mday}/{date.tm_mon}/{date.tm_year}   \n')
        index = os.listdir(historyPath).index(file)
        detail.append({"id" :index+1,"fileName": file  })
    #     # print()
        
    with open("listHistory.json", "w") as outfile:
            json.dump(detail, outfile)
    print("test")

def splitVdo(pathfile):
    destination = pathDir+pathfile
    os.mkdir(destination)
    print("path : ",pathDir+pathfile)
    vidcap = cv2.VideoCapture(f'./VDO/{pathfile}.mp4')
    success,image = vidcap.read()
    count = 0
    while success:

        # if(count%10 == 0):
            # cv2.imwrite("./Frame/VDO1/frame%d.jpg" % count, image)     # save frame as JPEG file      
        success,image = vidcap.read()

        if success == True:
        #     # Display the resulting frame
            # print('Read a new frame: ', success)
        #     cv2.imshow("Image", image)
            image = cv2.resize(image, [1280, 720])
        else :
            
            # print('Read a new frame: ', success)
            detectWaiter.scanWaiter(destination)
            break
            
        if(count %30 == 1):
            # print("count")
            cv2.imwrite("%s/frame_%d.jpg" % (destination,count), image)     # save frame as JPEG file   
            # vidcap.release()
        # Press Q on keyboard to  exit
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

        count += 1

def buildFilecsv(pathfile,select):
    index = ['date','time']
    # A = ['Red','Green']
    data = pd.read_csv(f"./History/{pathfile}.csv")
    for color in select :
        index.append(color)
        for j in range(1,4):
            index.append(f'{color}_table_{j}')
    data = data.filter(items=index)
    os.remove(f"./History/{pathfile}.csv")
    data.to_csv(f"./History/{pathfile}.csv",index=False)

def assessment(start,stop,table):
    # print(table)
    Time = int(float(stop)) - int(float( start))
    riskTable = []
    path ='./History/'
    # print(start)
    # print(stop)
    checkIn = datetime.datetime.fromtimestamp(int(float(start))).strftime('%H:%M:%S')
    checkOut = datetime.datetime.fromtimestamp(int(float(stop))).strftime('%H:%M:%S')
    timeIn = datetime.datetime.fromtimestamp(int(float(start))).strftime('%Y_%m_%d_%H')
    print(checkIn)
    print(checkOut)

    for i in os.listdir(path):
        if timeIn in i:
            path+=i
            print(path)
        else:
            print('not found')
    # print('test')
    data = pd.read_csv(path)
    
    for col in data.columns:
        if table == col[-1] :
            riskTable.append(col)
    data = data.loc[(data['time'] >=checkIn) & (data['time'] <=checkOut) ] 
    # print(data)
    for x in riskTable :
        index = 0
        low = 0
        high = 0
        Hmax =0
        Lmax=0
        for i in data[x][0:Time]:
            
            if(index<len(data[x][0:Time])):
                index+=1

                if(i<=200 and i!= 0 ): 
                
                    high+=1
                    if(high>=Hmax):
                        Hmax = high

                    low=0
                
                elif(i>200 and i!= 0): 
                    low+=1

                    if(low>=Lmax):
                        Lmax = low
                    high=0
                else:
                    high=0
                    low=0
        print(f"H : {Hmax}  L : {Lmax} ")   
        if(Hmax >= 3):  #ระยะเวลา
            return 0
    return 1
    