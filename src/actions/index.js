'use server'

import connectToDB from "@/database";
import Data from "@/models";

import jwt from 'jsonwebtoken'
import bcryptjs from "bcryptjs";
import { cookies } from "next/headers";



//register user action
export async function registerUser(formData) {
    console.log(formData)
    await connectToDB()

    try {
        //check whether user is already registered
        const { userName, email, password } = formData

        const checkUser = await Data.findOne({ email })
        if (checkUser) {

            return {
                success: false,
                message: 'User already exists'
            }
        }

        //hash the password
        else {

            const salt = await bcryptjs.genSalt(10)
            console.log(salt,'salt')
            const hashedPassword = await bcryptjs.hash(password, salt)

            const newUser = new Data({
                userName,
                email,
                password: hashedPassword
            })

            const savedUser = await newUser.save()
            console.log(savedUser)
            if (savedUser) {
                return {
                    success: true,
                    data: JSON.parse(JSON.stringify(savedUser)),
                    message: 'User registered successfully'
                }
            } else {
                return {
                    success: false,
                    message: 'Something went wrong!'
                }
            }
        }
    } catch (error) {
        console.error(error)
        return {
            success: false,
            message: 'Something went wrong!...Please try again'
        }
    }
}


//login user actions
export async function loginUserAction(formData) {
    await connectToDB()

    try {

        const { email, password } = formData

        //check user exists or not
        const checkUser = await Data.findOne({ email })
        console.log(checkUser,'checkUser')
        if (!checkUser) {
            return {
                success: false,
                message: 'User does not exists!.. Please Signin'
            }
        }

        //check password is correct or not
        const isPasswordCorrect = await bcryptjs.compare(password, checkUser.password)

        if (!isPasswordCorrect) {
            return {
                success: false,
                message: 'Password is incorrect'
            }
        }

        const createTokenData = {
            id: checkUser._id,
            userName: checkUser.userName,
            email: checkUser.email
        }

        const token = jwt.sign(createTokenData, 'DEFAULT_KEY', { expiresIn: '1d' })
        console.log(token,'token')

        const getCookies = cookies()
        getCookies.set('token', token)

        return {
            success: true,
            data: JSON.parse(JSON.stringify(checkUser)),
            message: 'User logged in successfully'
        }

    } catch (error) {
        return {
            success: false,
            message: 'Something went wrong!...Please try again'
        }
    }
}


//fetch user action
export async function fetchAuthUserAction() {
    await connectToDB()

    try {
        const getCookies = cookies()
        const token = getCookies.get('token')?.value || ''

        if (token === '') {
            return {
                success: false,
                message: 'Invalid token'
            }
        }

        const decodeToken = jwt.verify(token, 'DEFAULT_KEY')
        console.log(decodeToken, 'decoded token')
        const getUserInfo = await Data.findOne({ _id: decodeToken.id })
        console.log(getUserInfo,'gui')
        if (getUserInfo) {
            return {
                success: true,
                data: JSON.parse(JSON.stringify(getUserInfo)),
                message: 'User fetched successfully'
            }
        } else {
            return {
                success: false,
                message: 'Something went wrong!...Please try again'
            }
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: 'Something went wrong!'
        }

    }
}


//logout
export async function logout(){
    const getCookies=cookies()
    getCookies.set('token','')
}