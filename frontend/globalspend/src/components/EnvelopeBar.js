import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProgressBar from 'react-bootstrap/ProgressBar'

// table component
import {Table} from 'react-bootstrap'

// APIs
import BackendAPI from '../api/BackendAPI'

function EnvelopeBar(props) {
  const params = useParams()

  // states
  const [envelope, setEnvelope] = useState([])

  // effects
  useEffect(() => {
    const getEnvelope = async() => {
      const data = await BackendAPI.fetchEnvelopeByID(params.envelopeID)
      if (data) {
        setEnvelope(data)
      }
    }

    getEnvelope()
  }, [])

  // render helpers
  const renderEnvelope = (envelope) => {
    const progressBarFill = envelope.current_amt/envelope.fill_amt*100
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
            <tr>
              <td><Link to={`/envelope/${envelope.id}/`} style={{color:'black'}}>{envelope.envelope_name}</Link></td>
              <td colSpan={4}><ProgressBar variant="success" now={ progressBarFill } /></td>
              <td>{Math.round(envelope.current_amt)}/{Math.round(envelope.fill_amt)}</td>
            </tr>
        </tbody>
      </Table>
    )
  }


  // render
  return (
    <div>
      <h1>{envelope.envelope_name}</h1>
      { renderEnvelope(envelope) }
    </div>
  )
}

export default EnvelopeBar;