import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

// APIs
import BackendAPI from '../api/BackendAPI'

// table
import {Table} from 'react-bootstrap'

// components
import EnvelopeBar from '../components/EnvelopeBar'

//css
import Button from 'react-bootstrap/Button'

function EnvelopePage(props) {
  // states
  const [storeList, setStoreList] = useState([])
  const [transactionListsByEnvelope, setTransactionListsByEnvelope] = useState([])

  const params = useParams()

  //effects
  useEffect(() => {
    // get the transactions by envelope
    const getTransactionLists = async () => {
      const data = await BackendAPI.fetchTransactions()
      if (data) {
        const transactionsByEnvelope = []
        for (let i=0; i < data.length; i++) {
          // console.log("here", data[i].envelope, params.envelopeID)
          if (data[i].envelope == params.envelopeID) {
            transactionsByEnvelope.push(data[i])
          }
        }
        setTransactionListsByEnvelope(transactionsByEnvelope)
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
        {transactionListsByEnvelope.map((transactionList, index) => {
          return (
            
              <tr key={index}>
                <td>{transactionList.id}</td>
                <td>{transactionList.transaction_date}</td>
                <td>{displayStoreName(transactionList.store)}</td>
                <td><Link to={`/transaction/${transactionList.id}`}>{transactionList.original_transaction_amt}</Link></td>
              </tr>
            
          )
        })}
        </tbody>
      </Table>
    )
  }

  return (
    <div className="container mt-4">
      <EnvelopeBar />
      { renderTransactionList() }
      <Link to={`/envelope/${params.envelopeID}/edit`}><button>Edit Envelope</button></Link>
      <Link to={`/envelope/${params.envelopeID}/delete`}><button>Delete Envelope</button></Link>
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

export default EnvelopePage;