import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

// APIs
import BackendAPI from '../api/BackendAPI'

// css
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

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
        <Table striped bordered>
        <thead>
          <th></th>
          <th></th>
        </thead>
        <tbody>
          <tr>
            <td>Store</td>
            <td>{store.store_name}</td>
          </tr>
          <tr>
            <td>Envelope</td>
            <td>{displayEnvelopeName(store.envelope)}</td>
          </tr>
          <tr>
            <td>Typical spend amount</td>
            <td>{store.amt_1}, {store.amt_2}, {store.amt_3}, {store.amt_4}</td>
          </tr>
        </tbody>
      </Table>
      </div>
    )
  }

  // render
  return (
    <div className="container mt-4">
      <h1>Store Page</h1>
      <hr />
      { renderStore() }
      <hr />
      <div className="text-center">
        <Link to={`/store/${params.storeID}/edit`}><Button variant='success'>Edit Store</Button></Link>{' '}
        <Link to={`/store/${params.storeID}/delete`}><Button variant='success'>Delete Store</Button></Link>
      </div>
    </div>
  )
}

export default StorePage;