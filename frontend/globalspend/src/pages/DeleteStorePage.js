import { useLocation, useNavigate, useParams } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import StoreAPI from "../api/StoreAPI"
import { useEffect, useState } from 'react'

function DeleteTaskPage(props) {
  // params
  const params = useParams()
  const navigate = useNavigate()

  const deleteTask = async () => {
    const data = await StoreAPI.deleteStore(params.storeID)
    if (data) {
      navigate(`/store/`)
    }
  }

  return (
    <div>
      Are you sure you want to delete {}
    </div>
  )
}