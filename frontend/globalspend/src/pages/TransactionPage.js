import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

// APIs
import BackendAPI from '../api/BackendAPI'

function TransactionPage(props) {
  // states
  const [transaction, setTransaction] = useState(null)

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

  const renderTransaction = () => {
    if (!transaction) {
      return null
    }

    return (
      <div>
        <h3>Date: {transaction.transaction_date}</h3>
        <h3>Store: {transaction.store}</h3>
        <h3>Original transaction amt: {transaction.original_transaction_amt}</h3>
        <h3>Home transaction amt: {transaction.home_transaction_amt}</h3>
        <h3>Debit or deposit: {transaction.is_debit_transaction ? 'Debit' : 'Deposit'}</h3>
        <h3>Notes: {transaction.notes}</h3>
        <h3>Envelope: {transaction.envelope}</h3>


      </div>
    )
  }

  return (
    <div>
      <h1>Transaction Page</h1>
      { renderTransaction() }
      <Link to={`/transaction/${params.transactionID}/edit`}><button>Edit Transaction</button></Link>
      <Link to={`/transaction/${params.transactionID}/delete`}><button>Delete Transaction</button></Link>
    </div>
  )
}

export default TransactionPage;