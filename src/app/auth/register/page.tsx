'use client'
 
import { redirect, useRouter } from 'next/navigation'


export default function Page() {
  
  redirect('/auth/login')
 
}