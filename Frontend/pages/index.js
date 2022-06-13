import styles from '../styles/index.module.css'
import { Button, Form } from 'react-bootstrap';
import Hist from '../components/listHist'
import VDO from '../components/listVdo'
import axios from 'axios';
import { useState } from 'react'
import { useRouter } from 'next/router';

export default function Home() {
 
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [status,setStatus] = useState(false)
  const router = useRouter()
  const handleSubmit = async () => {
    

    const credentials = { username, password };

    const user = await axios.post("/api/auth/login", credentials);
    if(user.status === 200){
        router.push('/owner/main')
    }
    console.log(user);
  };

  const handleGetUser = async () => {
    const user = await axios.get("/api/user");

    console.log(user);
  };

  return (
    <>
      <div className={styles.Login_Form}>
        <Form >

          <Form.Label>Username</Form.Label>
          <Form.Control placeholder="username" onChange={(e) => setUsername(e.target.value)} />
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
        </Form>
        <Button variant="primary" type="submit" style={{ marginTop: '10px' }} onClick={() => {
          handleSubmit()
          console.log(username);
          console.log(password);
        }}>
          Login
        </Button>
      </div>
    </>)
}