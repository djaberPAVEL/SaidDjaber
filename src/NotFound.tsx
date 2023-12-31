import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const NotFound = (() => {
  return (
    <>
     <h1>404 page not found </h1>
     <Link to='/' className='btn btn-primary' >Back home</Link>
    </>
  )
})


export default NotFound