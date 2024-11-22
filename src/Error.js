import React from 'react'
import { useRouteError,Link } from 'react-router-dom'
const Error = () => {
  
  return (
    <div className='error'>
<h1>No Page Found!!</h1>
<Link to={'/'}>Back to Home</Link>
    </div>
  )
}

export default Error