import Navbar from './components/Navbar';
import './index.css';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom'
import Home from './pages/home';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' 
            element={<Home />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
