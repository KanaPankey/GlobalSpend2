import { useNavigate, useParams } from "react-router-dom"
import BackendAPI from "../api/BackendAPI"
import { useEffect, useState } from 'react'

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
    <div className="container mt-4">
      {store && <h1>Are you sure you want to delete {store.store_name}?</h1>}
      <button onClick={ deleteStore }>Yes</button>
      <button onClick={ doNotDelete }>No</button>
    </div>)

}

export default DeleteStorePage;