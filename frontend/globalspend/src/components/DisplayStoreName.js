import { useEffect, useState } from "react"

import BackendAPI from '../api/BackendAPI'


function DisplayStoreName(props) {
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
            <option key={index} value={store.id}>{store.store_name}</option>
        )
        })}
    </select>
  )

}

export default DisplayStoreName