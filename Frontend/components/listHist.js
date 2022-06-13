import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react'

// import file from '../../file/Detail.json'
import axios from 'axios'

const Hist =()=>{


  const [file,setFile] = useState([])

  const fecthHistory = () =>{
      axios.get("http://127.0.0.1:8000/listHistory").then((res)=>{
        setFile(res.data)
        console.log(res.data);
      })
  }

  useEffect(() => {
    // console.log(file);
    fecthHistory()
    // console.log(chkValue);
   
  }, [])

    return (
        
        <>
            <Row>
          {file.map(e => <Col sm={6} md={3} key={e.id}>

            
            <Card style={{margin:"10px 0px 10px 0px"}} onClick={()=>{ console.log(e.fileName)}}>
            <a href={`http://127.0.0.1:8000/loadCsv/?file=${e.fileName.split(".")[0]}`} download  style={{maxWidth:"50%",marginTop:"10px", marginLeft:"auto",marginRight:"auto"}} >
            <Card.Img variant="top" src={"/csv.png"}  />
            </a>

            
            <Card.Body>
                <Card.Title style={{fontSize:"15px"}} >{e.fileName}</Card.Title>
                <Card.Text>
                  {e.date}
                </Card.Text>
               
              </Card.Body>
            </Card>

          </Col>)}
        </Row>
        </>
    )
}

export default Hist