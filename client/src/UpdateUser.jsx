import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function UpdateUser () {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);  // Loading state
  const [error, setError] = useState(""); // Error state
  const navigate = useNavigate();

  // Fetch user details on component mount
  useEffect(() => {
    axios.get('http://localhost:3001/getUser/' + id)
      .then(result => {
        setName(result.data.name);
        setEmail(result.data.email);
        setAge(result.data.age);
        setCity(result.data.city);
        setDate(result.data.date);
      })
      .catch(err => setError("Error fetching user data."));
  }, [id]);

  // Handle update submission
  const Update = (e) => {
    e.preventDefault();

    // Validation: Ensure all fields are filled
    if (!name || !email || !age || !city || !date) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);  // Start loading
    axios.put("https://deploy-mern-api1.vercel.app/updateUser/" + id, {
      name, email, age, city, date
    })
      .then(result => {
        console.log(result);
        navigate('/'); // Redirect on success
      })
      .catch(err => {
        console.log(err);
        setError("Error updating user data. Please try again.");
      })
      .finally(() => setLoading(false));  // Stop loading
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={Update}>
          <h2>Update User</h2>

          {error && <div className="alert alert-danger">{error}</div>} {/* Display error */}

          <div className='mb-2'>
            <label>Name</label>
            <input 
              type='text' 
              placeholder='Enter Name' 
              className='form-control' 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>

          <div className='mb-2'>
            <label>Email</label>
            <input 
              type='email' 
              placeholder='Enter Email' 
              className='form-control' 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <div className='mb-2'>
            <label>Age</label>
            <input 
              type='number' 
              placeholder='Enter Age' 
              className='form-control' 
              value={age} 
              onChange={(e) => setAge(e.target.value)} 
            />
          </div>

          <div className='mb-2'>
            <label>City</label>
            <input 
              type='text' 
              placeholder='Enter City' 
              className='form-control' 
              value={city} 
              onChange={(e) => setCity(e.target.value)} 
            />
          </div>

          <div className='mb-2'>
            <label>Date</label>
            <input 
              type='date' 
              className='form-control' 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
            />
          </div>

          <button className='btn btn-success' disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
