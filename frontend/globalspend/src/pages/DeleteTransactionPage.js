import { useNavigate, useParams } from "react-router-dom"
import BackendAPI from "../api/BackendAPI"
import { useEffect, useState } from 'react'

// css
import Button from 'react-bootstrap/Button'

function DeleteTransactionPage(props) {
  // routers
  const params = useParams()
  const navigate = useNavigate()

  // states
  const [transaction, setTransaction] = useState(null)

  // effects
  useEffect (() => {
    const getTransaction = async () => {
      const data = await BackendAPI.fetchTransactionByID(params.transactionID) 
      setTransaction(data)
    }

    getTransaction()
  }, [] )

  // handlers
  const deleteTransaction = async () => {
    let data = await BackendAPI.deleteTransaction(params.transactionID)
    
    // change current amt for the envelope of transaction accounting for debit/deposit
    const envelope = await BackendAPI.fetchEnvelopeByID(transaction.envelope)

    let newCurrentAmt = null
    if (envelope) {
      let envelopeCurrentAmt = parseFloat(envelope.current_amt)
      let homeAmt = parseFloat(transaction.home_transaction_amt)
      if (transaction.is_debit_transaction) {
        newCurrentAmt = (envelopeCurrentAmt + homeAmt).toFixed(2)
      } else {
        newCurrentAmt = envelopeCurrentAmt - homeAmt
      }
      
      // update envelope
      const envelopeObj = {
        current_amt: newCurrentAmt
      }
      console.log(envelopeObj)
      let newEnvelope = await BackendAPI.updateEnvelope(envelopeObj, transaction.envelope)

      if (newEnvelope) {
        navigate(`/transaction/`)
      }
    }

  }
  
  const doNotDelete = () => {
    navigate(`/transaction/${params.transactionID}`)
  }

  // render
  return (
    <div className="container mt-4 text-center">
      {transaction && <h1>Are you sure you want to delete this transaction?</h1>}
      <br />
      <hr />
      <div>
        <Button onClick={ deleteTransaction } variant="success">Yes</Button>{' '}
        <Button onClick={ doNotDelete } variant="success">No</Button>
      </div>
    </div>)

}

export default DeleteTransactionPage;