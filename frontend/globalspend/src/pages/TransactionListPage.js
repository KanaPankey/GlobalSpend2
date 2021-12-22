import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

// APIs
import BackendAPI from '../api/BackendAPI'

function TransactionListPage(props) {
  // states
  const [transactionLists, setTransactionLists] = useState([])

  const params = useParams()

  //effects
  useEffect(() => {
    const getTransactionLists = async () => {
      const data = await BackendAPI.fetchTransactions()
      if (data) {
        setTransactionLists(data)
      }
    }

    getTransactionLists()
  }, [])


  // render helpers
  const renderTransactionList = () => {
    return transactionLists.map((transactionList, index) => {
      return (
        <div>
          <Link to={`/transaction/${transactionList.id}`}>
            <tr key={index}>
              <td>{transactionList.transaction_date}</td>
              <td>{transactionList.store}</td>
              <td>{transactionList.original_transaction_amt}</td>
            </tr>
          </Link>
        </div>
      )
    })
  }

  return (
    <div>
      <h1>Transaction List Page</h1>
      <div>{ renderTransactionList() }</div>
      <Link to={`/`}><button>Add Transaction</button></Link>
    </div>
  )
}

export default TransactionListPage;