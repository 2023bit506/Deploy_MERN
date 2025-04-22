// import React, { useState } from "react";
// import axios from 'axios'
// import { useNavigate } from "react-router-dom";

// function CreateUser () {
//   const [name, setName] = useState()
//   const [email, setEmail] = useState()
//   const [age, setAge] = useState()
//   const navigate = useNavigate()

//   const Submit = (e) => {
//     e.preventDefault();
//     axios.post("http://localhost:3001/createUser", {name, email, age})
//     .then(result => {
//       console.log(result)
//       navigate('/')
    
//     })
//     .catch(err => console.log(err))
//   }

//     return (
//         <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
//   <div className='w-50 bg-white rounded p-3'>
//     <form onSubmit={Submit}>
//       <h2>Add User</h2>
      
//       <div className='mb-2'>
//         <label htmlFor=''>Name</label>
//         <input type='text' placeholder='Enter Name' className='form-control' 
//         onChange={(e) => setName(e.target.value)}/>
//       </div>
      
//       <div className='mb-2'>
//         <label htmlFor=''>Email</label>
//         <input type='email' placeholder='Enter Email' className='form-control' 
//         onChange={(e) => setEmail(e.target.value)}/>
//       </div>
      
//       <div className='mb-2'>
//         <label htmlFor=''>Age</label>
//         <input type='text' placeholder='Enter Age' className='form-control' 
//         onChange={(e) => setAge(e.target.value)}/>
//       </div>
      
//       <button className='btn btn-success'>Submit</button>
//     </form>
//   </div>
// </div>

//     )
// }

// export default CreateUser;



import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function CreateUser () {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/createUser", {
      name,
      email,
      age,
      city,
      date
    })
    .then(result => {
      console.log(result)
      navigate('/')
    })
    .catch(err => console.log(err))
  }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={Submit}>
          <h2>Add User</h2>
          
          <div className='mb-2'>
            <label>Name</label>
            <input type='text' placeholder='Enter Name' className='form-control' 
              onChange={(e) => setName(e.target.value)} required />
          </div>
          
          <div className='mb-2'>
            <label>Email</label>
            <input type='email' placeholder='Enter Email' className='form-control' 
              onChange={(e) => setEmail(e.target.value)} required />
          </div>
          
          <div className='mb-2'>
            <label>Age</label>
            <input type='text' placeholder='Enter Age' className='form-control' 
              onChange={(e) => setAge(e.target.value)} required />
          </div>

          <div className='mb-2'>
            <label>City</label>
            <input type='text' placeholder='Enter City' className='form-control' 
              onChange={(e) => setCity(e.target.value)} required />
          </div>

          <div className='mb-2'>
            <label>Date</label>
            <input type='date' className='form-control'
              onChange={(e) => setDate(e.target.value)} required />
          </div>
          
          <button className='btn btn-success'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default CreateUser;
