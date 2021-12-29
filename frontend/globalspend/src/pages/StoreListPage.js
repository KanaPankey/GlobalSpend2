import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// table component
import {Table} from 'react-bootstrap'

// css
import Button from 'react-bootstrap/Button'

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
                <td><Link to={`/store/${storeList.id}/`} style={{color:'black'}}>{storeList.store_name}</Link></td>
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
      <div className="container mt-4">
        <h1>Store List</h1>
        { renderStoreList(storeLists) }
        <div className="text-center">
          <Link to={`/store/add`}>  
            <Button variant="success" type="submit">
              Add Store
            </Button>  
          </Link>
        </div>
      </div>
    )
  }

export default StoreListPage;