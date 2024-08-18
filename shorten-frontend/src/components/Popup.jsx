import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import '../App.css';
import axios from 'axios';

const Popup = ({ data, onClose }) => {
  const [QrCodeimg, setQrCodeimg] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({ ...data });
  const [alert , setAlert] = useState(null)
  const [editButton , setEditButton] = useState(true)
  useEffect(() => {
    const generateQrCode = async () => {
      try {
        if (editableData.shortid) {  // Check for shortid instead of ShortUrlScan
          const qrCodeSrc = await QRCode.toDataURL(`http://localhost:3001/scan/${editableData.shortid}`);
          setQrCodeimg(qrCodeSrc);
        }
      } catch (error) {
        console.error('Error generating QR Code', error);
      }
    };
  
    generateQrCode();
  }, [editableData.shortid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleEditClick = async () => {
    setEditButton(false)
    setIsEditing(!isEditing);
  };
  const dismissAlert = () => {
    setAlert(null);
  };
  const handleSaveClick = async () => {
    await axios.put('http://localhost:3001/api/v1/update/shorten-link', editableData)
    .then(res => {
      if(res.data.alert==='success'){
    setIsEditing(false)
      }
    setAlert(res.data)
    })
    .catch((error,res)=>{
      console.log(error)
      setAlert(res.data)
    })
    .finally(()=>{
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    })
  };

  return (
    <div className="modal popup-view" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog boarding-pass" role="document">
        <div className="modal-content">
          <div className="modal-header">
                 
            <h3>{isEditing ? <input type="text" name="Username" value={editableData.Username} onChange={handleInputChange} /> : editableData.Username}</h3>
            

            {editButton && <> <button type="button" className="btn btn-secondary" onClick={handleEditClick}><i className="fa fa-pencil icon" aria-hidden="true"></i>Edit </button></>}


            <button type="button" className="close" onClick={onClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
          {alert && (
               <div className={`alert alert-${alert.alert} alert-dismissible fade show`}        role="alert">
                 {alert.message}
                 <div className="progress-bar" style={{animation: 'progress 3s linear'}}></       div>
                 <button type="button" className="btn-close" aria-label="Close" onClick={dismissAlert}></button>
               </div>
             )}
            <p><strong>Description:</strong> {isEditing ? <input type="text" name="description" value={editableData.description} onChange={handleInputChange} /> : editableData.description}</p>
            <p><strong>Tag:</strong> {isEditing ? <input type="text" name="Tag" value={editableData.Tag} onChange={handleInputChange} /> : editableData.Tag}</p>
            <p><strong>TimeStamp:</strong> {isEditing ? <input type="text" name="TimeStamp" value={editableData.TimeStamp} onChange={handleInputChange} /> : editableData.TimeStamp}</p>
            <p><strong>Original URL:</strong> {isEditing ? <input type="text" name="OrignalUrl" value={editableData.OrignalUrl} onChange={handleInputChange} /> : <a href={editableData.OrignalUrl} target="_blank" rel="noopener noreferrer">{editableData.OrignalUrl}</a>}</p>
            <p><strong>Short URL:</strong> {isEditing ? <input type="text" name="shortid" value={editableData.shortid} onChange={handleInputChange} /> : <a href={'http://localhost:3001/'+editableData.shortid} target="_blank" rel="noopener noreferrer">http://localhost:3001/{editableData.shortid}</a>}</p>
            <p><strong>URL Clicks:</strong> {editableData.UrlClicks}</p>
            <p><strong>QR Code Clicks:</strong>{editableData.QrCodeClicks}</p>
            <div>
              <strong>QR Code:</strong>
              <img src={QrCodeimg} alt="QR Code" className="qr-code" />
            </div>
          </div>
          <div className="modal-footer">
            {isEditing && <button type="button" className="btn btn-primary" onClick={handleSaveClick}>Save</button>}
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
