import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import CreateForm from './components/CreateForm';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/create-shotener' element={<CreateForm/>}/>
        </Routes>
    </div>
    </Router>
    
  );
}

export default App;
