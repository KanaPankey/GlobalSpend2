// // react
// import { useState, useEffect } from 'react'

// // APIs
// import BackendAPI from './BackendAPI'


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