import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './login.js';
import Signup from './signup.js';
import Prompt from './promt.js'; 
import Promptpoem from './prompt_poem.js';
import Result from './result.js';
import ResultPoem from './poem.js';
import LandingPage from './landingpage.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<LandingPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/poem' element={<Promptpoem />} />
        <Route path='/poemprompt' element={<ResultPoem />} />
        <Route path='/prompt' element={<Prompt />} />
        <Route path='/result' element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;