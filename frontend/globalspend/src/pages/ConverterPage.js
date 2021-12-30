import { useEffect, useState } from "react";
import { InputGroup, FormControl, Form, Button } from 'react-bootstrap'

function ConverterPage(props) {
  // states
  const[price, setPrice] = useState(null)
  const[displayPrice, setDisplayPrice] = useState(0.00)

  // effects
  useEffect(() => {
    setDisplayPrice(parseFloat(price).toFixed(2))
  }, [price])
  
  // handlers
  const handleFormSubmit = (event) => {
    event.preventDefault()
    
    // calculates the user inputted price to the price in dollars
    const priceInput = event.target[0].value
    let convertedPrice = priceInput * props.rate
    setPrice(convertedPrice)
  }
  
  const renderConvertedPrice = (price) => {
    return (
      <div>
        <h2>Price in $: { displayPrice == 'NaN' ? '' : displayPrice }</h2>
        <br />
        <h6>Conversion rate: {props.rate}</h6>
      </div>
    )
  }
  
  return (
    <div className="container mt-4">
      <h1>Converter Page</h1>
      <hr />
      <br />
      { renderConvertedPrice(price) }
      <br />
      <hr />

      <Form onSubmit={ handleFormSubmit }>
        <InputGroup size="lg">
          <InputGroup.Text id="NOK-input-label">NOK</InputGroup.Text>
          <FormControl id="NOK-input" placeholder="Price in NOK"/>
        </InputGroup>
      <br />
        <div className="text-center">
          <Button variant="success" type="submit">
            Convert
          </Button>  
        </div>
      </Form>

    </div>
  )
}

export default ConverterPage;