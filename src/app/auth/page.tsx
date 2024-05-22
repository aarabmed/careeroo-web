'use client'
 
import { redirect, useRouter } from 'next/navigation'
import { GetServerSidePropsContext } from 'next/types'
import { useEffect } from 'react'
 


export default function Page() {
  
  redirect('/auth/login')
 
}