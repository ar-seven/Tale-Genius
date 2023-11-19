  import React from 'react';
  import './landingpage.css';
  import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
  import { Link } from 'react-router-dom';
  import { useLocation } from 'react-router-dom';
  import { useState, useEffect } from 'react';
  const StoryPreview = ({ storyId }) => {
    const [storyTitle, setStoryTitle] = useState('');
    const [photoURL, setPhotoURL] = useState(`image/${storyId}.png`);
    const storyName = `Story ${storyId}`;
  
    useEffect(() => {
      fetch(`http://localhost:8000/story/title/${storyId}/`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Log the API response
          setStoryTitle(data.title);
        })
        .catch((error) => {
          console.error(error);
        });
    }, [storyId]);
    
  
    return (
      <td>
        <a href={`/story/${storyId}/`}>
          <img src={photoURL} alt={storyName} />
          <p>{storyTitle}</p>
        </a>
      </td>
    );
  };
  
  const LandingPage = () => {
    const storyIds = [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

    return (
      <div className='bgi'> 
      <h1 className='head' >Tale Genius</h1>
      <div class="heading">
      Unleash Your Imagination
      </div>
      <div class="table-container">
      <table>
        <tr>
          <td>
            <button type="button" class="text-button">
              <a href="/prompt">Build your story</a>
            </button>
          </td>
          <td>
            <button type="button" class="text-button">
              <a href="/poem">Build your Poem</a>
            </button>
          </td>
        </tr>
      </table>
    </div>

      <table>
  <tbody className='imgshow'>
    {[0, 1, 2, 3].map((rowIndex) => (
      <tr key={rowIndex}>
        {[0, 1, 2, 3].map((colIndex) => {
          const storyIndex = rowIndex * 4 + colIndex;
          const storyId = storyIds[storyIndex];

          return (
            <td key={storyId}>
              <StoryPreview storyId={storyId} />
              <a href={`localhost:8000/story/${storyId}/`}/>
            </td>
          );
        })}
      </tr>
    ))}
  </tbody>
</table>







      </div>
    );
  };

  export default LandingPage;
