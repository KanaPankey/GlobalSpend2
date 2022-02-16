// const BASE_URL = `http://localhost:8000/`
const BASE_URL = `https://global-spend.herokuapp.com/`


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

// calls for stores
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
  console.log(url)
  const init = {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(storeObj)
  }
  return await tryCatchFetch(url, init)
}

const deleteStore = async (id) => {
  const url = BASE_URL + `store/${id}/`
  const init = {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return await tryCatchFetch(url, init)
}

// calls for envelopes
const fetchEnvelopes = async () => {
  const url = BASE_URL + 'envelope/'
  return await tryCatchFetch(url)
}

const fetchEnvelopeByID = async (envelopeID) => {
  const url = BASE_URL + 'envelope/' + envelopeID
  return await tryCatchFetch(url)
}

const addEnvelope = async (envelopeObj) => {
  const url = BASE_URL + 'envelope/'
  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(envelopeObj)
  }
  return await tryCatchFetch(url, init)
}

const updateEnvelope = async (envelopeObj, id) => {
  const url = BASE_URL + `envelope/${id}/`
  console.log(url)
  const init = {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(envelopeObj)
  }
  return await tryCatchFetch(url, init)
}

const deleteEnvelope = async (id) => {
  const url = BASE_URL + `envelope/${id}/`
  const init = {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return await tryCatchFetch(url, init)
}


// calls for transactions
const fetchTransactions = async () => {
  const url = BASE_URL + 'transaction/'
  return await tryCatchFetch(url)
}

const fetchTransactionByID = async (transactionID) => {
  const url = BASE_URL + 'transaction/' + transactionID
  return await tryCatchFetch(url)
}

const addTransaction = async (transactionObj) => {
  const url = BASE_URL + 'transaction/'
  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(transactionObj)
  }
  return await tryCatchFetch(url, init)
}

const updateTransaction = async (transactionObj, id) => {
  const url = BASE_URL + `transaction/${id}/`
  console.log(url)
  const init = {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(transactionObj)
  }
  return await tryCatchFetch(url, init)
}

const deleteTransaction = async (id) => {
  const url = BASE_URL + `transaction/${id}/`
  const init = {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return await tryCatchFetch(url, init)
}



const exportItems = {
  fetchStores,
  fetchStoreByID,
  addStore,
  updateStore,
  deleteStore,
  fetchEnvelopes,
  fetchEnvelopeByID,
  addEnvelope,
  updateEnvelope,
  deleteEnvelope,
  fetchTransactions,
  fetchTransactionByID,
  addTransaction,
  updateTransaction,
  deleteTransaction
}

export default exportItems