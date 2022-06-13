import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";

const secret = process.env.SECRET

export default function middleware(req){
    const {cookies} = req

    const jwt = cookies.OursiteJWT
    const url = req.url

    if(url.includes("/owner/")){
        if(jwt === undefined){
            return NextResponse.redirect('/')
        }

        try{
            verify(jwt,secret)
            return NextResponse.next()
        }catch(e){
            return NextResponse.redirect("/")
        }
    }
    return NextResponse.next()

}