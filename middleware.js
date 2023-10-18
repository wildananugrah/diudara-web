import { NextRequest, NextResponse } from 'next/server';
import Cookies from 'universal-cookie'

export function middleware(req) {
    const cookies = new Cookies()
    const token = cookies.get('token')

    // console.log(token)

    // if (!token) {
    //     return NextResponse.redirect('/login');
    // }

    // if (token !== 'VALID_TOKEN') {
    //     return NextResponse.redirect('/login');
    // }

    return NextResponse.next();
}