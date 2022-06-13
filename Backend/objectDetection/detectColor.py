from re import L
import numpy as np
import cv2

def colorDetect(img,color):
    listMax = {}
    maxValue = 0
    

    for  i in color :
        # print(f'{i} ')
        upperColor = np.array(color[i]['Max'])
        lowerColor = np.array(color[i]['Min'])
        hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        Detect  = cv2.inRange(hsv, lowerColor, upperColor)

        contours, hierarchy = cv2.findContours(Detect, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
        for pic, contour in enumerate(contours):
            area = cv2.contourArea(contour)
            x, y, w, h = cv2.boundingRect(contour)
            area = w * h
            maxValue = area
            if(area > maxValue):
                maxValue = area

        
        listMax[i] = maxValue
        # cv2.imshow("window_name", Detect)
        # cv2.imshow("img", img)
        # cv2.waitKey(0) 
        # cv2.destroyAllWindows() 
        # print(listMax)
        
    return max(listMax,key=listMax.get)





    
