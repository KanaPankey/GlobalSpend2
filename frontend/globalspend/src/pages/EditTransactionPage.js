import { useNavigate, useParams } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { useEffect, useState } from 'react'

// api
import BackendAPI from "../api/BackendAPI"

// components
import EnvelopeDropdown from "../components/EnvelopeDropdown"
import StoreDropdown from "../components/StoreDropdown"

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

  // handler
  const handleFormSubmit = async (event) => {
    event.preventDefault()

    const promiseArray = []

    // determine if spend amount changed...default to old amount if not changed
    let oldAmt = transaction.original_transaction_amt
    let oldHomeAmt = parseFloat(transaction.home_transaction_amt)
    let newAmt = event.target.elements[1].value
    let newHomeAmt = parseFloat(transaction.home_transaction_amt)
    if (oldAmt != newAmt) {
      newHomeAmt = parseFloat(newAmt * props.rate).toFixed(2) 
    }
    let deltaHomeAmt = newHomeAmt - oldHomeAmt // positive if money spent increased
    
    // set up for determining if envelope changed
    let newEnvelope = event.target.elements[3].value
    let oldEnvelopeCurrentAmt = null
    let newEnvelopeCurrentAmt = null
    let oldEnvelopeUpdatedAmt = null
    let newEnvelopeUpdatedAmt = null

    const oldEnvelopeData = await BackendAPI.fetchEnvelopeByID(transaction.envelope)
    if (oldEnvelopeData) {
      oldEnvelopeCurrentAmt = parseFloat(oldEnvelopeData.current_amt)
    }
    
    const newEnvelopeData = await BackendAPI.fetchEnvelopeByID(newEnvelope)
    if (newEnvelopeData) {
      newEnvelopeCurrentAmt = parseFloat(newEnvelopeData.current_amt)
    }

    // for case when envelope stays the same and there is a change in money spent
    if (transaction.envelope == newEnvelope && deltaHomeAmt != 0) {
      oldEnvelopeUpdatedAmt = oldEnvelopeCurrentAmt - deltaHomeAmt

      // update envelopes
      const envelopeObj = {
        current_amt: oldEnvelopeUpdatedAmt
      }
      promiseArray.push(await BackendAPI.updateEnvelope(envelopeObj, transaction.envelope))
    }

    // for case when envelope changes
    if (transaction.envelope != newEnvelope) {
      if (transaction.is_debit_transaction) {
        oldEnvelopeUpdatedAmt = oldEnvelopeCurrentAmt + oldHomeAmt
        newEnvelopeUpdatedAmt = newEnvelopeCurrentAmt - newHomeAmt
      } else {
        oldEnvelopeUpdatedAmt = oldEnvelopeCurrentAmt - oldHomeAmt
        newEnvelopeUpdatedAmt = newEnvelopeCurrentAmt + newHomeAmt
      }

      // update envelopes
      const envelopeObj1 = {
        current_amt: oldEnvelopeUpdatedAmt
      }
      promiseArray.push(await BackendAPI.updateEnvelope(envelopeObj1, transaction.envelope))

      const envelopeObj2 = {
        current_amt: newEnvelopeUpdatedAmt
      }
      promiseArray.push(await BackendAPI.updateEnvelope(envelopeObj2, newEnvelope))
    }
   
    const transactionObj = {
      transaction_date: event.target.elements[0].value,
      original_transaction_amt: newAmt,
      home_transaction_amt: newHomeAmt,
      is_debit_transaction: transaction.is_debit_transaction,
      envelope: event.target.elements[3].value,
      store: event.target.elements[4].value,
      notes: event.target.elements[5].value
    }
    promiseArray.push(await BackendAPI.updateTransaction(transactionObj, params.transactionID))

    // if (data) {
    //   navigate(`/transaction/${data.id}`)
    // }

    Promise.all(promiseArray)
    .then(values => {
      navigate(`/transaction/${transaction.id}`)
    })
    .catch(error => {
      console.error(error.message)
    })
  }

  // render
  return (
    <div className="container mt-4">
      <h1>Edit Transaction Page</h1>
      <hr />
      <Form onSubmit={handleFormSubmit}>
        <Form.Group>
          <Form.Label>Transaction Date</Form.Label>
          <Form.Control readOnly='readOnly' placeholder="date" defaultValue={transaction && transaction.transaction_date}/>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Spent in local currency</Form.Label>
          <Form.Control placeholder="amt in local" defaultValue={transaction && transaction.original_transaction_amt}/>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Debit or deposit</Form.Label>
          {/* <div><IsDebitDropdown /></div> need calculations for this option change*/}
          <Form.Control readOnly='readOnly' defaultValue={transaction && (transaction.is_debit_transaction ? "Debit" : "Deposit")}/>
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