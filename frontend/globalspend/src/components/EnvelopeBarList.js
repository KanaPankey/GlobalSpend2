// react
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// css
import ProgressBar from 'react-bootstrap/ProgressBar'
import Table from 'react-bootstrap/Table'

// APIs
import BackendAPI from '../api/BackendAPI'

function EnvelopeBarList(props) {
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
    return (
      <Table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {envelopeLists.map((envelopeList, index) => {
          const progressBarFill = envelopeList.current_amt/envelopeList.fill_amt*100
          return (
            <tr key={index} >
              <td className='w-25'><Link to={`/envelope/${envelopeList.id}/`} style={{color:'black'}}>{envelopeList.envelope_name}</Link></td>
              <td colSpan="4"><ProgressBar variant="success" now={ progressBarFill } /></td>
              <td>$ {Math.round(envelopeList.current_amt)}/{Math.round(envelopeList.fill_amt)}</td>
            </tr>
          )
        })}
        </tbody>
      </Table>
    )
  }


  // render
  return (
    <div>
      { renderEnvelopeList(envelopeLists) }
    </div>
  )
}

export default EnvelopeBarList;