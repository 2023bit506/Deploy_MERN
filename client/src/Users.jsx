import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Users() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");  // Error state for feedback
    const [loading, setLoading] = useState(true);  // Loading state for user feedback

    // Fetch users from the backend
    useEffect(() => {
        axios.get('http://localhost:3001/')  // Ensure you're using the right URL
            .then(result => {
                setUsers(result.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setError("Error fetching users.");
                setLoading(false);
            });
    }, []);

    // Handle delete action with confirmation
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            axios.delete(`http://localhost:3001/deleteUser/${id}`)  // Make sure this URL is correct
                .then(res => {
                    console.log(res);
                    setUsers(users.filter(user => user._id !== id));  // Remove the deleted user from the state
                })
                .catch(err => {
                    console.log(err);
                    setError("Error deleting the user.");
                });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className='w-75 bg-white rounded p-3'>
                <Link to="/create" className='btn btn-success mb-3'>Add +</Link>
                
                {error && <div className="alert alert-danger">{error}</div>} {/* Error message */}

                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>City</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.age}</td>
                                        <td>{user.city}</td>
                                        <td>{new Date(user.date).toLocaleDateString()}</td>
                                        <td>
                                            <Link to={`/update/${user._id}`} className='btn btn-success me-2'>Update</Link>
                                            <button className='btn btn-danger' onClick={() => handleDelete(user._id)}>Delete</button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;
