import { Form, Modal, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react'
// import file from '../../file/Detail.json'
// import file from '../../API/sample.json'
import vdoIcon from '../public/vdo.png'
import axios from 'axios'
const listMember = [
  {
  "id":1 ,
  "Name": "Red"
  },
  {
  "id":2 ,
  "Name": "Green"
  },
  {
  "id":3 ,
  "Name": "Blue"
  }
  ]
const VDO = () => {

  const [show, setShow] = useState(false);
  const [chkValue, setChkvalue] = useState([])
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [checked, setChecked] = useState(true);
  const [file,setFile] = useState([])
  const [pathFile,setPathfile] = useState("")

  const fecthVdo = () =>{
      axios.get("http://127.0.0.1:8000/listVDO").then((res)=>{
        // setFile(res.data)
        const bgColor = res.data.map(e=> {
            e.color = "#ffffff"
            return e
        })

        // console.log(bgColor);
        setFile(bgColor)
      }).then(()=>{
        console.log(file);
      })
  }

  const onSubmit = () => {
    // console.log(file);
    sendVdo()
    

    file.map(e => {
      if(e.path === pathFile ){
        e.status = "wait"
        e.color = "#EEC51F"
      }
    })

    handleClose();
  }
  
  const changeStatus = (s)=>{
    if(s == false){
        // console.log("change f");
        return "#ffffff"
    }else if (s == "wait"){
      // console.log("change w");
        return "#EEC51F"
    }else if (s == true){
      // console.log("change t");
        return "#23D316"
    }
  }
  
  const sendVdo = () => { 
    axios.post("http://127.0.0.1:8000/scan",{
      path: pathFile,
      person : chkValue
    }).then(function (response) {
      
      let A = file.map(e => {

        if(e.path == response.data ){
          console.log(e);
          e.status = true
          e.color = "#23D316"
          console.log(`path = ${e.path} res = ${response.data}`);
          console.log(e);
         
        }
        return e
      })
      setFile(A)
      // console.log(file);
    })
    .catch(function (error) {
      console.log(error);
    });
    // console.log(chkValue);
  }
  
  useEffect(() => {
    // console.log(file);
    fecthVdo()
    // console.log(chkValue);
    setChkvalue(
      listMember.map(e => {
        return {
          select: false,
          id: e.id,
          Name: e.Name
        }
      })
    )

  }, [])

  const showDate = (date)=>{
    let D = date.split("_",3)
    // console.log(D)
    return ` ${D[2]}/${D[1]}/${D[0]}`
  }

  const showTime = (time)=>{
    let D = time.split("_",6)
    let min =D[5].split(".")
    return ` ${D[3]}:${D[4]}:${min[0]}`
  }

  return (
    <>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>พนักงาน </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Form.Check label="ALL" onChange={e => {
              let checked = e.target.checked
              console.log(checked);
              setChkvalue(
                chkValue.map(event => {
                  event.select = checked;
                  return event
                })
              )
              console.log(chkValue);
            }} />
            
            {chkValue.map(e =>
              <Form.Check type='checkbox' checked={e.select} key={e.id} label={e.Name}

                onChange={event => {
                  let checked = event.target.checked

                  setChkvalue(
                    chkValue.map(data => {
                      // console.log("e :"+e.id);
                      if (e.id === data.id) {
                        data.select = checked;
                        // console.log(data.select);
                      }
                      return data
                    })
                  )
                  
                  // console.log(e.id);
                  // console.log(chkValue);
                }}
              />

            )
            }
          </Form>
        </Modal.Body>
        <Modal.Footer>

          <Button variant="primary" onClick={onSubmit} >
            submit
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ,testColor(e.status) */}
      {/* ,backgroundColor:e.color  */}
      <Row >
        {file.map(e =>  <Col sm={6} md={3} key={e.id}  >
          
          <Card style={{ margin: "10px 0px 10px 0px", backgroundColor: changeStatus(e.status)}}  onClick={()=>{handleShow(); setPathfile(e.path) }}  >
            <Card.Img variant="top" src={"/vdo.png"} style={{maxWidth:"50%",marginTop:"10px", marginLeft:"auto",marginRight:"auto"}}  />
            <Card.Body>
              วันที่ {showDate(e.fileName)}
              <br></br>
              เวลา {showTime(e.fileName)}
              {/* <Card.Title style={{fontSize:"15px"}}>{e.fileName}</Card.Title> */}
{/*              
              <Card.Text>
                {e.date}
              </Card.Text> */}

            </Card.Body>
          </Card>
          
        </Col>)
        
        }
      </Row>
    </>
  )
}

export default VDO