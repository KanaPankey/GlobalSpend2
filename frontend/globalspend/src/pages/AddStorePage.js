import { useNavigate, useParams } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import BackendAPI from "../api/BackendAPI"
import { useEffect, useState } from 'react'

// api
import GetStoreLocationAPI from '../api/GetStoreLocationAPI'

function AddEditStorePage() {
  // router props
  const navigate = useNavigate()
  const params = useParams()

  // states
  const [store, setStore] = useState(null)
  const [storePosition, setStorePosition] = useState([])

  // get store lat long
  const getStoreLocation = async(event) => {
    const data = await GetStoreLocationAPI.fetchLatLongFromStore(event.target.value)
    if (data) {
    let storePosition = [parseFloat(data[0].lat), parseFloat(data[0].lon)]
    setStorePosition(storePosition)
    console.log("store position", storePosition)
    console.log("data", data)
    }
}

  // handlers
  const handleFormSubmit = async (event) => {
    event.preventDefault()

    const storeObj = {
      store_name: event.target.elements[0].value,
      store_longitude: storePosition[1],
      store_latitude: storePosition[0],
      amt_1: event.target.elements[2].value,
      amt_2: event.target.elements[3].value,
      amt_3: event.target.elements[4].value,
      amt_4: event.target.elements[5].value,
      envelope: [event.target.elements[1].value]
    }

    const data = await BackendAPI.addStore(storeObj)
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
          <Form.Control onChange={getStoreLocation} placeholder="name" />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Envelope</Form.Label>
          <Form.Control placeholder="envelope" />
        </Form.Group>
        <br />
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