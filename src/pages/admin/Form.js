import { useState, useEffect } from 'react'

const Form = ({ addMember, list }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [code, setCode] = useState('');

    useEffect(() => {
      if (list.length === 0) {
        setCode('CRL1')
      } else {
        let lastUser = list[list.length - 1]['code']
        let lastCode = +lastUser.substring(lastUser.indexOf('L') + 1)
        setCode(`CRL${lastCode + 1}`)
      }
      return () => {
      };
    }, [list]);
  
    const handleSubmit = (e) => {
      e.preventDefault()
      if (name && phone) {
        const member = {code, name, phone, password: phone};
        addMember(member);
        setName('')
        setPhone('')
      } else {
        alert('Please fill')
      }
    }
  
    return (
      <form className="col-lg-6 col-md-6 col-sm-12">
      <div className="mt-4">
        <input
          id="id"
          autoComplete="false"
          value={code}
          disabled={true}
        />
      </div>
      <div className="mt-4">
        <input
          id="name"
          autoComplete="false"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
      </div>
      <div className="mt-4">
        <input
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          type="phone"
        />
      </div>
  
      <div className="mt-4">
        <input type="submit" onClick={handleSubmit} value="Add" />
      </div>
    </form>
    )
  }

export default Form;  