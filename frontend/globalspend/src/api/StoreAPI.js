// const BASE_URL = `https://globalspend.herokuapp.com/`
const BASE_URL = `http://localhost:8000/`


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


const fetchStores = async () => {
  const url = BASE_URL + 'store/'
  return await tryCatchFetch(url)
}

const fetchStoreByID = async (storeID) => {
  const url = BASE_URL + 'store/' + storeID
  return await tryCatchFetch(url)
}

const addStore = async (storeObj) => {
  const url = BASE_URL + 'store/'
  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(storeObj)
  }
  return await tryCatchFetch(url, init)
}

const updateStore = async (storeObj, id) => {
  const url = BASE_URL + `store/${id}/`
  const init = {
    method: "PUT",
    headers: {
      'Content_Type': 'application/json'
    },
    body: JSON.stringigy(storeObj)
  }
  return await tryCatchFetch(url, init)
}

const deleteStore = async (id) => {
  const url = BASE_URL + `store/${id}/`
  const init = {
    method: "DELETE",
    headers: {
      'Content_Type': 'application/json'
    }
  }
  return await tryCatchFetch(url, init)
}



const exportItems = {
  fetchStores,
  fetchStoreByID,
  addStore,
  updateStore,
  deleteStore
}

export default exportItems