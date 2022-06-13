# Set up enviroment
สิ่งที่จำเป็น
1. mongoDB
2. Python (แนะนำ version 3.10.4)
3. NodeJS (แนะนำ version v16.14.2)



## Setup MongoDB
1. ติดตั้ง MongoDB โดยสามารถดาว์โหลดได้ตามลิ้งค์นี้ https://www.mongodb.com/products/compass
2. Import ไฟล์ schema customer.json ไปยัง MongoCompose


## Setup Server side
1. เข้าไปยังโฟลเดอร์ Backend โดยใช้คำสั่่ง `cd Backend`
2. เข้าไปยัง folder Backend และสร้าง folder ดังนี้ 
  * VDO - เป็น folder ใช้สำหรับเก็บไฟล์ VDO
  * split - เป็น folder ใช้สำหรับเก็บไฟล์ภาพที่โปรแกรมประมวลผล
  * History - เป็น folder ใช่สำหรับเก็บไฟล์รายงานการปรากฎของพนักงาน
โดยใช้คำสั่ง `mkdir VDO split History`
3. ติดตั้ง python packages โดยใช้คำสั่ง
` python -m pip install -r requirements.txt`
4. ดาว์โหลด VDO ตัวอย่างได้ที่ https://drive.google.com/file/d/1RYhX3jmlXmK3cOla0ayA1OFoeOcufpWy/view?usp=sharing 
จากนั้นทำการแตกไฟล์ VDO.zip ไปยังที่ Backend/VDO 
5. เมื่อทำครบตามขั้นตอนทั้งหมดแล้ว ให้ทำการรันโปรแกรมฝั่งของเซิฟเวอร์โดยใช้คำสั่ง
 `uvicorn server:app --reload`
 
## Setup Client side
1. เข้าไปยังโฟลเดอร์ Frontend โดยใช้คำสั่่ง `cd Frontend`
2. เข้าไปยัง folder Fronend และใช้คำสั่ง
 `npm install`
3. เมื่อติดตั้ง NodeJS packages เสร็จแล้ว ใช้คำสั่ง
` npm run dev`
4. เข้าถึงหน้า Client ด้วย browser ใดก็ได้ (แนะนำ chrome หรือ microsoft edge)
 โดยกรอกไปที่ช่อง URL : http://localhost:3000


