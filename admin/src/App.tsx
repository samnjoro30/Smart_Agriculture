import './App.css';
import Login from './auth/login';
import Dashboard from './main/Dashboard';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ProtectedRoute from './utils/protectRoutes';

function App() {
  return (
   <Router>
    <Routes>
      
      <Route path="/" element={<Login />} />
      {/* <ProtectedRoute> */}
        <Route path="/dashboard" element={<Dashboard />} />
      {/* </ProtectedRoute> */}
    </Routes>
   </Router>
  )
  }

export default App
