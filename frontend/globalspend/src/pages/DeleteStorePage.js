import { useNavigate, useParams } from "react-router-dom"
import StoreAPI from "../api/StoreAPI"
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
      const data = await StoreAPI.fetchStoreByID(params.storeID) 
      console.log("data", data)
      setStore(data)
    }

    getStore()
  }, [] )

  useEffect (() => {
    console.log("store:", store)
  }, [store])

  // handlers
  const deleteStore = async () => {
    const data = await StoreAPI.deleteStore(params.storeID)
    if (data) {
      navigate(`/store/`)
    }
  }

  const doNotDelete = () => {
    navigate(`/store/${params.storeID}`)
  }

  // render
  return (
    <div>
      <h1>Are you sure you want to delete this store?</h1>
      <button onClick={ deleteStore }>Yes</button>
      <button onClick={ doNotDelete }>No</button>
    </div>
  )
}

export default DeleteStorePage;