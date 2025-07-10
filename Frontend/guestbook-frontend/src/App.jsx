import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Guestbook from './pages/Guestbook';
import NewEntry from './pages/NewEntry';
import RegisterUser from './pages/RegisterUser';
import Users from './pages/Users';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guestbook" element={<Guestbook />} />
          <Route path="/new" element={<NewEntry />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
