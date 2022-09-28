import React from 'react'
import { Link } from 'wouter'

export default function Home () {
  
  return (
    <>
      <h1 className='paginas-titulo mt-5'>BMTools Home</h1>
      <Link to='/documentacion-tecnica'  className='btn btn-secondary mx-5 my-4'>Next</Link>
    </>
  )
}