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



// store display name
useEffect(() => {
  const getStoreLists = async() => {
    const data = await BackendAPI.fetchStores()
    if (data) {
      setStoreList(data)
    }
  }

  getStoreLists()
}, [])

// store id to name
const displayStoreName = (storeID) => {
  for (let i = 0; i < storeList.length; i++) {
    if (storeList[i].id == storeID) {
      return storeList[i].store_name
    }
  }
}

// envelope display name
useEffect(() => {
  const getEnvelopeList = async() => {
    const data = await BackendAPI.fetchEnvelopes()
    if (data) {
      setEnvelopeList(data)
    }
  }

  getEnvelopeList()
}, [])

// envelope id to name
const displayEnvelopeName = (envelopeID) => {
  for (let i = 0; i < envelopeList.length; i++) {
    if (envelopeList[i].id == envelopeID) {
      return envelopeList[i].envelope_name
    }
  }
}