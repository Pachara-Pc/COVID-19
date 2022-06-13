import imp
import numpy as np
import math
import cv2
lineStart = [(670, 681), (611, 437), (490, 709), (501, 457), (671, 677), (494, 710), (640, 553), (496, 572)]

# [(1278, 690), (1165, 602), (1223, 700), (1118, 610), (1271, 696), (1047, 707), (1234, 660), (1058, 665) ]
infPoint_1 = [(), ()]
infPoint_2 = [(), ()]

def setStart(img):
    global infPoint_1, infPoint_2
    infPoint_1 = get_intersect(
        lineStart[0], lineStart[1], lineStart[2], lineStart[3])
   
    # print("infPoint_1 : ", infPoint_1)

    infPoint_2 = get_intersect(
        lineStart[4], lineStart[5], lineStart[6], lineStart[7])
 
    # print("infPoint_2 : ", infPoint_2)

def start(img, x, y):
    global  infPoint_1, infPoint_2, lineStart
    # setStart(img)
    font = cv2.FONT_HERSHEY_SIMPLEX
    # print(infPoint_1)
    # print(infPoint_2)
    axisX = get_intersect_multiline([[lineStart[2][0], lineStart[2][1]], [math.floor(infPoint_1[0]), math.floor(infPoint_1[1])],
                                     [lineStart[0][0], lineStart[0][1]], [
                                         math.floor(infPoint_1[0]), math.floor(infPoint_1[1])],
                                     [x, y], [math.floor(infPoint_2[0]), math.floor(infPoint_2[1])]], infPoint_2)

    # print("Axis X :", axisX)
    axisY = get_intersect_multiline([[lineStart[6][0], lineStart[6][1]], [math.floor(infPoint_2[0]), math.floor(infPoint_2[1])],
                                     [lineStart[4][0], lineStart[4][1]], [
        math.floor(infPoint_2[0]), math.floor(infPoint_2[1])],
        [x, y], [math.floor(infPoint_1[0]), math.floor(infPoint_1[1])]], infPoint_1)
    # print("Axis Y :", axisY)
    # print("Axis X :", axisX)
    # print("Axis Y :", axisY)
    # cv2.putText(img, "X"+str(length)+":"+str(x) + ',' + "Y"+str(length)+":" +
    #             str(y), (x, y), font,
    #             0.5, (255, 0, 0), 2)
    # cv2.line(img, (x, y), (math.floor(infPoint_1[0]), math.floor(
    #     infPoint_1[1])), [0, 0, 255], 1)
    # cv2.line(img, (x, y), (math.floor(infPoint_2[0]), math.floor(
    #     infPoint_2[1])), [0, 0, 255], 1)
    # cv2.circle(img, (x, y), radius=3, color=(0, 0, 255), thickness=-1)
    return [axisX, axisY]

def get_intersect_multiline(line, INF):
    font = cv2.FONT_HERSHEY_SIMPLEX
    s = np.vstack([line])        # s for stacked
    h = np.hstack((s, np.ones((len(line), 1))))  # h for homogeneous
    listLine = []
    for x in range(len(h-1)):
        if((x+1) % 2 == 0):

            listLine.append(np.cross(h[x-1], h[x]))

    A = np.cross(listLine[0], listLine[2])
    # intersect line in
    intersectA = [math.floor(A[0]/A[2]), math.floor(A[1]/A[2])]

    B = np.cross(listLine[1], listLine[2])
    # # intersect line out
    intersectB = [math.floor(B[0]/B[2]), math.floor(B[1]/B[2])]

    return calculateDistance(intersectA, intersectB, [
        line[4][0], line[4][1]], INF)


def get_intersect(a1, a2, b1, b2):  # หาจุดตัดของจุดสองจุด
    s = np.vstack([a1, a2, b1, b2])        # s for stacked
    # print("s : ", s)
    h = np.hstack((s, np.ones((4, 1))))  # h for homogeneous
    # print("h : ", h)
    l1 = np.cross(h[0], h[1])           # get first line
    # print("l1 : ", l1)
    l2 = np.cross(h[2], h[3])           # get second line
    # print("l2 : ", l2)
    x, y, z = np.cross(l1, l2)          # point of intersection
    # print("x : ", x)
    # print("y : ", y)
    # print("z : ", z)
    if z == 0:                          # lines are parallel
        return (float('inf'), float('inf'))
    return (x/z, y/z)

def calculateDistance(In,Out,Point,Inf):

    # print("//////////////////////////")
    # print("In    : ",In)
    # print("out   : ",Out)
    # print("point : ",Point)
    # print("inf   : ",Inf)

    lineA = calDistanceBTWpoint(Point[0],Inf[0],Point[1],Inf[1])  # A to inf
    lineB = calDistanceBTWpoint(Point[0],Out[0],Point[1],Out[1])  # A to C
    lineC = calDistanceBTWpoint(In[0],Out[0],In[1],Out[1])        # B to C
    lineD = calDistanceBTWpoint(In[0],Inf[0],In[1],Inf[1])        # B to inf

    # lineA = calDistanceBTWpoint(Out[0],Inf[0],Out[1],Inf[1])        # A to inf  // นอก
    # lineB = calDistanceBTWpoint(Point[0],Out[0],Point[1],Out[1])    # A to C    // R
    # lineC = calDistanceBTWpoint(In[0],Point[0],In[1],Point[1])          # B to C    // ใน
    # lineD = calDistanceBTWpoint(In[0],Inf[0],In[1],Inf[1])          # B to inf  // L
    # print(f"lineA {lineA } px") # out
    # print(f"lineB {lineB } px") # R
    # print(f"lineC {lineC } px") # In
    # print(f"lineD {lineD } px") # L
    return calculateGridscale(lineA,lineB,lineC,lineD)


def calDistanceBTWpoint (x1,x2,y1,y2):
    return math.sqrt(math.pow((x1 - x2), 2)+math.pow((y1 - y2), 2))

def calculateGridscale(Out,R,In,L):
    realSize = 30 #cm
    result = (realSize*L*R)/(In*Out)
    # print("EQ : ",eq)
    return result

