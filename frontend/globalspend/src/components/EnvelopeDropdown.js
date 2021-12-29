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
            <option key={index} value={envelope.id}>{envelope.envelope_name}</option>
        )
        })}
    </select>
  )

}

export default EnvelopeDropdown