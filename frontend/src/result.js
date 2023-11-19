  import React, { useState } from 'react';
  import { useLocation } from 'react-router-dom';
  import './result.css';
  import useSound from 'use-sound';

  const audioStyle = {
    display: 'block',
    margin: '0 auto',
  };

  function Result() {
    const location = useLocation();
    const { sid,title, imageSrc, story } = location.state;
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const storyLines = story.split('\n\n');
    const soundSource = 'audio/'+sid+'.wav';
    
    const questionRequest = {
      "session_id":0,
      "story_id":parseInt(sid, 10),
      "question":null,
    }

    const askQuestion = (question) => {
      setQuestions([...questions, question]);
      questionRequest.question = question;
      console.log(questions)
      console.log(answers)

      fetch('http://127.0.0.1:8000/story/question/', {
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
        <h2 className='heads' style={{ color: 'white', fontWeight: 'bold' }}>{title}</h2>

        <div>
        {storyLines.map((line, index) => (
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
            style={{ width: '100px', height: '40px',borderRadius: '10px', marginLeft: '5px' }}
          >
            Ask
          </button>
          

        </div>
        {/* <div className="answer">
           <p>{answers}</p>
        </div> */}

      <div className='answer'>
        {questions.map((question, index) => (
          <div key={index} className="questions">
            <strong>Question:</strong> {question}
          </div>
        ))}
        {answers.map((answer, index) => (
          <div key={index} className="answers">
            <strong>Answer:</strong> {answer}
          </div>
        ))}
    </div>
        </div>
      </div>
    );
  }

  export default Result;
