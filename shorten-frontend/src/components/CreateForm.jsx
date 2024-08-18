import React, { useState, useEffect, useCallback } from 'react';
import NavBar from './NavBar';
import axios from 'axios';

export default function CreateForm() {
  // Single state object for all form data
  const [formData, setFormData] = useState({
    username: '',
    description: '',
    shortID: '',
    vanityURL: '',
    tag: ''
  });

  const [alert, setAlert] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(true);

  // Validate form data
  const validateForm = useCallback(() => {
    const { username, description, vanityURL, shortID ,  tag } = formData;
    return username.trim() !== '' && 
           description.trim() !== '' && 
           vanityURL.trim() !== '' && 
           shortID.trim() !== '' && 
           tag !== '';
  }, [formData]);

  // Update `isSubmitting` based on form validation
  useEffect(() => {
    setIsSubmitting(!validateForm());
  }, [validateForm]); // Add `validateForm` to the dependency array

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add timestamp to form data
    const currentDate = new Date();
    const date = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    const dataWithDate = { ...formData, date };

    // Send form data to server
    try {
      setIsSubmitting(true); // Disable button during submission
      const response = await axios.post('http://localhost:3001/api/v1/shorten-link', dataWithDate);

      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }

      const result = response.data;
      console.log('Success:', result);
      setAlert({ alert: result.alert, message: result.message });
      if(result.alert==='success'){
       // Clear the form data
      setFormData({
        username: '',
        description: '',
        vanityURL: '',
        shortID :'',
        tag: ''
      });
      }
      
    } catch (error) {
      console.error('Error:', error);
      setAlert({ alert: "danger", message: 'Error occurred during submission' });
    } finally {
      setIsSubmitting(false);

      // Hide alert after 3 seconds
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    }
  };

  const dismissAlert = () => {
    setAlert(null);
  };

  return (
    <div>
      <NavBar />
      <div className="container my-4">
      {alert && (
        <div className={`alert alert-${alert.alert} alert-dismissible fade show`} role="alert">
          {alert.message}
          <div className="progress-bar" style={{animation: 'progress 3s linear'}}></div>
          <button type="button" className="btn-close" aria-label="Close" onClick={dismissAlert}></button>
        </div>
      )}
        <h3>Create Your Link with ShorTener!</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">@</span>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="input-group mb-3">
            <textarea
              name="description"
              className="form-control"
              placeholder="Description"
              aria-label="Description"
              aria-describedby="basic-addon2"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="basic-url" className="form-label">Your Short URL</label>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon3">http://localhost:3001/</span>
              <input
                type="text"
                name="shortID"
                className="form-control"
                id="Short-url"
                aria-describedby="basic-addon3 basic-addon4"
                value={formData.shortID}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="basic-url" className="form-label">Your vanity URL</label>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon3">url</span>
              <input
                type="url"
                name="vanityURL"
                className="form-control"
                id="basic-url"
                aria-describedby="basic-addon3 basic-addon4"
                value={formData.vanityURL}
                onChange={handleChange}
              />
            </div>
          </div>

          <select
            name="tag"
            className="form-select"
            aria-label="Default select example"
            value={formData.tag}
            onChange={handleChange}
          >
            <option value="">Tags</option>
            <option value="LLC">LLC</option>
            <option value="Tech">Tech</option>
            <option value="Test">Test</option>
            <option value="Finance">Finance</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Marketing">Marketing</option>
            <option value="Design">Design</option>
            <option value="Product">Product</option>
          </select>

          <button type="submit" className="btn btn-primary my-3" disabled={isSubmitting}>Submit</button>
        </form>
      </div>
    </div>
  );
}
