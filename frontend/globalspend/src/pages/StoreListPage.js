import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// table component
import {Table} from 'react-bootstrap'

// APIs
import BackendAPI from '../api/BackendAPI'

function StoreListPage(props) {
  // states
  const [storeLists, setStoreLists] = useState([])

  // effects
  useEffect(() => {
    const getStoreLists = async() => {
      const data = await BackendAPI.fetchStores()
      if (data) {
        setStoreLists(data)
      }
    }

    getStoreLists()
  }, [])

  // render helpers
  const renderStoreList = (storeLists) => {
      return (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Store Name</th>
              <th>Envelope</th>
            </tr>
          </thead>
          <tbody>
          {storeLists.map((storeList, index) => {
            return (
              <tr key={index}>
                <td>{storeList.id}</td>
                <td><Link to={`/store/${storeList.id}/`}>{storeList.store_name}</Link></td>
                {console.log(storeList.envelope)}
                <td>{storeList.envelope}</td>
              </tr>
            )
          })}
          </tbody>
        </Table>
      )
    }

    return (
      <div>
        <h1>StoreList Page</h1>
        { renderStoreList(storeLists) }
        <Link to={`/store/add`}><button>Add Store</button></Link>
      </div>
    )
  }

export default StoreListPage;