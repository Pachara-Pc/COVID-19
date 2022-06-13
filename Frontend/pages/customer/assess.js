import { Modal, Form, Button, Card, Container, Row, Col, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import styles from "../../styles/index.module.css"
import Risk from "../../components/riskLevel"
import { useRouter } from "next/router"
import axios from 'axios'

export default function FirstPost() {
    const [data, setData] = useState("")
    // const date = new Date()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [showNotfound,setShownotFound] =useState(false)
    const NotfoundClose = () => setShownotFound(false);
    const handleShow = () => setShow(true);
    const [status, setStatus] = useState(false)
    const [riskLevel,setRisklevel] = useState("load")
    
    
    
    const fetchAssess= () =>{

        console.log("fetchAssess");
        
        let body = {
            "name":data,
          }

        console.log(body);
        axios.post("http://127.0.0.1:8000/assess",body)
        .then((res)=>{
            
          console.log(res);
          if(res.data == "not found"){
            setShownotFound(true)
              console.log("not found");
          }else{
            setStatus(true)
            setRisklevel(parseInt(res.data))
            console.log("found");
          }
        })
    }
    
    return (
        <>
            {/* <Container className={styles.bg}> */}
            <div className={styles.customerLayout}>
                <div style={{ marginTop: "10px", textAlign: "center" }}>
                    <h1 style={{ color: "rgb(5, 185, 65)" }}>ระบบประเมินความเสี่ยง</h1>

                    
                    {/* <h1 style={{ color: "rgb(5, 185, 65)" }}>{query.id}</h1> */}


                </div>
                {status ?


                    <div style={{ textAlign: "center" }}>

                        <Risk level ={riskLevel}/>
                        {/* <Button style={{ marginLeft: "10px" }} variant="primary" type="submit"
                                onClick={() => {

                                  
                                        setStatus(false)
                                   
                                    // handleShow()

                                }}>
                                สิ้นสุดการใช้บริการ
                            </Button> */}
                    </div>
                        
                    :

                    <div  style={{textAlign: "center"}}  >
                       <h5>ระบบประเมินความเสี่ยงนี้จะใช้ระยะห่างโต๊ะและพนักงานที่คุณได้ลงทะเบียนไว้เมื่อเข้ามาใช้งานครั้งที่ผ่านมา </h5>
                        <p style={{ textAlign:"left",color: "red" }} >*กรุณากรอกข้อความที่เป็นการยืนยันถึงตัวตนของคุณ</p>
                        <p style={{ textAlign:"left", color: "red" }} >**หากไม่ได้ลงทะเบียนไว้จะไม่สามารถใช้งานการประเมินความเสี่ยงได้</p>
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
                                    
                                    
                                    if(data){
                                        // setStatus(true)
                                        fetchAssess()
                                        console.log(data);
                                    }else{
                                        console.log("plz insert");
                                        // handleShow()
                                    }
                                    // handleShow()

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
                    <Modal.Body>{"กรุณากรอกข้อมูล"}</Modal.Body>
                    <Modal.Footer>
                        <Button variant={"danger" }
                            onClick={() => {
                                handleClose()
                                // setStatus(true)
                                // console.log(data);
                            }}>
                            ตกลง
                        </Button>

                    </Modal.Footer>
                </Modal>

                <Modal show={showNotfound} onHide={NotfoundClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>แจ้งเตือน</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{"ไม่พบข้อมูลการลงทะเบียน"}</Modal.Body>
                    <Modal.Footer>
                        <Button variant={"danger" }
                            onClick={() => {
                                NotfoundClose()
                               
                            }}>
                            ตกลง
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>
            {/* </Container> */}
        </>
    )


}