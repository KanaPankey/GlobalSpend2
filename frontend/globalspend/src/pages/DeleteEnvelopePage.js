import { useNavigate, useParams } from "react-router-dom"
import BackendAPI from "../api/BackendAPI"
import { useEffect, useState } from 'react'

// css
import Button from 'react-bootstrap/Button'

function DeleteEnvelopePage(props) {
  // routers
  const params = useParams()
  const navigate = useNavigate()

  // states
  const [envelope, setEnvelope] = useState(null)

  // effects
  useEffect (() => {
    const getEnvelope = async () => {
      const data = await BackendAPI.fetchEnvelopeByID(params.envelopeID) 
      setEnvelope(data)
    }

    getEnvelope()
  }, [] )
  
  // handlers
  const deleteEnvelope = async () => {
    const data = await BackendAPI.deleteEnvelope(params.envelopeID)
    navigate(`/envelope/`)
  }
  
  const doNotDelete = () => {
    navigate(`/envelope/${params.envelopeID}`)
  }

  // render
  return (
    <div className="container mt-4 text-center">
      {envelope && <h1>Are you sure you want to delete the "{envelope.envelope_name}" envelope?</h1>}
      <br />
      <hr />
      <div>
        <Button onClick={ deleteEnvelope } variant="success">Yes</Button>{' '}
        <Button onClick={ doNotDelete } variant="success">No</Button>
      </div>
    </div>)
}

export default DeleteEnvelopePage;