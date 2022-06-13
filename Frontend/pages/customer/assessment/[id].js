import styles from "../../../styles/index.module.css"
import {useRouter} from "next/router"
import Risk from "../../../components/riskLevel"
export default function assessment() {
    const { query } = useRouter();
    return (
        <>
           <Risk level ={query.id}/>
        </>
    )
}