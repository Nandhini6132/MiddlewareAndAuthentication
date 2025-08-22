

import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export function middleware(request){
    const path=request.nextUrl.pathname;
    console.log(path , 'path');
    const checkPublicPath=path==='/sign-up' || path==='/login'
    const getCookies= cookies()
    const token=getCookies.get('token')?.value || ''

    if(checkPublicPath && token !== '') {
        return NextResponse.redirect(new URL('/',request.nextUrl))
    }

    if(!checkPublicPath && token !== ''){
        return NextResponse.redirect(new URL('/sign-up',request.nextUrl))
    }
}

export const config={
    matcher:['/sign-up','/login'],
    
}