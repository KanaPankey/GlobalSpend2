import { useNavigate, useParams } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { useEffect, useState } from 'react'

// api
import BackendAPI from "../api/BackendAPI"

// components
import EnvelopeDropdown from "../components/EnvelopeDropdown"
import StoreDropdown from "../components/StoreDropdown"
import IsDebitDropdown from "../components/IsDebitDropdown"

function EditTransactionPage(props) {
  // router props
  const navigate = useNavigate()
  const params = useParams()

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
  const handleFormSubmit = async (event) => {
    event.preventDefault()

    let homeAmt = (event.target.elements[1].value * props.rate).toFixed(2) 

    // change current amount for the envelope(s) of transaction accounting
    let newEnvelope = event.target.elements[3].value
    let newAmt = event.target.elements[1].value
    let oldAmt = transaction.home_transaction_amt
    let oldEnvelopeCurrentAmt = null
    let newEnvelopeCurrentAmt = null
    let oldEnvelopeUpdatedAmt = null
    let newEnvelopeUpdatedAmt = null

    const oldEnvelopeData = await BackendAPI.fetchEnvelopeByID(transaction.envelope)
    if (oldEnvelopeData) {
      oldEnvelopeCurrentAmt = oldEnvelopeData.current_amt
    }

    const newEnvelopeData = await BackendAPI.fetchEnvelopeByID(newEnvelope)
    if (newEnvelopeData) {
      newEnvelopeCurrentAmt = newEnvelopeData.current_amt
    }

    // for case when envelope stays the same
    if (transaction.envelope == newEnvelope) {
      if (transaction.is_debit_transaction) {
        oldEnvelopeUpdatedAmt = oldEnvelopeCurrentAmt + oldAmt - newAmt
      } else {
        oldEnvelopeUpdatedAmt = oldEnvelopeCurrentAmt - oldAmt + newAmt
      }
      // update envelope
      const envelopeObj = {
        current_amt: oldEnvelopeUpdatedAmt
      }
      const doNotNeedVariable = await BackendAPI.updateEnvelope(envelopeObj, transaction.envelope)

    } else {
      // when envelope changes
      if (transaction.is_debit_transaction) {
        oldEnvelopeUpdatedAmt = oldEnvelopeCurrentAmt + oldAmt
        newEnvelopeUpdatedAmt = newEnvelopeCurrentAmt - newAmt
      } else {
        oldEnvelopeUpdatedAmt = oldEnvelopeCurrentAmt - oldAmt
        newEnvelopeUpdatedAmt = newEnvelopeCurrentAmt + newAmt
      }
      // update envelopes
      const envelopeObj1 = {
        current_amt: oldEnvelopeUpdatedAmt
      }
      const doNotNeedVariable = await BackendAPI.updateEnvelope(envelopeObj1, transaction.envelope)

      const envelopeObj2 = {
        current_amt: newEnvelopeUpdatedAmt
      }
      const doNotNeedVariable2 = await BackendAPI.updateEnvelope(envelopeObj2, newEnvelope)

    }
   
    const transactionObj = {
      transaction_date: event.target.elements[0].value,
      original_transaction_amt: newAmt,
      home_transaction_amt: homeAmt,
      is_debit_transaction: transaction.is_debit_transaction,
      envelope: event.target.elements[3].value,
      store: event.target.elements[4].value,
      notes: event.target.elements[5].value
    }

    console.log(transactionObj)
    
    const data = await BackendAPI.updateTransaction(transactionObj, params.transactionID)
    if (data) {
      navigate(`/transaction/${data.id}`)
    }
  }

  // render
  return (
    <div className="container mt-4">
      <h1>Edit Transaction Page</h1>
      <hr />
      <Form onSubmit={handleFormSubmit}>
        <Form.Group>
          <Form.Label>Transaction Date</Form.Label>
          <Form.Control placeholder="date" defaultValue={transaction && transaction.transaction_date}/>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Spent in local currency</Form.Label>
          <Form.Control placeholder="amt in local" defaultValue={transaction && transaction.original_transaction_amt}/>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Debit or deposit</Form.Label>
          <Form.Control readonly='readonly' defaultValue={transaction && (transaction.is_debit_transaction ? "Debit" : "Deposit")}/>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Envelope</Form.Label>
          <div><EnvelopeDropdown defaultValue={transaction && transaction.envelope}/></div>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Store</Form.Label>
          <div><StoreDropdown defaultValue={transaction && transaction.store}/></div>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Notes</Form.Label>
          <Form.Control placeholder="notes" defaultValue={transaction && transaction.notes} />
        </Form.Group>

        <br />
        <div className="text-center">
          <Button variant="success" type="submit">
            Edit Transaction
          </Button>  
        </div>
      </Form>  
    </div>
  )
}

export default EditTransactionPage;