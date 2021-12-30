import { useNavigate, useParams } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import BackendAPI from "../api/BackendAPI"
import { useEffect, useState } from 'react'

// api
import GetStoreLocationAPI from '../api/GetStoreLocationAPI'
import EnvelopeDropdown from "../components/EnvelopeDropdown"

function AddEditStorePage() {
  // router props
  const navigate = useNavigate()

  // states
  const [storeList, setStoreList] = useState([])
  const [storePosition, setStorePosition] = useState([])

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
    }
  }

  // populates store option drop down menu if multiple store ptions
  useEffect(() => {
    DisplayStores()
  }, [storeList])
  
  // populates store option dropdown menu if more than 1 store returns from api
  const DisplayStores = () => {
    return (
        <select id="store">  
            {storeList.map((store, index) => {
            return (     
                <option value={index}>{store.display_name}</option>
            )
            })}
            <option value={20}>Custom Store: Add info below</option>
        </select>
    )
  }
  
  // handlers
  const handleFormSubmit = async (event) => {
    event.preventDefault()

    let storeName = ''
    let storePosition = []
    
    if (document.getElementById('store').value != '20') {
      // reads the value from the drop down menu and sets the store latlong
      let storeIndex = document.getElementById('store').value;
      let store = storeList[storeIndex]
      console.log("store", store)
      storePosition = [parseFloat(store.lat), parseFloat(store.lon)]
  
      // reads the value from the drop down menu and sets store name
      let storeInfoArray = store.display_name.split(',')
      storeName = storeInfoArray[0]
    } else {
      storeName = event.target.elements[7].value
      storePosition = [event.target.elements[8].value, event.target.elements[9].value]
    }

    const storeObj = {
      store_name: storeName,                //event.target.elements[0].value,
      store_longitude: storePosition[1],
      store_latitude: storePosition[0],
      amt_1: parseInt(event.target.elements[3].value),
      amt_2: parseInt(event.target.elements[4].value),
      amt_3: parseInt(event.target.elements[5].value),
      amt_4: parseInt(event.target.elements[6].value),
      envelope: [parseInt(event.target.elements[2].value)]
    }

    console.log("storeobj", storeObj)
    const data = await BackendAPI.addStore(storeObj)
    if (data) {
      navigate(`/store/${data.id}`)
    }
  }

  // render helper

  // render
  return ( 
    <div className="container mt-4">
      <h1>Add Store Page</h1>
      <hr />
      <Form onSubmit={handleFormSubmit}>
        <Form.Group>
          <Form.Label>Search for Store</Form.Label>
          <Form.Control onChange={getStoreLocation} placeholder="name or address" />
        </Form.Group>
      <DisplayStores />
        <br />
        <br />
        <Form.Group>
          <Form.Label>Envelope</Form.Label>
          <div><EnvelopeDropdown /></div>
          {/* <Form.Control placeholder="envelope" /> */}
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
        <Form.Group>
          <Form.Label>Custom Store: Name</Form.Label>
          <Form.Control placeholder="latitude" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Custom Store: Latitude</Form.Label>
          <Form.Control placeholder="latitude" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Custom Store: Longitude</Form.Label>
          <Form.Control placeholder="longitude" />
        </Form.Group>

        <br />
        <div className="text-center">
          <Button variant="success" type="submit">
            Add Store
          </Button>  
        </div>
      </Form>  
    </div>
  )
}

export default AddEditStorePage;