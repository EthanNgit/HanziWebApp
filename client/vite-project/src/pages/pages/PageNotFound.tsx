import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/PageNotFound.css'

function PageNotFound() {
  return (
    <div className='page-not-found-content'>
        <h1 className='page-not-found-header'>Page not found</h1>
        <p className='page-not-found-description'>You may have mistyped the address or the page may have moved.</p>
        <Link to='/' className='page-not-found-link'>Return home</Link>
    </div>
  )
}

export default PageNotFound