// effects
import { useEffect, useState } from 'react'

// css
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';

// router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// components

// pages
import HomePage from './pages/HomePage';
import ConverterPage from './pages/ConverterPage';
import StoreListPage from './pages/StoreListPage';
import StorePage from './pages/StorePage';
import AddEditStorePage from './pages/AddEditStorePage';
import DeleteStorePage from './pages/DeleteStorePage';
import EnvelopeListPage from './pages/EnvelopeListPage';
import EnvelopePage from './pages/EnvelopePage';
import AddEditEnvelopePage from './pages/AddEditEnvelopePage';
import DeleteEnvelopePage from './pages/DeleteEnvelopePage';
import TransactionPage from './pages/TransactionPage';
import AddEditTransactionPage from './pages/AddEditTransactionPage';
import DeleteTransactionPage from './pages/DeleteTransactionPage';

// api
import ConverterAPI from './api/ConverterAPI'
// import getLocation from "../api/GetPositionAPI";


function App() {

  // states...home and spend rates are in relation to EUR
  const [homeCurrency, setHomeCurrency] = useState('USD') // future multi-currency functionality
  const [spendCurrency, setSpendCurrency] = useState('NOK') // future multi-currency functionality
  const [homeRate, setHomeRate] = useState(1.127)  // hard-coded to prevent API calls
  const [spendRate, setSpendRate] = useState(10.152)  // hard-coded to prevent API calls
  const [relativeRate, setRelativeRate] = useState(null)


  // effects
  // retrieve exchange rates from API compared to EUR
  useEffect(() => {
    const getConversionRate = async() => {
      const data = await ConverterAPI.fetchRates()
      if (data) {
        let getHomeRate = data.rates.USD
        setHomeRate(getHomeRate)
        let getSpendRate = data.rates.NOK
        setSpendRate(getSpendRate)
      }

      // getConversionRate()  
    }
  }, [])
  
  // calculate relative exchange rate between home and spend currencies through EUR
  useEffect(() => {
    let getRelativeRate = homeRate/spendRate
    setRelativeRate(getRelativeRate)

  }, [spendRate])


  // fetching props to pass down to pages
  

  const renderNavbar = () => {
    return(
        <Navbar bg="light" expand="sm">
          <Container>
            <Navbar.Brand href="/">GlobalSpend</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/envelope/">Envelopes</Nav.Link>
                <Nav.Link href="/store/">Stores</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/store/add/">Add Store</NavDropdown.Item>
                  <NavDropdown.Item href="/envelope/add">Add Envelope</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
          <Container>
            <Nav.Link href={'/converter/'}>Converter</Nav.Link>
          </Container>
        </Navbar>
    )
  }

  return (
    <div className="App">
      { renderNavbar() }

      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/converter/" element={<ConverterPage rate={relativeRate} />} />
          <Route exact path="/store/" element={<StoreListPage />} />
          <Route exact path="/store/:storeID" element={<StorePage />} />
          <Route exact path="/store/add" element={<AddEditStorePage />} />
          <Route exact path="/store/:storeID/edit" element={<AddEditStorePage />} />
          <Route exact path="/store/:storeID/delete" element={<DeleteStorePage />} />
          <Route exact path="/envelope/" element={<EnvelopeListPage />} />
          <Route exact path="/envelope/:envelopeID" element={<EnvelopePage />} />
          <Route exact path="/envelope/add" element={<AddEditEnvelopePage />} />
          <Route exact path="/envelope/:envelopeID/edit" element={<AddEditEnvelopePage />} />
          <Route exact path="/envelope/:envelopeID/delete" element={<DeleteEnvelopePage />} />
          <Route exact path="/transaction/:transactionID" element={<TransactionPage />} />
          <Route exact path="/transaction/add" element={<AddEditTransactionPage />} />
          <Route exact path="/transaction/:transactionID/edit" element={<AddEditTransactionPage />} />
          <Route exact path="/transaction/:transactionID/delete" element={<DeleteTransactionPage />} />



        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
