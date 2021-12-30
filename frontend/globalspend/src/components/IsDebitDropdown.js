function IsDebitDropdown(props) {
  // populates dropdown menu 
  return (
    <select id="isDebit" >  
      return (     
          <option key='1' value={true}>Debit</option>
          <option key='2' value={false}>Deposit</option>
      )
    </select>
  )

}

export default IsDebitDropdown