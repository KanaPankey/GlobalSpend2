import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProgressBar from 'react-bootstrap/ProgressBar'

// table component
import {Table} from 'react-bootstrap'

// APIs
import BackendAPI from '../api/BackendAPI'

// components
import EnvelopeBarList from '../components/EnvelopeBarList'

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

  // helper functions


  // // render helpers
  // const renderEnvelopeList = (envelopeLists) => {
    
  //   return (
  //     <Table bordered hover>
  //       <thead>
  //         <tr>
  //           <th>Envelope Name</th>
  //           <th>Envelope</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //       {envelopeLists.map((envelopeList, index) => {
  //         const progressBarFill = envelopeList.current_amt/envelopeList.fill_amt*100
  //         console.log(envelopeList.current_amt, envelopeList.fill_amt, progressBarFill)
  //         return (
  //           <tr key={index} >
  //             <td><Link to={`/envelope/${envelopeList.id}/`}>{envelopeList.envelope_name}</Link></td>
  //             <td><ProgressBar now={ progressBarFill } /></td>
  //             <td>{envelopeList.current_amt}/{envelopeList.fill_amt}</td>
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
      <h1>Envelopes</h1>
      <EnvelopeBarList />
      <Link to={`/envelope/add`}><button>Add Envelope</button></Link>
    </div>
  )
}

export default EnvelopeListPage;