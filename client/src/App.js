import logo from './logo.svg';
import './App.css';
import Home from './Home/Home';
import Login from './Login/Login';
import Register from './Register/Register';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Profile from './Profile/Profile';
import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';

function App() {
  const [activePage, setActivePage] = useState('home');
  return (
    <div className="App">
      <Navbar setActivePage={setActivePage}/>
      <div className='content'>
        {activePage === 'home' && <Home/>}
        {activePage === 'profile' && <Profile/>}
      </div>
    </div>
  );
}

export default App;
