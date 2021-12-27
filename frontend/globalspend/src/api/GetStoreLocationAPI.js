const api = 'pk.6d8f36ffb7c400d2fe02117015c63fe7';
// const SEARCH_STRING = 'Kiwi';
const countryCode = 'no'

const BASE_URL = `https://eu1.locationiq.com/v1/search.php?key=${api}&countrycodes=${countryCode}&format=json&q=$`


const tryCatchFetch = async (url, init = null) => {
  try {
    const response = await fetch(url, init)
    if (response.ok) {
      return await response.json()
    }
    else {
      throw new Error(`Bad response: ${response.status} ${response.statusText}`)
    }
  }
  catch (e) {
    console.error(e)
    return null
  }
}


const fetchLatLongFromStore = async (storeName) => {
  const url = BASE_URL + storeName
  return await tryCatchFetch(url)
}


const exportItems = {
  fetchLatLongFromStore
}

export default exportItems





// function GetUserLocationAPI() {
//   // states
//   const [storeList, setStoreList] = useState([])
//   const [storeLatitude, setStoreLatitude] = useState(null)
//   const [storeLongitude, setStoreLongitude] = useState(null)
//   const [userLatitude, setUserLatitude] = useState(null)
//   const [userLongitude, setUserLongitude] = useState(null)
//   const [userStore, setUserStore] = useState(null)

//   console.log('in getuserlocation')

//   // get user's current position
//   if (window.navigator.geolocation) {
//     const success = (position) => {
//       const data = position
//       setUserLatitude(data.coords.latitude)
//       setUserLongitude(data.coords.longitude)
//       // console.log(data.coords.latitude, "here", userLatitude)
//       // console.log(data.coords.longitude, userLongitude)
//     }
  
//     const error = (error) => {
//       console.log(error)
//     }
  
//     window.navigator.geolocation.getCurrentPosition(success, error)
//   }

//   //effects
//   useEffect(() => {
//     const getStores = async () => {
//       const data = await BackendAPI.fetchStores()
//       if (data) {
//         setStoreList(data)
//       }
//     }

//     getStores()
//   }, [])  

//   useEffect(() => {
//     storeList.map((store) => {
//       if (store.store_longitude == userLongitude && store.store_latitude == userLatitude) {
//         setUserStore(store.id)
//       }

//   }, [storeList])
//   })


//   const fetchUserStore = () => {
//     return userStore
//   }
// }


// const exportItems = {
//   GetUserLocationAPI,
//   // fetchUserStore
// }

// export default exportItems