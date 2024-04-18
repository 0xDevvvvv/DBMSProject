import './App.css';
import { Routes, Route } from 'react-router-dom';

import LoginForm from './components/login';
import Dashboard from './components/dashboard';


function App() {
  
  return(
      <Routes>
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/" element={<LoginForm/>} />
        <Route path="/dasboard" element={<Dashboard/>} />
    </Routes>
  );
}
export default App;
