import cv2
import numpy as np
import os
import detectColor
import assist
import calculate
import datetime
# a = os.listdir('./vdo/test')
classes = ["IN"]
net = cv2.dnn.readNet("./objectDetection/Model/custom-yolov4-tiny-detector_best_1.weights",
                      "./objectDetection/Model/custom-yolov4-tiny-detector.cfg")
table = [[85, 179],[252, 177]] # Net Night Art Arm Ball

# table = [[184,120],[479,131]] # Net Art

distanceTable =[]
colorList = {
    'Red': {
        'Max': [179, 203, 255],
        'Min': [144, 64, 130]
    },
    'Green': {
        'Max': [127, 255, 255],
        'Min': [107, 93, 79]
    },
    'Blue': {
        'Max': [167, 255, 255],
        'Min': [72, 102, 102]
    }
}


def scanWaiter(path):
    dectecLog = ["0"]*2
    index=2

    for i in range (len(colorList)*(len(table)+1)):
        dectecLog.append("0")

    text =""

    for c in colorList:

        text+=f'{c},'
        for i in range(len(table)):
            text+=f'{c}_table_{i+1},'

    indexCsv =  path[8:].split("_")
    timeindex = [int(x) for x in indexCsv  if x]
    unixTime = datetime.datetime(timeindex[0],timeindex[1],timeindex[2],timeindex[3],timeindex[4],timeindex[5]).timestamp()
    print(indexCsv)
    f = open(f'./History/{path[8:]}.csv', "a")
    f.write("test")
    f.close()

    f = open(f'./History/{path[8:]}.csv', "r+")
    f.seek(0)
    f.write("date,time,"+text+"\n")
    f.truncate()   
    


    # global dectecLog
    # print(path)
    listFile = os.listdir(path)
    # print(listFile)
    listFile.sort(key=assist.natural_keys)
    second = 0
    
    for pic_P in listFile:
        indexArry=0
        # print(f'{path}/{pic_P}')
        unixTime += 1
        dateCsvfile = datetime.datetime.fromtimestamp(unixTime).strftime('%Y/%m/%d')
        dectecLog[0] = dateCsvfile
        
        
        timeCsvfile = datetime.datetime.fromtimestamp(unixTime).strftime('%H:%M:%S')
        dectecLog[1] = timeCsvfile
       

        # dectecLog[1] = str(pic_P)
        # dectecLog += f"{pic_P},{second},"
        image = cv2.imread(f'{path}/{pic_P}')
        # print(f"-----{pic_P}-------------------------")
        image = cv2.resize(image, [1280, 720])
        height, width, channels = image.shape
        layer_names = net.getLayerNames()
        output_layers = [layer_names[i - 1]for i in net.getUnconnectedOutLayers()]
        blob = cv2.dnn.blobFromImage(
                image, 0.00392, (416, 416), (0, 0, 0), True, crop=False)
        net.setInput(blob)
        outs = net.forward(output_layers)
        class_ids = []
        confidences = []
        boxes = []
        for out in outs:
            for detection in out:
                scores = detection[5:]
                class_id = np.argmax(scores)
                confidence = scores[class_id]

                if confidence > 0.5:

                    # Object detected
                    # print(class_id)
                    center_x = int(detection[0] * width)
                    center_y = int(detection[1] * height)
                    w = int(detection[2] * width)
                    h = int(detection[3] * height)

                    # Rectangle coordinates
                    x = int(center_x - w / 2)
                    y = int(center_y - h / 2)

                    boxes.append([x, y, w, h])
                    confidences.append(float(confidence))
                    class_ids.append(class_id)
        indexes = cv2.dnn.NMSBoxes(boxes, confidences, 0.5, 0.4)
        font = cv2.FONT_HERSHEY_PLAIN
        count = 0

        if len(boxes) > 0:
            # print(boxes)
            for i in range(len(boxes)):
                if i in indexes:
                    # print(f"i : {indexes}")

                    x, y, w, h = boxes[i]
                
                    label = str(classes[class_ids[i]])
                    

                    if(label == classes[0]):
                        count += 1
                        # print(f"Count = {count}")
                        if(y <=0): y= 0
                        if(x <=0): x= 0
                        crop = image[y:y+h, x:x+w]
                        # print(f"x : {x} w : {y+h} y : {y} w : {w+x}") 
                        calculate.setStart(image)
                        [axisX, axisY] = calculate.start(image, x+int(w/2), h+y)
                        distanceTable = calculate.calDistanceBTWpoint(axisX,table[0][0],axisY,table[0][1])
                        distanceTable2 = calculate.calDistanceBTWpoint(axisX,table[1][0],axisY,table[1][1])
                        # distanceTable3 = calculate.calDistanceBTWpoint(axisX,table[2][0],axisY,table[2][1])
                        
                        Found = detectColor.colorDetect(crop,colorList)

                        
                        # print(f" Found {Found}")
                        # print(dectecLog[1] )

                        for i in colorList:
                            # print(f'index :  {index}')
                            if Found == i :
                                # print(f'found color = {Found}')
                                dectecLog[index] = "1"
                                dectecLog[index+1] = f"{round(distanceTable,2)}"
                                dectecLog[index+2] = f"{round(distanceTable2,2)}"
                                # dectecLog[index+3] = f"{round(distanceTable3,2)}"
                                index=index+3
                            else:
                                index=index+3
                        index=2
                                # print(f'index = {index}')

                        
                    # elif(label == classes[1]): 
                        # print("No")
                    
        

        # print("log : "+",".join(dectecLog))
        f = open(f'./History/{path[8:]}.csv', "a")
        f.write(",".join(dectecLog)+"\n")
        f.close()
        
        dectecLog = ["0"]*len(dectecLog)
        
    
