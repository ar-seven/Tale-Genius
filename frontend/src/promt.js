import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Prompt.css'

function Prompt() {
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    try {
      document.getElementById('modal').style.display = 'block';
      
      const response = await fetch('http://localhost:8000/story/generate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "prompt": searchText }),
      });

      if (response.ok) {
        const data = await response.json();

        const story = data.story;
        const imageSrc = `data:image/png;base64, ${data.image}`;
        const title = data.title;
        const sid = data.sid;

        console.log(sid);

        // console.log('Story:', story);
        // console.log('Image:', imageSrc);
        // console.log('Title:', title);

        history('/result',{state:{sid,title, imageSrc, story}});

      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.error);
        setError(errorData.error);
        setLoading(false);
        document.getElementById('modal').style.display = 'none';

      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while processing the request.');
      setLoading(false);
      document.getElementById('modal').style.display = 'none';
    }
  };

  return (
    <div className='body'>
    <div id="app" className={loading ? 'blur' : ''}>
    <div className="main-search-input-wrap">
      <div className="main-search-input fl-wrap">
        <div className="main-search-input-item">
          <input
            type="text"
            placeholder="Enter your idea"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <button className="main-search-button" onClick={handleSearch}>
          Generate
        </button>
      </div>
    </div>
    </div>

    <div id="modal" className="modal" style={{ display: loading ? 'block' : 'none' }}>
        <img
          className="loading-gif"
          src="https://i.gifer.com/7kvp.gif"
        />
      </div>
    </div>
    
  );
}

export default Prompt;
