import { useNavigate, useParams } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import BackendAPI from "../api/BackendAPI"
import { useEffect, useState } from 'react'

function AddEditTransactionPage() {
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


  // changes depending on whether adding or editing
  const editingTransaction = transaction
  const action = editingTransaction ? "Edit" : "Add"

  // handlers
  const handleFormSubmit = async (event) => {
    event.preventDefault()

    const transactionObj = {
      transaction_name: event.target.elements[0].value,
      original_transaction_amt: event.target.elements[1].value,
      home_transaction_amt: event.target.elements[2].value,
      is_debit_transaction: event.target.elements[3].value,
      envelope: event.target.elements[4].value,
      store: event.target.elements[5].value,
      notes: event.target.elements[6].value
    }

    const data = editingTransaction 
      ? await BackendAPI.updateTransaction(transactionObj, params.transactionID)
      : await BackendAPI.addTransaction(transactionObj)
    if (data) {
      navigate(`/transaction/${data.id}`)
    }
  }

  // render
  return (
    <div>
      <h2>{action} Transaction Page</h2>
      <hr />
      <Form onSubmit={handleFormSubmit}>
        <Form.Group>
          <Form.Label>Transaction Date</Form.Label>
          <Form.Control placeholder="date" defaultValue={editingTransaction && editingTransaction.transaction_date} />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Spent in local currency</Form.Label>
          <Form.Control placeholder="amt in local" defaultValue={editingTransaction && editingTransaction.original_transaction_amt} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Spent in home currency</Form.Label>
          <Form.Control placeholder="amt in home" defaultValue={editingTransaction && editingTransaction.home_transaction_amt} />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Debit or deposit</Form.Label>
          <Form.Control placeholder="true or false" defaultValue={editingTransaction && editingTransaction.is_debit_transaction} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Envelope</Form.Label>
          <Form.Control placeholder="envelope" defaultValue={editingTransaction && editingTransaction.envelope} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Store</Form.Label>
          <Form.Control placeholder="store" defaultValue={editingTransaction && editingTransaction.store} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Notes</Form.Label>
          <Form.Control placeholder="notes" defaultValue={editingTransaction && editingTransaction.notes} />
        </Form.Group>

        <br />
        <Button variant="primary" type="submit">
          {action} Transaction
        </Button>  
      </Form>  
    </div>
  )
}

export default AddEditTransactionPage;