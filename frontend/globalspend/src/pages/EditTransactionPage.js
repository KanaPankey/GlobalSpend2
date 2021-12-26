import { useNavigate, useParams } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import BackendAPI from "../api/BackendAPI"
import { useEffect, useState } from 'react'

function EditTransactionPage() {
  // router props
  const navigate = useNavigate()
  const params = useParams()

  // states
  const [transaction, setTransaction] = useState(null)

  // effects
  useEffect (() => {
    console.log("in edit transaction", params.transactionID)
    const getTransaction = async () => {
      const data = await BackendAPI.fetchTransactionByID(params.transactionID) 
      console.log(data)
      setTransaction(data)
    }

    getTransaction()
  }, [] )

  // handlers
  const handleFormSubmit = async (event) => {
    event.preventDefault()

    const transactionObj = {
      transaction_date: event.target.elements[0].value,
      original_transaction_amt: event.target.elements[1].value,
      home_transaction_amt: event.target.elements[2].value,
      is_debit_transaction: event.target.elements[3].value,
      envelope: event.target.elements[4].value,
      store: event.target.elements[5].value,
      notes: event.target.elements[6].value
    }

    const data = await BackendAPI.updateTransaction(transactionObj, params.transactionID)
    if (data) {
      navigate(`/transaction/${data.id}`)
    }
  }

  // render
  return (
    <div>
      <h2>Edit Transaction Page</h2>
      <hr />
      <Form onSubmit={handleFormSubmit}>
        <Form.Group>
          <Form.Label>Transaction Date</Form.Label>
          <Form.Control placeholder="date" value={transaction && transaction.transaction_date}/>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Spent in local currency</Form.Label>
          <Form.Control placeholder="amt in local" value={transaction && transaction.original_transaction_amt}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Spent in home currency</Form.Label>
          <Form.Control placeholder="amt in home" value={transaction && transaction.home_transaction_amt}/>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Debit or deposit</Form.Label>
          <Form.Control placeholder="true or false" value={transaction && transaction.is_debit_transaction}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Envelope</Form.Label>
          <Form.Control placeholder="envelope" value={transaction && transaction.envelope} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Store</Form.Label>
          <Form.Control placeholder="store" value={transaction && transaction.store} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Notes</Form.Label>
          <Form.Control placeholder="notes" value={transaction && transaction.notes} />
        </Form.Group>

        <br />
        <Button variant="primary" type="submit">
          Edit Transaction
        </Button>  
      </Form>  
    </div>
  )
}

export default EditTransactionPage;