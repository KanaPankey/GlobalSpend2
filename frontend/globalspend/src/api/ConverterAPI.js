const api = 'f40b5159f15fb78282a936b6478aa839';

const BASE_URL = `http://api.exchangeratesapi.io/v1/latest?access_key=${api}`


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


const fetchRates = async () => {
  const url = BASE_URL
  return await tryCatchFetch(url)
}


const exportItems = {
  fetchRates
}

export default exportItems