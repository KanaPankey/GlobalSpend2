// react
import { useNavigate } from "react-router-dom"
import { Form, Button, ButtonToolbar, ButtonGroup, InputGroup, FormControl } from "react-bootstrap"
import { useEffect, useState } from 'react'

// API
import BackendAPI from "../api/BackendAPI"

// components

function HomePage(props) {
  // router props
  const navigate = useNavigate()
  // const params = useParams()

  console.log ("in home page", props.userStore) // *******************************

  // states
  const [ spendAmt, setSpendAmt ] = useState(null)

  // handlers
  const handleFormSubmit = async (event) => {
    event.preventDefault()

    // get date to populate transaction
    let today = new Date();

    console.log("rate in homepage", props.rate) // ********************************
    
    // set amount spent in home currency
    let spentInHomeCurrency = event.target.elements[0].value * props.rate
    let homeAmt = parseFloat(spentInHomeCurrency).toFixed(2)

    // values used by new transaction obj and envelope
    let envelopeID = parseInt(event.target.elements[2].value)
    let isDebit = event.target.elements[1].value

    const transactionObj = {
      transaction_date: today,
      original_transaction_amt: event.target.elements[0].value,
      home_transaction_amt: homeAmt,
      is_debit_transaction: isDebit,
      envelope: envelopeID,
      store: event.target.elements[3].value,
      notes: event.target.elements[4].value
    }

    console.log("transobj", transactionObj)  // ***************************************
    
    // create transaction record
    const data = await BackendAPI.addTransaction(transactionObj)
    if (data) {
      navigate(`/transaction/${data.id}`)
    }
    
    // change current amt for the envelope of transaction accounting for debit/deposit
    const envelope = await BackendAPI.fetchEnvelopeByID(envelopeID)
    let newCurrentAmt 
    if (envelope) {
      let envelopeCurrentAmt = envelope.current_amt
      if (isDebit) {
        newCurrentAmt = envelopeCurrentAmt - homeAmt
      } else {
        newCurrentAmt = envelopeCurrentAmt + homeAmt
      }

      // update envelope
      const envelopeObj = {
        current_amt: newCurrentAmt
      }
      const newEnvelope = await BackendAPI.updateEnvelope(envelopeObj, envelopeID)
    }


  }

  const setSpendAmount = (event) => {
    // console.log("clicked", event)
    let spendAmt = event.target.firstChild.data
    // console.log("spendAmt", spendAmt)
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
    <div className="container mt-4">
      <hr />
      <TypicalAmtTiles />
      <hr />
      <Form onSubmit={handleFormSubmit}>
        <Form.Group>
          <Form.Label>Spent in local currency</Form.Label>
          <Form.Control placeholder="amt in local" value={spendAmt}/>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Debit or deposit</Form.Label>
          <Form.Control placeholder="true or false" defaultValue={true} />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Envelope</Form.Label>
          <Form.Control placeholder="envelope" defaultValue={props.userStore && props.userStore.envelope.envelope_name}/>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Store</Form.Label>
          <Form.Control placeholder="store" defaultValue={props.userStore && props.userStore.id}/>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Notes</Form.Label>
          <Form.Control placeholder="notes" />
        </Form.Group>

        <br />
        <div className="text-center">
          <Button variant="success" type="submit">
            Add Transaction
          </Button>  
        </div>
      </Form>  
    </div>
  )
}

export default HomePage;