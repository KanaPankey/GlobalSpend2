import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

// APIs
import BackendAPI from '../api/BackendAPI'

function TransactionPage(props) {
  // states
  const [transaction, setTransaction] = useState(null)
  const [storeList, setStoreList] = useState([])
  const [envelopeList, setEnvelopeList] = useState([])

  const params = useParams()

  //effects
  useEffect(() => {
    const getTransaction = async () => {
      const data = await BackendAPI.fetchTransactionByID(params.transactionID)
      if (data) {
        setTransaction(data)
      }
    }

    getTransaction()
  }, [])

  useEffect(() => {
    const getStoreLists = async() => {
      const data = await BackendAPI.fetchStores()
      if (data) {
        setStoreList(data)
      }
    }
  
    getStoreLists()
  }, [])

  useEffect(() => {
    const getEnvelopeList = async() => {
      const data = await BackendAPI.fetchEnvelopes()
      if (data) {
        setEnvelopeList(data)
      }
    }
  
    getEnvelopeList()
  }, [])
  
  // envelope id to name
  const displayEnvelopeName = (envelopeID) => {
    for (let i = 0; i < envelopeList.length; i++) {
      if (envelopeList[i].id == envelopeID) {
        return envelopeList[i].envelope_name
      }
    }
  }
  
  // store id to name
  const displayStoreName = (storeID) => {
    for (let i = 0; i < storeList.length; i++) {
      if (storeList[i].id == storeID) {
        return storeList[i].store_name
      }
    }
  }

  // render helper
  const renderTransaction = () => {
    if (!transaction) {
      return null
    }

    return (
      <div>
        <h3>Date: {transaction.transaction_date}</h3>
        <h3>Store: {displayStoreName(transaction.store)}</h3>
        <h3>Original transaction amt: {transaction.original_transaction_amt}</h3>
        <h3>Home transaction amt: {transaction.home_transaction_amt}</h3>
        <h3>Debit or deposit: {transaction.is_debit_transaction ? 'Debit' : 'Deposit'}</h3>
        <h3>Notes: {transaction.notes}</h3>
        <h3>Envelope: {displayEnvelopeName(transaction.envelope)}</h3>
      </div>
    )
  }

  // render
  return (
    <div className="container mt-4">
      <h1>Transaction Page</h1>
      { renderTransaction() }
      <Link to={`/transaction/${params.transactionID}/edit`}><button>Edit Transaction</button></Link>
      <Link to={`/transaction/${params.transactionID}/delete`}><button>Delete Transaction</button></Link>
    </div>
  )
}

export default TransactionPage;