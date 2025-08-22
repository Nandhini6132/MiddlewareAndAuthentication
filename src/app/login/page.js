'use client'

import React, {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { loginFieldFormControls, loginFieldInitialdata } from '../utils'
import 'react-toastify/dist/ReactToastify.css';
import CommonSkeleton from '@/components/common-formData-skeleton'
import { loginUserAction } from '@/actions'
import { useRouter } from 'next/navigation'
import Link from 'next/link';

const page = () => {
    const [loginFormData, setLoginFormData]= useState(loginFieldInitialdata)
    const router = useRouter()
  
    const handleLoginBtnDisable=()=>{
      return Object.keys(loginFormData).every(key=>loginFormData[key].trim() !== '')
    }
  
    const handleLogin=async()=>{
  
  

      const result= await loginUserAction(loginFormData)
      console.log(result)
      toast( result.message,{
        
        autoClose:1000
      })
      if(result.success){
        
         setInterval(()=>   router.push('/'),2000)
      }
    }
  return (
    <div className='w-screen h-screen p-20 '>
    <ToastContainer />
    <div>
        <h1 className='text-center'>Login here</h1>
        <form action={handleLogin} className='signup-form flex flex-col gap-10 items-center mt-5 w-[700px] m-auto h-[450px]'>
            {loginFieldFormControls.map(controlItem=>{
                return <CommonSkeleton value={loginFormData[controlItem.name]} onChange={(e)=>setLoginFormData({...loginFormData, [e.target.name]:e.target.value})}  controlItem={controlItem} handleLoginBtnDisable={handleLoginBtnDisable}/>
            })}
            <h3>Don't have an account? <Link href={'/sign-up'}>Signup</Link> </h3>
        </form>
    </div>
</div>
  )
}

export default page