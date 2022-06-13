import { Container } from 'react-bootstrap';
import styles from "../styles/index.module.css"
import Text from "../public/Text.json"

const Risk = ({id}) => {
    // console.log("in Risk ",id);
    if(id === 0){
        return Text.High.risk
    }
    else if(id === 1){
        return Text.Low.risk
    }

    else{
        return "error"
    }
} 

const Detail = ({id}) => {
    // console.log("in Detial ",id);
    if(id === 0){
        return Text.High.detail
    }
    else if(id === 1){
        return Text.Low.detail
    }else{
        return "error"
    }
} 


const Advice = ({id}) => {
    // console.log("in Advice ",id);
    
    if(id === 0){
        return Text.High.advice.map(e=> {return  <p key={e}> {e}<br></br></p>})
    }
    else if(id === 1){
        return Text.Low.advice.map(e=> {return  <p key={e}> {e}<br></br></p>})
    }
    else{
        return "error"
    }
}

const colorText = (id)=>{
    if(id === 0){
        return "rgb(243, 8, 8)"
    }
    else if(id === 1){
        return "rgb(5, 185, 65)"
    }
    else{
        return "rgb(0, 0, 0)"
    }
   
}
export default function High(prop) {
    return (
        <>
            <Container className={styles.assessmentLayout}>

          
                <div style={{padding:"20px"}}>

                    <h1 style={{ color: "black", textAlign: "center" }} >ระดับความเสี่ยงของคุณ</h1>

                    <h4 style={{ fontSize: "25px", color: colorText(parseInt(prop.level))}}>
                       
                        <Risk id={parseInt(prop.level)}/>
                      
                    </h4>

                    <Detail id={parseInt(prop.level)}/>

                    <div style={{textAlign:"left",padding:"10px",border:`8px solid ${colorText(parseInt(prop.level))}`,borderRadius:"10px"}}>
                        <p>ข้อแนะนำ : </p>
                        <Advice id={parseInt(prop.level)} />
                            
                    </div>
                    <p style={{ color: "red" }}>**ความเสี่ยงที่แสดงอยู่นี้เป็นความเสี่ยงที่เกิดขึ้นภายในร้านเท่านั้น</p>

                </div>
            </Container>
        </>
    )
}