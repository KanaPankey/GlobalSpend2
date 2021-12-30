// react
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

// css
import Button from 'react-bootstrap/Button'

// components
import EnvelopeBarList from '../components/EnvelopeBarList'

// APIs
import BackendAPI from '../api/BackendAPI'

function EnvelopeListPage(props) {
  // states
  const [envelopeList, setEnvelopeList] = useState([])

  // effects
  useEffect(() => {
    const getEnvelopeList = async() => {
      const data = await BackendAPI.fetchEnvelopes()
      if (data) {
        setEnvelopeList(data)
      }
    }

    getEnvelopeList()
  }, [])
  
  const addMoneyToEnvelopes = async() => {
    for(let i=0; i < envelopeList.length; i++) { 
      let newBalance = parseInt(envelopeList[i].current_amt) + parseInt(envelopeList[i].fill_amt)

      const envelopeObj = {
        current_amt: newBalance,
      }

      const envelopeID = envelopeList[i].id
      const data = await BackendAPI.updateEnvelope(envelopeObj, envelopeList[i].id)
    }
    document.location.reload()
  }

  // render
  return (
    <div className='container mt-4'>
      <h1>Envelope List</h1>
      <EnvelopeBarList />
      <div className="text-center">
        <Link to={`/envelope/add`}><Button variant="success">Add Envelope</Button></Link>{' '}
        <Button variant="success" onClick={addMoneyToEnvelopes}>Add Money to Envelopes</Button>
      </div>
    </div>
  )
}

export default EnvelopeListPage;