import styles from '../../styles/index.module.css'
import { Button, Card, Container, Row, Col, Form ,Navbar,Nav} from 'react-bootstrap';
import Hist from '../../components/listHist'
import VDO from '../../components/listVdo'
import { useState } from 'react'
import React from "react";
import  axios  from 'axios';
import { useRouter } from 'next/router';
export default function User(){
    const router = useRouter()
    const [toggle, setToggle] = useState(true)
    const handleLogOut = async () => {
        const user = await axios.get("../api/auth/logout");
    
        console.log(user);
        if(user.status === 200){
            router.push('/')
        }
      };
    
    return (
        <>
        
  <Navbar bg="primary" >
    <Container>
       <h3 style={{color:'white'}}> ระบบประเมินความเสี่ยงในการติดเชื้อโควิด 19</h3>
 

        <Button variant='danger' onClick={() => handleLogOut()}> Logout </Button>
    </Container>
  </Navbar>
        <div className={styles.wall}>

        <Container className={styles.test}>
        <Row >
          <Col className={styles.VDO_Button} onClick={() => { setToggle(true) }} >
            <h1 >
              VDO
            </h1>

          </Col>
          <Col className={styles.Hist_Button} onClick={() => { setToggle(false) }}>
            <h1>
              History
            </h1>

          </Col>

        </Row>
        {
          toggle ?<VDO />:<Hist  /> 
        }

        <Row>

        </Row>

      </Container>
    </div>

    </>
    )
}