import { useNavigate, useParams } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import BackendAPI from "../api/BackendAPI"
import { useEffect, useState } from 'react'

function AddEditEnvelopePage() {
  // router props
  const navigate = useNavigate()
  const params = useParams()

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


  // changes depending on whether adding or editing
  const editingEnvelope = envelope
  const action = editingEnvelope ? "Edit" : "Add"

  // handlers
  const handleFormSubmit = async (event) => {
    event.preventDefault()

    const envelopeObj = {
      envelope_name: event.target.elements[0].value,
      current_amt: event.target.elements[1].value,
      fill_amt: event.target.elements[2].value,
    }

    const data = editingEnvelope 
      ? await BackendAPI.updateEnvelope(envelopeObj, params.envelopeID)
      : await BackendAPI.addEnvelope(envelopeObj)
    if (data) {
      navigate(`/envelope/${data.id}`)
    }
  }

  // render
  return (
    <div className="container mt-4">
      <h2>{action} Envelope Page</h2>
      <hr />
      <Form onSubmit={handleFormSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control placeholder="name" defaultValue={editingEnvelope && editingEnvelope.envelope_name} />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Current Amount</Form.Label>
          <Form.Control placeholder="current amt" defaultValue={editingEnvelope && editingEnvelope.current_amt} />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Fill Amount</Form.Label>
          <Form.Control placeholder="fill amt" defaultValue={editingEnvelope && editingEnvelope.fill_amt} />
        </Form.Group>

        <br />
        <div className="text-center">
          <Button variant="success" type="submit">
            {action} Envelope
          </Button>  
        </div>
      </Form>  
    </div>
  )
}

export default AddEditEnvelopePage;