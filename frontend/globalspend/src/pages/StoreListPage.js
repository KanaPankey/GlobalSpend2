import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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
    return storeLists.map((storeList, index) => {
      return (
        // <li key={index+1}>
        //   <h1>{storeList[index].store_name}</h1>
        //   <Link to={`/store/${storeList.index}/`}>{ storeList.store_name }</Link>
        // </li>
        <tr key={index}>
          <td>{storeList.id}</td>
          <td><Link to={`/store/${storeList.id}/`}>{storeList.store_name}</Link></td>
          <td>{storeList.envelope}</td>
        </tr>
      )
    })
    
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