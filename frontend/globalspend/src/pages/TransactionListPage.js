import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Table } from 'react-bootstrap'

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
  // const renderTransactionList = () => {
  //   return transactionLists.map((transactionList, index) => {
  //     return (
  //       <div>
  //         <Link to={`/transaction/${transactionList.id}`}>
  //           <tr key={index}>
  //             <td>{transactionList.transaction_date}</td>
  //             <td>{transactionList.store}</td>
  //             <td>{transactionList.original_transaction_amt}</td>
  //           </tr>
  //         </Link>
  //       </div>
  //     )
  //   })
  // }



  const renderTransactionList = () => {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Store</th>
            <th>Local Amt</th>
          </tr>
        </thead>
        <tbody>
        {transactionLists.map((transactionList, index) => {
          return (     
            <tr key={index}>
              <td>{transactionList.id}</td>
              <td>{transactionList.transaction_date}</td>
              <td>{transactionList.store}</td>
              {console.log("transactionlist:", transactionList)}
              <td><Link to={`/transaction/${transactionList.id}`}>{transactionList.original_transaction_amt}</Link></td>
            </tr>         
          )
        })}
        </tbody>
      </Table>
    )
  }


  // render
  return (
    <div>
      <h1>Transaction List Page</h1>
      <div>{ renderTransactionList() }</div>
      <Link to={`/`}><button>Add Transaction</button></Link>
    </div>
  )
}

export default TransactionListPage;