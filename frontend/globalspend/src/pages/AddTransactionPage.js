// react
import { useNavigate, useParams } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { useEffect, useState } from 'react'

// API
import BackendAPI from "../api/BackendAPI"

// components

function AddTransactionPage(props) {
  // router props
  const navigate = useNavigate()
  // const params = useParams()

  console.log ("in add transaction page", props.relativeRate)

  // handlers
  const handleFormSubmit = async (event) => {
    event.preventDefault()
    console.log("props", props.currencyRate)

    // get date to populate transaction
    let today = new Date();

    const transactionObj = {
      transaction_date: today,
      original_transaction_amt: parseInt(event.target.elements[0].value),
      home_transaction_amt: parseInt(event.target.elements[0].value * props.currencyRate),
      is_debit_transaction: true,
      envelope: event.target.elements[2].value,
      store: parseInt(event.target.elements[3].value),
      notes: event.target.elements[4].value
    }
    console.log("transObj", transactionObj)

    const data = await BackendAPI.addTransaction(transactionObj)
    if (data) {
      navigate(`/transaction/${data.id}`)
    }

  }

  // render
  return (
    <div className="container mt-4">
      <hr />
      <Form onSubmit={handleFormSubmit}>
        <br />
        <Form.Group>
          <Form.Label>Spent in local currency</Form.Label>
          <Form.Control placeholder="amt in local"  />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Debit or deposit</Form.Label>
          <Form.Control placeholder="true or false" defaultValue={true}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Envelope</Form.Label>
          <Form.Control placeholder="envelope" value={props.userStore.envelope} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Store</Form.Label>
          <Form.Control placeholder="store" value={props.userStore.store_name} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Notes</Form.Label>
          <Form.Control placeholder="notes" />
        </Form.Group>

        <br />
        <Button variant="primary" type="submit">
          Add Transaction
        </Button>  
      </Form>  
    </div>
  )
}

export default AddTransactionPage;