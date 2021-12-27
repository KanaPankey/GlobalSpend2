// react
import { useNavigate, useParams } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { useEffect, useState } from 'react'

// API
import BackendAPI from "../api/BackendAPI"

// components

function HomePage(props) {
  // router props
  const navigate = useNavigate()
  // const params = useParams()

  console.log ("in home page", props.userStore)

  // states
  // const [transaction, setTransaction] = useState(null)
  // const [userStore, setUserStore] = useState(null)
  const [ spentInHomeCurrency, setSpentInHomeCurrency ] = useState(null)

  

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


  // calculates the amount spent in the home currency
  const calcSpentInHomeCurrency = (event) => {
    let spentInHomeCurrency = Math.round(event.target.value * props.rate, 2)
    setSpentInHomeCurrency(spentInHomeCurrency)
    // console.log("spent in home currency", spentInHomeCurrency)
  }

  // handlers
  const handleFormSubmit = async (event) => {
    event.preventDefault()

    // get date to populate transaction
    let today = new Date();



    const transactionObj = {
      transaction_date: today,
      original_transaction_amt: event.target.elements[0].value,
      home_transaction_amt: spentInHomeCurrency,
      is_debit_transaction: event.target.elements[1].value,
      envelope: event.target.elements[2].value,
      store: event.target.elements[3].value,
      notes: event.target.elements[4].value
    }


    const data = await BackendAPI.addTransaction(transactionObj)
    if (data) {
      navigate(`/transaction/${data.id}`)
    }

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
          <Form.Control placeholder="amt in local" onChange={ calcSpentInHomeCurrency } />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Debit or deposit</Form.Label>
          <Form.Control placeholder="true or false" defaultValue={true} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Envelope</Form.Label>
          <Form.Control placeholder="envelope" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Store</Form.Label>
          <Form.Control placeholder="store" defaultValue={props.userStore}/>
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