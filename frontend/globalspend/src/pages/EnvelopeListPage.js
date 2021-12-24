import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// APIs
import BackendAPI from '../api/BackendAPI'

function EnvelopeListPage(props) {
  // states
  const [envelopeLists, setEnvelopeLists] = useState([])

  // effects
  useEffect(() => {
    const getEnvelopeLists = async() => {
      const data = await BackendAPI.fetchEnvelopes()
      if (data) {
        setEnvelopeLists(data)
      }
    }

    getEnvelopeLists()
  }, [])

  // render helpers
  const renderEnvelopeList = (envelopeLists) => {
    return envelopeLists.map((envelopeList, index) => {
      return (
        <tr key={index}>
          <td>{envelopeList.id}</td>
          <td><Link to={`/envelope/${envelopeList.id}/`}>{envelopeList.envelope_name}</Link></td>
          <td>{envelopeList.envelope}</td>
        </tr>
      )
    })
  }


  // const renderStoreList = (storeLists) => {
  //   return (
  //     <Table striped bordered hover>
  //       <thead>
  //         <tr>
  //           <th>#</th>
  //           <th colSpan="2">Envelope Name</th>
  //           <th>Envelope</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //       {storeLists.map((storeList, index) => {
  //         return (
  //           <tr key={index}>
  //             <td>{storeList.id}</td>
  //             <td colSpan="2"><Link to={`/store/${storeList.id}/`}>{storeList.store_name}</Link></td>
  //             <td>{storeList.envelope}</td>
  //           </tr>
  //         )
  //       })}
  //       </tbody>
  //     </Table>
  //   )
  // }


  // render
  return (
    <div>
      <h1>EnvelopeList Page</h1>
      { renderEnvelopeList(envelopeLists) }
      <Link to={`/envelope/add`}><button>Add Envelope</button></Link>
    </div>
  )
}

export default EnvelopeListPage;