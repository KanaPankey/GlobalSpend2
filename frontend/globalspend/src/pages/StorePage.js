import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

// APIs
import BackendAPI from '../api/BackendAPI'

function StorePage(props) {
  // states
  const [store, setStore] = useState(null)
  const [envelopeList, setEnvelopeList] = useState([])

  const params = useParams()

  //effects
  useEffect(() => {
    const getStore = async () => {
      const data = await BackendAPI.fetchStoreByID(params.storeID)
      if (data) {
        setStore(data)
      }
    }

    getStore()
  }, [])

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

  // render helper
  const renderStore = () => {
    if (!store) {
      return null
    }

    return (
      <div>
        <h3>Store: {store.store_name}</h3>
        <h3>Envelope: {displayEnvelopeName(store.envelope)}</h3>
        <h3>Typical spend amount: {store.amt_1}, {store.amt_2}, {store.amt_3}, {store.amt_4}</h3>

      </div>
    )
  }

  // render
  return (
    <div className="container mt-4">
      <h1>Store Page</h1>
      { renderStore() }
      <Link to={`/store/${params.storeID}/edit`}><button>Edit Store</button></Link>
      <Link to={`/store/${params.storeID}/delete`}><button>Delete Store</button></Link>
    </div>
  )
}

export default StorePage;