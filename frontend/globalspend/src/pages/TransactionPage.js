import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

// CSS
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

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
      <Table striped bordered>
        <thead>
          <th></th>
          <th></th>
        </thead>
        <tbody>
          <tr>
            <td>Date</td>
            <td>{transaction.transaction_date}</td>
          </tr>
          <tr>
            <td>Store</td>
            <td>{displayStoreName(transaction.store)}</td>
          </tr>
          <tr>
            <td>Original transaction amt</td>
            <td>{transaction.original_transaction_amt}</td>
          </tr>
          <tr>
            <td>Home transaction amt</td>
            <td>{transaction.home_transaction_amt}</td>
          </tr>
          <tr>
            <td>Debit or deposit</td>
            <td>{transaction.is_debit_transaction ? 'Debit' : 'Deposit'}</td>
          </tr>
          <tr>
            <td>Notes</td>
            <td>{transaction.notes}</td>
          </tr>
          <tr>
            <td>Envelope</td>
            <td>{displayEnvelopeName(transaction.envelope)}</td>
          </tr>
        </tbody>
      </Table>
    )
  }

  // render
  return (
    <div className="container mt-4">
      <h1>Transaction Page</h1>
      <hr />
        { renderTransaction() }
      <div className='text-center'>
        <hr />
        <Link to={`/transaction/${params.transactionID}/edit`}><Button variant='success'>Edit Transaction</Button></Link>
        <Link to={`/transaction/${params.transactionID}/delete`}><Button className="mx-4" variant='success'>Delete Transaction</Button></Link>
      </div>
    </div>
  )
}

export default TransactionPage;