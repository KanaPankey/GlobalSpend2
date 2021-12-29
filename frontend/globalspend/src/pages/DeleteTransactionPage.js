import { useNavigate, useParams } from "react-router-dom"
import BackendAPI from "../api/BackendAPI"
import { useEffect, useState } from 'react'

function DeleteTransactionPage(props) {
  // routers
  const params = useParams()
  const navigate = useNavigate()

  // states
  const [transaction, setTransaction] = useState(null)


  // effects
  useEffect (() => {
    const getTransaction = async () => {
      const data = await BackendAPI.fetchTransactionByID(params.transactionID) 
      setTransaction(data)
    }

    getTransaction()
  }, [] )

  
  // handlers
  const deleteTransaction = async () => {
    const data = await BackendAPI.deleteTransaction(params.transactionID)
    navigate(`/transaction/`)
  }
  
  const doNotDelete = () => {
    navigate(`/transaction/${params.transactionID}`)
  }

  // render
  return (
    <div className="container">
      {transaction && <h1>Are you sure you want to delete {transaction.store}?</h1>}
      <button onClick={ deleteTransaction }>Yes</button>
      <button onClick={ doNotDelete }>No</button>
    </div>)

}

export default DeleteTransactionPage;