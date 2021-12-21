import { useLocation, useNavigate, useParams } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import StoreAPI from "../api/StoreAPI"
import { useEffect, useState } from 'react'

function AddEditStorePage() {
  // router props
  const navigate = useNavigate()
  const params = useParams()

  // states
  const [store, setStore] = useState(null)

  // effects
  useEffect (() => {
    const getStore = async () => {
      const data = await StoreAPI.fetchStoreByID(params.storeID) 
      setStore(data)
    }

    getStore()
  }, [] )


  // changes depending on whether adding or editing
  const editingStore = store
  console.log('editingstore:', editingStore)
  const action = editingStore ? "Edit" : "Add"

  // handlers
  const handleFormSubmit = async (event) => {
    event.preventDefault()

    const storeObj = {
      store_name: event.target.elements[0].value,
      store_longitude: event.target.elements[3].value,
      store_latitude: event.target.elements[2].value,
      amt_1: event.target.elements[4].value,
      amt_2: event.target.elements[5].value,
      amt_3: event.target.elements[6].value,
      amt_4: event.target.elements[7].value,
      envelope: [event.target.elements[1].value]
    }

    const data = editingStore 
      ? await StoreAPI.updateStore(storeObj, params.storeID)
      : await StoreAPI.addStore(storeObj)
    if (data) {
      navigate(`/store/${data.id}`)
    }
  }

  // render
  return (
    <div>
      <h2>{action} Store Page</h2>
      <hr />
      <Form onSubmit={handleFormSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control placeholder="name" defaultValue={editingStore && editingStore.store_name} />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Envelope</Form.Label>
          <Form.Control placeholder="envelope" defaultValue={editingStore && editingStore.envelope} />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Location: Latitude</Form.Label>
          <Form.Control placeholder="latitude" defaultValue={editingStore && editingStore.store_latitude} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Location: Longitude</Form.Label>
          <Form.Control placeholder="longitude" defaultValue={editingStore && editingStore.store_longitude} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Typical Amount 1</Form.Label>
          <Form.Control placeholder="amt_1" defaultValue={editingStore && editingStore.amt_1} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Typical Amount 2</Form.Label>
          <Form.Control placeholder="amt_2" defaultValue={editingStore && editingStore.amt_2} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Typical Amount 3</Form.Label>
          <Form.Control placeholder="amt_3" defaultValue={editingStore && editingStore.amt_3} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Typical Amount 4</Form.Label>
          <Form.Control placeholder="amt_4" defaultValue={editingStore && editingStore.amt_4} />
        </Form.Group>

        <br />
        <Button variant="primary" type="submit">
          {action} Store
        </Button>  
      </Form>  
    </div>
  )
}

export default AddEditStorePage;