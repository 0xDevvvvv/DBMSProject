import './App.css';
import { Routes, Route } from 'react-router-dom';

import { PrivateDashboardRoute,PrivateRoute } from './router/privateRoutes';
import ForgotPassword from './components/forgotPassword';
import LoginForm from './components/login';
import Dashboard from './components/dashboard';


function App() {
  
  return(
      <Routes>
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/" element={<PrivateRoute/>} >
          <Route path="/" element={<PrivateDashboardRoute/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Route>

    </Routes>
  );
}
export default App;
