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
  const [storeList, setStoreList] = useState([])
  const [storePosition, setStorePosition] = useState([])
  const [storeName, setStoreName] = useState('')

  // get store lat long
  const getStoreLocation = async(event) => {
    const data = await GetStoreLocationAPI.fetchLatLongFromStore(event.target.value)
    if (data) {
        if (data.length == 1) {
            let storePosition = [parseFloat(data[0].lat), parseFloat(data[0].lon)]
            setStorePosition(storePosition)
        } else {
            setStoreList(data)
        }
    // console.log("store position", storePosition)
    // console.log("data", data)
    }
}

  // reads the value from th drop down menu and sets the store latlong
  const selectStore = () => {
      let storeIndex = document.getElementById('store').value;
      let store = storeList[storeIndex]
      console.log("store", store)
      let storePosition = [parseFloat(store.lat), parseFloat(store.lon)]
      setStorePosition(storePosition)
      let storeName = store.display_name
      setStoreName(storeName)
  }

  // populates store option dropdown menu if more than 1 store returns from api
  const DisplayStores = () => {
    return (
        <select id="store" onChange={selectStore}>  
            {storeList.map((store, index) => {
            return (     
                <option value={index}>{store.display_name}</option>
            )
            })}
        </select>
    )
  }

  // populates store option drop down menu if multiple store ptions
  useEffect(() => {
    DisplayStores()
  }, [storeList])

  // handlers
  const handleFormSubmit = async (event) => {
    event.preventDefault()

    const storeObj = {
      store_name: event.target.elements[0].value,
      store_longitude: storePosition[1],
      store_latitude: storePosition[0],
      amt_1: parseInt(event.target.elements[2].value),
      amt_2: parseInt(event.target.elements[3].value),
      amt_3: parseInt(event.target.elements[4].value),
      amt_4: parseInt(event.target.elements[5].value),
      envelope: [parseInt(event.target.elements[1].value)]
    }

    console.log("storeobj", storeObj)
    const data = await BackendAPI.addStore(storeObj)
    if (data) {
      navigate(`/store/${data.id}`)
    }
  }

  // render
  return ( 
    <div className="container">
      <h2>Add Store Page</h2>
      <hr />
      <DisplayStores />
      <Form onSubmit={handleFormSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control onChange={getStoreLocation} placeholder="name or address" />
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