'use client'

import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { logout } from '@/actions'

const Logout= () => {
 
    const handleLogout=async()=>{
        await logout()
    }
  return (
    <div>
        <Button onClick={()=>handleLogout()}>Logout</Button>
    </div>
  )
}

export default Logout