import logo from './logo.svg';
import './App.css';
import Home from './Home/Home';
import Login from './Login/Login';
import Register from './Register/Register';
import { Route,BrowserRouter,Routes } from 'react-router-dom';
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';
import Profile from './Profile/Profile';
import Navbar from './components/Navbar/Navbar';
import Groups from './components/Groups/Groups';

function App() {

  const queryClient = new QueryClient();

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/groups' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Register/>}/>
            <Route path='/profile' element={<Profile/>}/>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
