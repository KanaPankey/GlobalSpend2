import { useEffect, useState } from "react"

import BackendAPI from '../api/BackendAPI'


function EnvelopeDropdown(props) {
  // states
  const [envelopeList, setEnvelopeList] = useState([])

  // effects
  useEffect(() => {
    const getEnvelopeList = async() => {
      const data = await BackendAPI.fetchEnvelopes()
      if (data) {
        setEnvelopeList(data)
      }
    }
  
    getEnvelopeList()
    }, [])
  
  // populates envelope option dropdown menu 
  return (
    <select id="envelope" >  
        {envelopeList.map((envelope, index) => {
        return (     
            props.defaultValue == envelope.id
            ? <option key={index} value={envelope.id} selected>{envelope.envelope_name}</option>
            : <option key={index} value={envelope.id}>{envelope.envelope_name}</option>

        )
        })}
    </select>
  )

}

export default EnvelopeDropdown