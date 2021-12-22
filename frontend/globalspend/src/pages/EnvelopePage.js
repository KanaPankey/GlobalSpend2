import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

// APIs
import BackendAPI from '../api/BackendAPI'

function EnvelopePage(props) {
  // states
  const [envelope, setEnvelope] = useState(null)
  const [transactionLists, setTransactionLists] = useState([])

  const params = useParams()

  //effects
  useEffect(() => {
    const getEnvelope = async () => {
      const data = await BackendAPI.fetchEnvelopeByID(params.envelopeID)
      if (data) {
        setEnvelope(data)
      }
    }

    const getTransactionLists = async () => {
      const data = await BackendAPI.fetchTransactions()
      if (data) {
        setTransactionLists(data)
      }
    }

    getEnvelope()
    getTransactionLists()
  }, [])


  // render helpers
  const renderEnvelope = () => {
    if (!envelope) {
      return null
    }

    return (
      <div>
        <h3>Envelope: {envelope.envelope_name}</h3>
        <h3>Current Amt: {envelope.current_amt}</h3>
        <h3>Fill Amt: {envelope.fill_amt}</h3>

      </div>
    )
  }

  const renderTransactionList = () => {
    return transactionLists.map((transactionList, index) => {
      return (
        <Link to={`/transaction/${transactionList.id}`}>
          <tr key={index}>
            <td>{transactionList.transaction_date}</td>
            <td>{transactionList.store}</td>
            <td>{transactionList.original_transaction_amt}</td>
          </tr>
        </Link>

      )
    })
  }

  return (
    <div>
      <h1>Envelope Page</h1>
      { renderEnvelope() }
      <div>{ renderTransactionList() }</div>
      <Link to={`/envelope/${params.envelopeID}/edit`}><button>Edit Envelope</button></Link>
      <Link to={`/envelope/${params.envelopeID}/delete`}><button>Delete Envelope</button></Link>
      <Link to={`/`}><button>Add Transaction</button></Link>
    </div>
  )
}

export default EnvelopePage;