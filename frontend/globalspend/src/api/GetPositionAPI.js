if (window.navigator.geolocation) {
  const success = (position) => {
    const data = position
    console.log(data.coords.latitude)
  }

  const error = (error) => {
    console.log(error)
  }

  window.navigator.geolocation.getCurrentPosition(success, error)
}



// import { useEffect } from "react";

// function getLocation() {
//   useEffect(() => {
//     if ("geolocation" in navigator) {
//       console.log("Available");
//     } else {
//       console.log("Not Available")
//     }
//   }, [])

//   const fetchPosition = async () => {
//     return navigator.geolocation.getCurrentPosition()
//   }

//   const fetchRates = async () => {
//     const url = BASE_URL
//     return await tryCatchFetch(url)
//   }
// }

// export default getLocation;

// const api = 'f40b5159f15fb78282a936b6478aa839';

// const BASE_URL = `http://api.exchangeratesapi.io/v1/latest?access_key=${api}`


// const tryCatchFetch = async (url, init = null) => {
//   try {
//     const response = await fetch(url, init)
//     if (response.ok) {
//       return await response.json()
//     }
//     else {
//       throw new Error(`Bad response: ${response.status} ${response.statusText}`)
//     }
//   }
//   catch (e) {
//     console.error(e)
//     return null
//   }
// }


// const fetchRates = async () => {
//   const url = BASE_URL
//   return await tryCatchFetch(url)
// }


// const exportItems = {
//   fetchRates
// }

// export default exportItems