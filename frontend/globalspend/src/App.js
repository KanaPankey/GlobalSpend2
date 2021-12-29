// effects
import { useEffect, useState } from 'react'

// css
// import 'cdn.datatables.net/1.11.3/css/jquery.dataTables.min.css'  //table formatter
// import 'cdn.datatables.net/1.11.3/js/jquery.dataTables.min.js'   // table formatter
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
  const [homeRate, setHomeRate] = useState(1.13005)  // hard-coded to prevent API calls
  const [spendRate, setSpendRate] = useState(9.959586)  // hard-coded to prevent API calls
  const [relativeRate, setRelativeRate] = useState(null)  // hard-coded to prevent API calls
  
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
        // console.log("conversion rate", data)  // ********************************************
        let getHomeRate = data.rates.USD
        setHomeRate(getHomeRate)
        let getSpendRate = data.rates.NOK
        setSpendRate(getSpendRate)
      }
    }
    // getConversionRate()  
  }, [])
  
  // calculate relative exchange rate between home and spend currencies through EUR
  useEffect(() => {
    let getRelativeRate = homeRate/spendRate
    setRelativeRate(getRelativeRate)
  }, [spendRate, homeRate])
  
  
  // get user's current position
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

  // get lat and long from each store and compare to userlocation...sets user store
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
      let distance = Math.round(distanceKM, 3)

      // let distance = 2 * R * Math.asin(Math.sqrt(Math.sin(diffLat/2) * Math.sin(diffLat/2) + Math.cos(rUserLat) * Math.cos(rStoreLat) * Math.sin(diffLong/2) * Math.sin(diffLong/2)))

      // creates an array with store id and the distance from the user
      distanceList.push([storeList[i], distance])
    }
    console.log(distanceList)

    // determine if there are any stores in a given radius and, if so, which is closest
    let radius = 100
    let distClosestStore = radius // any store must be closer than the radius distance from user location to count
    let ClosestStoreObj = null

    // check if store is closer than previous ones
    for (let i = 0; i < distanceList.length; i++) {
      if (distanceList[i][1] < distClosestStore) {
        distClosestStore = distanceList[i][1]
        ClosestStoreObj = distanceList[i][0]
      }
    }

    // console.log("closest store obj", ClosestStoreObj)
    if (distClosestStore < radius) {
      setUserStore(ClosestStoreObj)
    } 
    
  }, [storeList])

  // this is what we need
  // useEffect(() => {

  // }, [userStore])
  

  const renderNavbar = () => {
    return(
        <Navbar bg="success" expand="sm">
          <Container>
            <Navbar.Brand href="/">GlobalSpend</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/envelope/">Envelopes</Nav.Link>
                <Nav.Link href="/store/">Stores</Nav.Link>
                <Nav.Link href="/transaction/">Transactions</Nav.Link>
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
            <Nav.Link href='/converter/' style={{color:'black'}}>Converter</Nav.Link>
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
          <Route exact path="/transaction/:transactionID/edit" element={<EditTransactionPage />} />
          <Route exact path="/transaction/:transactionID/delete" element={<DeleteTransactionPage />} />
        </Routes>
      </BrowserRouter>

    </div>


  );
}

export default App;