// react
import { useNavigate, useParams } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { useEffect, useState } from 'react'

// API
import BackendAPI from "../api/BackendAPI"

// components
// import GetUserLocationAPI from "../api/GetUserLocationAPI"

function HomePage(props) {
  // router props
  // const navigate = useNavigate()
  // const params = useParams()

  // states
  // const [transaction, setTransaction] = useState(null)
  // const [userStore, setUserStore] = useState(null)

  

  // effects
  // useEffect (() => {
  //   // **** can refactor to get rid of async...just need to setUserStore
  //   const getUserStore = async() => {
  //     const userStore = GetUserLocationAPI.fetchUserStore()
  //     if (userStore) {
  //       setUserStore(userStore)
  //     }
  //   }
    
  //   getUserStore()
  // }, [] )

  // console.log(GetUserLocationAPI.fetchUserStore())


  // changes depending on whether adding or editing
  // const editingTransaction = transaction
  // const action = editingTransaction ? "Edit" : "Add"

  // handlers
  const handleFormSubmit = async (event) => {
    event.preventDefault()

    // get date to populate transaction
    let today = new Date();
    // let dd = String(today.getDate()).padStart(2,'0');
    // let mm = String(today.getMonth() + 1).padStart(2, '0')
    // let yyyy = today.getFullYear();
    // let currentDate = mm +'/' + dd + '/' + yyyy


    const transactionObj = {
      transaction_date: today,
      original_transaction_amt: event.target.elements[0].value,
      home_transaction_amt: event.target.elements[1].value,
      is_debit_transaction: event.target.elements[2].value,
      envelope: event.target.elements[3].value,
      store: event.target.elements[4].value,
      notes: event.target.elements[5].value
    }


    // const data = editingTransaction 
    //   ? await BackendAPI.updateTransaction(transactionObj, params.transactionID)
    //   : await BackendAPI.addTransaction(transactionObj)
    // if (data) {
    //   navigate(`/transaction/${data.id}`)
    // }
  }

  // render
  return (
    <div>
      <h2>Home Page</h2>
      <hr />
      <Form onSubmit={handleFormSubmit}>
        <br />
        <Form.Group>
          <Form.Label>Spent in local currency</Form.Label>
          <Form.Control placeholder="amt in local"  />
        </Form.Group>
        <Form.Group>
          <Form.Label>Spent in home currency</Form.Label>
          <Form.Control placeholder="amt in home" />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Debit or deposit</Form.Label>
          <Form.Control placeholder="debit or deposit" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Envelope</Form.Label>
          <Form.Control placeholder="envelope"  />
        </Form.Group>
        <Form.Group>
          <Form.Label>Store</Form.Label>
          <Form.Control placeholder="store" defaultValue={props.userStore} />
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

export default HomePage;