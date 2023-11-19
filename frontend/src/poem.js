
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './result.css';
import useSound from 'use-sound';

const audioStyle = {
  display: 'block',
  margin: '0 auto',
};

function ResultPoem() {
  const location = useLocation();
  const { sid,title,poem, imageSrc } = location.state;
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  console.log(location.state)
  const poemLines = poem.split('\n\n');
  console.log(poemLines);
  const soundSource = 'audio/'+sid+'.wav';
  // console.log(soundSource);
  
  const questionRequest = {
    "session_id":0,
    "story_id":parseInt(sid, 10),
    "question":null,
  }

  const askQuestion = (question) => {
    setQuestions([...questions, question]);
    questionRequest.question = question;
    console.log(questionRequest)

    fetch('http://127.0.0.1:8000/poem/question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(questionRequest),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch response from the server.');
        }
      })
      .then((data) => {
        setAnswers([...answers, data.response]);
      
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    
  };


  return (
    <div className="box-forms">
      <div className="left">
        <img src={imageSrc} alt="Image" />
      </div>
      <div className="right">

      <div>
      <h2 className='heads' style={{ color: 'white' }}>{title}</h2>

      <div>
      {poemLines.map((line, index) => (
      <p key={index} style={{ color: 'white', fontSize: '18px' }}>{line}</p>
      ))}
      </div>
    </div>  
    
          {/* <audio controls>
            <source src={soundSource} type="audio/wav" />
            Your browser does not support the audio element.
          </audio> */}

        <audio controls style={audioStyle}>
        <source src={soundSource} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>

        <div style={{ paddingTop: '25px', textAlign: 'center' }}>
        {/* <input
          type="text"
          placeholder="Ask a question..."
          style={{ width: '500px', height: '40px' }}
          onChange={(e) => setQuestions(e.target.value)}
          /> */}
          <input  
          type="text"
          placeholder="Ask a question..."
          style={{ width: '500px', height: '40px' }}
          onChange={(e) => setQuestions(e.target.value)}
          id="questions" /* Add this ID */
        />

        <button           
          onClick={() => askQuestion(questions)}
          style={{ width: '100px', height: '40px' }}
        >
          Ask
        </button>
        

      </div>
      <div style={{paddingTop:'15px'}}>
        {answers ? <p>{answers}</p> : null}
      </div>
      </div>
    </div>
  );
}

export default ResultPoem;
