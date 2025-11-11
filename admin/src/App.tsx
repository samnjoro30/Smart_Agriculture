import './App.css'
import Login from './auth/login'
import Header from './components/header';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
   <Router>
    <Routes>
      {/* <Route path="/" element={<Header />} /> */}
      <Route path="/" element={<Login />} />
    </Routes>
   </Router>
  )
  }

export default App
