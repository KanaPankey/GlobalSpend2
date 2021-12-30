import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Table, Button } from 'react-bootstrap'

// APIs
import BackendAPI from '../api/BackendAPI'

function TransactionListPage(props) {
  // states
  const [transactionLists, setTransactionLists] = useState([])
  const [storeList, setStoreList] = useState([])

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

  useEffect(() => {
    const getStoreLists = async() => {
      const data = await BackendAPI.fetchStores()
      if (data) {
        setStoreList(data)
      }
    }

    getStoreLists()
  }, [])

  // store id to name
  const displayStoreName = (storeID) => {
    for (let i = 0; i < storeList.length; i++) {
      if (storeList[i].id == storeID) {
        return storeList[i].store_name
      }
    }
  }

  // render helpers
  const renderTransactionList = () => {
    return (
      <Table striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Store</th>
            <th>Local Amt</th>
            <th>Home Amt</th>
          </tr>
        </thead>
        <tbody>
        {transactionLists.map((transactionList, index) => {
          return (     
            <tr key={index}>
              <td>{transactionList.id}</td>
              <td>{transactionList.transaction_date}</td>
              <td>{displayStoreName(transactionList.store)}</td>
              <td><Link to={`/transaction/${transactionList.id}`} style={{color:'black'}}>{transactionList.original_transaction_amt} NOK</Link></td>
              <td>$ {transactionList.home_transaction_amt}</td>
            </tr>         
          )
        })}
        </tbody>
      </Table>
    )
  }

  // render
  return (
    <div className="container mt-4">
      <h1>Transaction List</h1>
      <div>{ renderTransactionList() }</div>
      <div className="text-center">
        <Link to={`/`}>
          <Button variant="success" type="submit">
            Add Transaction
          </Button>  
        </Link>
      </div>
    </div>
  )
}

export default TransactionListPage;