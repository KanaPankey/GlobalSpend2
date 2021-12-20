import { useNavigate } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import StoreAPI from "../api/StoreAPI"

function AddEditStorePage() {
  const navigate = useNavigate()

  const handleFormSubmit = async (event) => {
    event.preventDefault()

    const storeData = {
      store_name: event.target.elements[0].value,
      store_longitude: event.target.elements[3].value,
      store_latitude: event.target.elements[2].value,
      amt_1: event.target.elements[4].value,
      amt_2: event.target.elements[5].value,
      amt_3: event.target.elements[6].value,
      amt_4: event.target.elements[7].value,
      envelope: [event.target.elements[1].value]
    }

    const data = await StoreAPI.addStore(storeData)
    if (data) {
      navigate(`/store/${data.id}`)
    }
  }

  // render
  return (
    <div>
      <h2>Add Store Page</h2>
      <hr />
      <Form onSubmit={handleFormSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control placeholder="name" />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Envelope</Form.Label>
          <Form.Control placeholder="envelope" />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Location: Latitude</Form.Label>
          <Form.Control placeholder="latitude" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Location: Longitude</Form.Label>
          <Form.Control placeholder="longitude" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Typical Amount 1</Form.Label>
          <Form.Control placeholder="amt_1" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Typical Amount 2</Form.Label>
          <Form.Control placeholder="amt_2" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Typical Amount 3</Form.Label>
          <Form.Control placeholder="amt_3" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Typical Amount 4</Form.Label>
          <Form.Control placeholder="amt_4" />
        </Form.Group>

        <br />
        <Button variant="primary" type="submit">
          Add Store
        </Button>  
      </Form>  
    </div>
  )
}

export default AddEditStorePage;