// react
import { useNavigate, useParams } from "react-router-dom"
import { Form, Button, ButtonToolbar, ButtonGroup, InputGroup, FormControl } from "react-bootstrap"
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
  const [ spentInHomeCurrency, setSpentInHomeCurrency ] = useState(null)
  const [ spendAmt, setSpendAmt ] = useState(null)


  // calculates the amount spent in the home currency
  const calcSpentInHomeCurrency = (event) => {
    console.log(event.target.value, props.rate)
    let spentInHomeCurrency = event.target.value * props.rate
    setSpentInHomeCurrency(spentInHomeCurrency)
    console.log("spent in home currency", spentInHomeCurrency)
  }

  // handlers
  const handleFormSubmit = async (event) => {
    event.preventDefault()

    // get date to populate transaction
    let today = new Date();
    
    // set amount spent
    let homeAmt = parseFloat(spentInHomeCurrency).toFixed(2)

    const transactionObj = {
      transaction_date: today,
      original_transaction_amt: event.target.elements[0].value,
      home_transaction_amt: homeAmt,
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

  const setSpendAmount = (event) => {
    let spendAmt = event.target.__reactProps$g0mhz7l8lxs.children
    console.log("clicked", spendAmt)
    setSpendAmt(spendAmt)
  }

  // helpers for TeypicalAmtTitles render function
  let amt1 = props.userStore && props.userStore.amt_1
  let amt2 = props.userStore && props.userStore.amt_2
  let amt3 = props.userStore && props.userStore.amt_3
  let amt4 = props.userStore && props.userStore.amt_4


  // render helpers
  const TypicalAmtTiles = (props) => {
    if (amt1) {
      return(
        <ButtonToolbar className="justify-content-between" aria-label="Toolbar with Button groups">
          <ButtonGroup onClick={ setSpendAmount } size="lg" aria-label="First group">
            <Button variant="secondary">{amt1}</Button>{' '}
          </ButtonGroup>
          <ButtonGroup onClick={ setSpendAmount } size="lg" aria-label="First group">
            <Button variant="secondary">{amt2}</Button>{' '}
          </ButtonGroup>
          <ButtonGroup onClick={ setSpendAmount } size="lg" aria-label="First group">
            <Button variant="secondary">{amt3}</Button>{' '}
          </ButtonGroup>
          <ButtonGroup onClick={ setSpendAmount } size="lg" aria-label="First group">
            <Button variant="secondary">{amt4}</Button>{' '}
          </ButtonGroup>
        </ButtonToolbar>
      )
    } else {
      return ''
}
  }

  // render
  return (
    <div>
      <TypicalAmtTiles />
      <hr />
      <Form onSubmit={handleFormSubmit}>
        <br />
        <Form.Group>
          <Form.Label>Spent in local currency</Form.Label>
          <Form.Control placeholder="amt in local" onChange={ calcSpentInHomeCurrency } value={spendAmt}/>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Debit or deposit</Form.Label>
          <Form.Control placeholder="true or false" defaultValue={true} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Envelope</Form.Label>
          <Form.Control placeholder="envelope" defaultValue={props.userStore && props.userStore.envelope}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Store</Form.Label>
          <Form.Control placeholder="store" defaultValue={props.userStore && props.userStore.id}/>
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