'use client'

import SignUpSkeleton from '@/components/common-formData-skeleton/index'
import React, { useState } from 'react'
import { signUpFieldFormControls, signUpFieldInitialdata } from '../utils'
import { registerUser } from '@/actions'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommonSkeleton from '@/components/common-formData-skeleton/index'
import Link from 'next/link'

const page = () => {
   
  const [signupFormData, setSignupFormData]= useState(signUpFieldInitialdata)
  const router = useRouter()

  const handleSignUpBtnDisable=()=>{
    return Object.keys(signupFormData).every(key=>signupFormData[key].trim() !== '')
  }

  const handleSignUp=async()=>{

    const result= await registerUser(signupFormData)
    console.log(result)
    toast( result.message,{
      
      autoClose:1000
    })
    if(result?.data){
      
       setInterval(()=> router.push('/login'),2000)
    }
  }
  return (
    <div className='w-screen h-screen p-20 '>
        <ToastContainer />
        <div>
            <h1 className='text-center'>Welcome! Please complete your registration</h1>
            <form action={handleSignUp} className='signup-form flex flex-col gap-10 items-center mt-5 w-[700px] m-auto h-[450px]'>
                {signUpFieldFormControls.map(controlItem=>{
                    return <CommonSkeleton value={signupFormData[controlItem.name]} onChange={(e)=>setSignupFormData({...signupFormData, [e.target.name]:e.target.value})}  controlItem={controlItem} handleSignUpBtnDisable={handleSignUpBtnDisable}/>
                })}
                  <h3>Already have an account? <Link href={'/login'}>login</Link> </h3>
            </form>
        
        </div>
    </div>
  )
}

export default page