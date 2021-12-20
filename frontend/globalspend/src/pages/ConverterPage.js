import { useEffect, useState } from "react";
import { InputGroup, FormControl, Form, Button } from 'react-bootstrap'

function ConverterPage(props) {
  // states
  const[price, setPrice] = useState(null)
  const[displayPrice, setDisplayPrice] = useState(null)

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
        <h2>Price in $: {displayPrice}</h2>
        <h2>Conversion rate: {props.rate}</h2>
      </div>
    )
  }
  
  return (
    <div>
      <h1>Converter Page</h1>

      <Form onSubmit={ handleFormSubmit }>
        <InputGroup size="lg">
          <InputGroup.Text id="NOK-input-label">NOK</InputGroup.Text>
          <FormControl id="NOK-input" placeholder="Price in NOK"/>
        </InputGroup>
        <Button variant="primary" type="submit">Convert</Button>
      </Form>

      { renderConvertedPrice(price) }

    </div>
  )
}

export default ConverterPage;