import { useEffect, useState } from "react"

import BackendAPI from '../api/BackendAPI'


function StoreDropdown(props) {
  // states
  const [storeList, setStoreList] = useState([])

  // effects
  useEffect(() => {
    const getStoreList = async() => {
      const data = await BackendAPI.fetchStores()
      if (data) {
        setStoreList(data)
      }
    }
  
    getStoreList()
    }, [])
  
  // populates envelope option dropdown menu 

  return (
    <select id="store" >  
        {storeList.map((store, index) => {
        return (     
          props.defaultValue == store.id
          ? <option key={index} value={store.id} selected>{store.store_name}</option>
          : <option key={index} value={store.id}>{store.store_name}</option>
        )
        })}
    </select>
  )

}

export default StoreDropdown