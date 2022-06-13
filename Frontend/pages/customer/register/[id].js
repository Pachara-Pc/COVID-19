import { Modal, Form, Button, Card, Container, Row, Col, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import styles from "../../../styles/index.module.css"
import { useRouter } from "next/router"
import axios from 'axios'

export default function FirstPost() {
    const [data, setData] = useState("")
    // const date = new Date()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [status, setStatus] = useState(false)
    const { query } = useRouter();
  
    // const time = new Date()
    // setStart(Math.floor(time.getTime() / 1000) + (60 * 60 * 24 ))
 
    const fecthCheckOut= () =>{

        console.log("fecthCheckOut");
        
        let body = {
            "name":data,
            "table":query.id,
            "start":"",
            "stop":Math.floor(new Date().getTime() / 1000) + (60 * 60 * 24 )
        }

        console.log(body);
        axios.post("http://127.0.0.1:8000/checkOut",body).then((res)=>{
          console.log(res);
        })
    }

    const fecthCheckIn= () =>{

            console.log("fecthCheckIn");
            
            let body = {
                "name":data,
                "table":query.id,
                "start":Math.floor(new Date().getTime() / 1000) + (60 * 60 * 24 ),
                "stop":""
            }

            console.log(body);
            axios.post("http://127.0.0.1:8000/checkIn",body).then((res)=>{
              console.log(res);
            })
        }
      
        
    return (
        <>

            <Container className={styles.bg}>
            <div className={styles.customerLayout}>
                <div style={{ marginTop: "10px", textAlign: "center" }}>
                    <h1 style={{ color: "rgb(5, 185, 65)" }}>ลงทะเบียนใช้บริการร้านอาหาร</h1>

                    <h5>ตอนนี้ คุณคือผู้ใช้บริการที่นั่งอยู่โต๊ะที่</h5>
                    <h1 style={{ color: "rgb(5, 185, 65)" }}>{query.id}</h1>


                </div>
                {status ?

                   
                    <div style={{ textAlign: "center" }}>
                        ลงทะเบียนเสร็จสิ้น ขอบคุณที่ใช้บริการ
                        <br>
                        
                        </br>
                        
                        <p  style={{ color: "red" }}  >
                        * หากใช้บริการเสร็จแล้ว รบกวนลูกค้ากดปุ่ม "สิ้นสุดการใช้บริการ" เพื่อเป็นประโยชน์ต่อตัวลูกค้าเองในการประเมินความเสี่ยง
                        
                        </p>
                        
                        <Button variant={"danger"}
                            onClick={() => {
                               
                                setStatus(false)
                                fecthCheckOut()
                                // console.log(data);
                                
                            }}>
                            สิ้นสุดการใช้บริการ
                        </Button>
                    </div>

                    :

                    <div  style={{textAlign: "center"}}  >
                        {/* เวลาที่ใช้บริการขณะนี้ {Time} */}
                        <p style={{ color: "red" }} >**กรุณากรอกข้อความที่เป็นการยืนยันถึงตัวตนของคุณเช่น ชื่อหรือนามสมมุติ เป็นต้น</p>

                        <div style={{ display: "flex", marginBottom: "10px" }}>
                            <Form >
                                <Form.Control type="password" placeholder="xxx-xxx-xxxx" value={data} maxLength="10"
                                    size="10"
                                    onChange={(e) => {
                                        setData(e.target.value)

                                    }} />
                            </Form>

                            <Button style={{ marginLeft: "10px" }} variant="primary" type="submit"
                                onClick={() => {

                                    handleShow()
                                    
                                }}>
                                ตกลง
                            </Button>

                        </div>
                    </div>
                }

                {/* <p>**ระบบประเมินความเสี่ยงนี้ใช้กับร้าน</p> */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>แจ้งเตือน</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{data === "" ? "กรุณากรอกข้อมูล" : "บันทึกข้อมูล"}</Modal.Body>
                    <Modal.Footer>
                        <Button variant={data === "" ? "danger" : "primary"}
                            onClick={() => {
                                // setData("")
                                handleClose()

                                if(data){
                                    setStatus(true)
                                    fecthCheckIn()
                                }
                                
                                
                                // console.log(start);
                                // console.log(data);
                            }}>
                            ตกลง
                        </Button>

                    </Modal.Footer>
                </Modal>

            </div>
            </Container>
        </>
    )


}