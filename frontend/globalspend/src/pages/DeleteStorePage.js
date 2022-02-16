import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from 'react'

// APIs
import BackendAPI from "../api/BackendAPI"

// css
import Button from 'react-bootstrap/Button'

function DeleteStorePage(props) {
  // routers
  const params = useParams()
  const navigate = useNavigate()

  // states
  const [store, setStore] = useState(null)

  // effects
  useEffect (() => {
    const getStore = async () => {
      const data = await BackendAPI.fetchStoreByID(params.storeID) 
      setStore(data)
    }

    getStore()
  }, [] )

  
  // handlers
  const deleteStore = async () => {
    const data = await BackendAPI.deleteStore(params.storeID)
    navigate(`/store/`)
  }
  
  const doNotDelete = () => {
    navigate(`/store/${params.storeID}`)
  }

  // render
  return (
    <div className="container mt-4 text-center">
      {store && <h1>Are you sure you want to delete {store.store_name}?</h1>}
      <br />
      <hr />
      <div>
        <Button onClick={ deleteStore } variant="success">Yes</Button>{' '}
        <Button onClick={ doNotDelete } variant="success">No</Button>
      </div>
    </div>)

}

export default DeleteStorePage;