import React, { useState, useEffect } from 'react';

function BackendData() {
  const [data, setData] = useState({ title: '', image: '', text: '' });

  useEffect(() => {
    // Simulate fetching data from the backend
    // Replace this with an actual API call to fetch your data
    fetch('your_backend_api_endpoint')
      .then((response) => response.json())
      .then((backendData) => {
        setData({
          title: backendData.title,
          image: backendData.image, // Make sure 'image' is a base64 encoded string
          text: backendData.text,
        });
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="backend-data">
      <h1>{data.title}</h1>
      <img src={`data:image/png;base64, ${data.image}`} alt="Base64 Image" />
      <p>{data.text}</p>
    </div>
  );
}

export default BackendData;
