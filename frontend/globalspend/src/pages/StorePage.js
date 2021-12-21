import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

// APIs
import StoreAPI from '../api/StoreAPI'

function StorePage(props) {
  // states
  const [store, setStore] = useState(null)

  const params = useParams()

  //effects
  useEffect(() => {
    const getStore = async (id) => {
      const data = await StoreAPI.fetchStoreByID(id)
      if (data) {
        setStore(data)
      }
    }

    getStore(params.storeID)
  }, [params.storeID])

  const renderStore = () => {
    if (!store) {
      return null
    }

    return (
      <div>
        <h3>Store: {store.store_name}</h3>
        <h3>Envelope: {store.envelope}</h3>
        <h3>Typical spend amount: {store.amt_1}, {store.amt_2}, {store.amt_3}, {store.amt_4}</h3>

      </div>
    )
  }

  return (
    <div>
      <h1>Store Page</h1>
      { renderStore() }
      <Link to={`/store/${store.id}/edit`}><button>Edit task</button></Link>
    </div>
  )
}

export default StorePage;