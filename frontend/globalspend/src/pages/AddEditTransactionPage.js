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
      current_amt: event.target.elements[1].value,
      fill_amt: event.target.elements[2].value,
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
          <Form.Label>Name</Form.Label>
          <Form.Control placeholder="name" defaultValue={editingTransaction && editingTransaction.envelope_name} />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Current Amount</Form.Label>
          <Form.Control placeholder="current amt" defaultValue={editingTransaction && editingTransaction.current_amt} />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Fill Amount</Form.Label>
          <Form.Control placeholder="fill amt" defaultValue={editingTransaction && editingTransaction.fill_amt} />
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