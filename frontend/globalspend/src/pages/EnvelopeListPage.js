import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// APIs
import BackendAPI from '../api/BackendAPI'

// CSS
import Button from 'react-bootstrap/Button'

// components
import EnvelopeBarList from '../components/EnvelopeBarList'

function EnvelopeListPage(props) {

  // render
  return (
    <div className='container'>
      <EnvelopeBarList />
      <div className="text-center">
        <Link to={`/envelope/add`}><Button variant="success">Add Envelope</Button></Link>
      </div>
    </div>
  )
}

export default EnvelopeListPage;