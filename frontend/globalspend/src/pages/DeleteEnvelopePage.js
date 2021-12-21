import { useNavigate, useParams } from "react-router-dom"
import BackendAPI from "../api/BackendAPI"
import { useEffect, useState } from 'react'

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
    <div>
      {envelope && <h1>Are you sure you want to delete {envelope.envelope_name}?</h1>}
      <button onClick={ deleteEnvelope }>Yes</button>
      <button onClick={ doNotDelete }>No</button>
    </div>)

}

export default DeleteEnvelopePage;