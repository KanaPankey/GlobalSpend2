// effects
import { useEffect, useState } from 'react'

// css
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';

// router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages
import HomePage from './pages/HomePage';
import ConverterPage from './pages/ConverterPage';
import StoreListPage from './pages/StoreListPage';
import StorePage from './pages/StorePage';
import AddStorePage from './pages/AddStorePage';
import EditStorePage from './pages/EditStorePage';
import DeleteStorePage from './pages/DeleteStorePage';
import EnvelopeListPage from './pages/EnvelopeListPage';
import EnvelopePage from './pages/EnvelopePage';
import AddEditEnvelopePage from './pages/AddEditEnvelopePage';
import DeleteEnvelopePage from './pages/DeleteEnvelopePage';
import TransactionListPage from './pages/TransactionListPage';
import TransactionPage from './pages/TransactionPage';
import EditTransactionPage from './pages/EditTransactionPage';
import DeleteTransactionPage from './pages/DeleteTransactionPage';

// api
import ConverterAPI from './api/ConverterAPI'
import BackendAPI from './api/BackendAPI'


function App() {

  // states...home and spend rates are in relation to EUR
  const [homeCurrency, setHomeCurrency] = useState('USD') // future multi-currency functionality
  const [spendCurrency, setSpendCurrency] = useState('NOK') // future multi-currency functionality
  const [homeRate, setHomeRate] = useState(null) 
  const [spendRate, setSpendRate] = useState(null) 
  const [relativeRate, setRelativeRate] = useState(null)  
  
  // states...for userlocation and default store
  const [storeList, setStoreList] = useState([])
  const [userPosition, setUserPosition] = useState([])
  const [userStore, setUserStore] = useState(null)
  
  // get conversion rate
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
    }
    getConversionRate()  
  }, [])
  
  // calculate relative exchange rate between home and spend currencies through EUR
  useEffect(() => {
    let getRelativeRate = homeRate/spendRate
    setRelativeRate(getRelativeRate)
  }, [spendRate, homeRate])
  
  
  // get user's current position
  useEffect(() => {
    if (window.navigator.geolocation) {
      const success = (position) => {
        const data = position
        setUserPosition([data.coords.latitude, data.coords.longitude])
      }
      
      const error = (error) => {
        console.log(error)
      }
      
      window.navigator.geolocation.getCurrentPosition(success, error)
    }
  }, [])
  
  // get list of stores
  useEffect(() => {
    const getStores = async () => {
      const data = await BackendAPI.fetchStores()
      if (data) {
        setStoreList(data)
      }
    }

    getStores()
  }, [])  

  // get lat and long from each store and compare to userlocation
  // sets user store to store closest to user current position if it's within a given radius
  useEffect(() => {
    const distanceList = []
    for (let i = 0; i < storeList.length; i++) {
      // pull in user latlong and store instance latlong
      let userLat = userPosition[0]
      let userLong = userPosition[1]
      let storeLat = storeList[i].store_latitude
      let storeLong = storeList[i].store_longitude

      // Haversine distance equation to find distance as crow flies between two latlongs
      const R = 6371000;  // Radius of the Earth in meters
      let rUserLat = userLat * (Math.PI/180.0)  // Convert degrees to radians
      let rStoreLat = storeLat * (Math.PI/180.0)  // Convert degrees to radians
      let rUserLong = userLong * (Math.PI/180.0)  // Convert degrees to radians
      let rStoreLong = storeLong * (Math.PI/180.0)  // Convert degrees to radians
      let diffLat = rStoreLat - rUserLat  // Radian difference (latitudes)
      let diffLong = rStoreLong - rUserLong  // Radian difference (longitudes)

      let a = Math.sin(diffLat/2.0)**2 + Math.cos(storeLat) * Math.cos(userLat) * Math.sin(diffLong/2.0)**2

      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

      let distanceKM = (R * c)/1000.0
      let distance = distanceKM.toFixed(3)

      // creates an array with store id and the distance from the user
      distanceList.push([storeList[i], distance])
    }

    // determine if there are any stores in a given radius and, if so, which is closest
    let radius = 0.3 // in km
    let distClosestStore = radius // any store must be closer than the radius distance from user location to count
    let ClosestStoreObj = null
    
    // check if store is closer than previous ones
    for (let i = 0; i < distanceList.length; i++) {
      if (distanceList[i][1] < distClosestStore) {
        distClosestStore = distanceList[i][1]
        ClosestStoreObj = distanceList[i][0]
      }
    }

    // if closest store is closer than maximum radius
    if (distClosestStore < radius) {
      setUserStore(ClosestStoreObj)
    } 
    
  }, [storeList, userPosition])

  
  const renderNavbar = () => {
    return(
        <Navbar variant='dark' bg="success" expand="sm">
          <Container className="navItem">
            <Navbar.Brand href="/">GlobalSpend</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/envelope/">Envelopes</Nav.Link>
                <Nav.Link href="/transaction/">Transactions</Nav.Link>
                <Nav.Link href="/store/">Stores</Nav.Link>
                <NavDropdown title="Actions" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/store/add/">Add Store</NavDropdown.Item>
                  <NavDropdown.Item href="/envelope/add">Add Envelope</NavDropdown.Item>
                  <NavDropdown.Item href="/">Add Transaction</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/converter/">Currency Converter</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
          <div className="text-right mx-5" style={{color: 'white'}}>
            <Nav.Link href='/converter/' style={{color:'whitesmoke'}}>Converter</Nav.Link>
          </div>
        </Navbar>
    )
  }

  return (
    <div>
      { renderNavbar() }

      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage userStore={ userStore } rate={relativeRate}/>} />
          <Route exact path="/converter/" element={<ConverterPage rate={relativeRate} />} />
          <Route exact path="/store/" element={<StoreListPage />} />
          <Route exact path="/store/:storeID" element={<StorePage />} />
          <Route exact path="/store/add" element={<AddStorePage />} />
          <Route exact path="/store/:storeID/edit" element={<EditStorePage />} />
          <Route exact path="/store/:storeID/delete" element={<DeleteStorePage />} />
          <Route exact path="/envelope/" element={<EnvelopeListPage />} />
          <Route exact path="/envelope/:envelopeID" element={<EnvelopePage />} />
          <Route exact path="/envelope/add" element={<AddEditEnvelopePage />} />
          <Route exact path="/envelope/:envelopeID/edit" element={<AddEditEnvelopePage />} />
          <Route exact path="/envelope/:envelopeID/delete" element={<DeleteEnvelopePage />} />
          <Route exact path="/transaction/" element={<TransactionListPage />} />
          <Route exact path="/transaction/:transactionID" element={<TransactionPage />} />
          <Route exact path="/transaction/:transactionID/edit" element={<EditTransactionPage rate={relativeRate}/>} />
          <Route exact path="/transaction/:transactionID/delete" element={<DeleteTransactionPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;