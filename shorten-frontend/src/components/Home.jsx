// src/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import Popup from './Popup';

const Home = () => {
  const [dashBoard, setDashBoard] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData , setPopupData] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/shorten-link')
      .then(response => {
        setDashBoard(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []); // Empty dependency array ensures this runs once after the initial render

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/v1/delete/${id}`);
      setDashBoard(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/v1/shorten-link/${id}`);
      setPopupData(response.data)
      setShowPopup(true);
    } catch (err) {
      console.error(err);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const redirectionLinkIcon = {
    cursor: 'pointer',
    marginLeft: '3px'
  };

  return (
    <div>
      <NavBar />
      {showPopup && <Popup data={popupData} onClose={closePopup} />}
      <table className="table my-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Alias</th>
            <th scope="col">Name</th>
            <th scope="col">Created at</th>
            <th scope="col">Clicks</th>
            <th scope="col">Scans</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dashBoard.map((dashData, index) => (
            <tr key={dashData._id}>
              <th scope="row">{index + 1}</th>
              <td>
                <a href={dashData.ShortUrl}>{dashData.ShortUrl}</a>
                <a href={dashData.ShortUrl} target="_blank" style={redirectionLinkIcon} rel="noopener noreferrer">
                  <i className="fa fa-external-link icon" aria-hidden="true"></i>
                </a>
              </td>
              <td>{dashData.Username}</td>
              <td>{dashData.TimeStamp}</td>
              <td>{dashData.UrlClicks}</td>
              <td>{dashData.QrCodeClicks}</td>
              <td>
                <i onClick={() => handleUpdate(dashData._id)} className="fa fa-pencil icon" aria-hidden="true"></i>
                <i onClick={() => handleDelete(dashData._id)} className="fa fa-trash-o icon" aria-hidden="true"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
