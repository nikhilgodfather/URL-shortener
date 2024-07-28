// src/Popup.js
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import '../App.css';

const Popup = ({ data, onClose }) => {
  const [QrCodeimg, setQrCodeimg] = useState('');

  useEffect(() => {
    const generateQrCode = async () => {
      try {
        if (data.ShortUrlScan) {
          const qrCodeSrc = await QRCode.toDataURL(data.ShortUrlScan);
          setQrCodeimg(qrCodeSrc);
        }
      } catch (error) {
        console.error('Error generating QR Code', error);
      }
    };

    generateQrCode();
  }, [data.ShortUrlScan]);

  return (
    <div className="modal popup-view" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog boarding-pass" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h3>{data.Username}</h3>
            <button type="button" className="close" onClick={onClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p><strong>Description:</strong> {data.description}</p>
            <p><strong>Tag:</strong> {data.Tag}</p>
            <p><strong>TimeStamp:</strong> {data.TimeStamp}</p>
            <p><strong>Original URL:</strong> <a href={data.OrignalUrl} target="_blank" rel="noopener noreferrer">{data.OrignalUrl}</a></p>
            <p><strong>Short URL:</strong> <a href={data.ShortUrl} target="_blank" rel="noopener noreferrer">{data.ShortUrl}</a></p>
            <p><strong>URL Clicks:</strong> {data.UrlClicks}</p>
            <p><strong>QR Code Clicks:</strong> {data.QrCodeClicks}</p>
            <div>
              <strong>QR Code:</strong>
              <img src={QrCodeimg} alt="QR Code" className="qr-code" />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
