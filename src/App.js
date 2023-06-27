import './App.css';
import HomePage from './Components/HomePage/HomePage';
import LandingPage from './Components/LandingPage/LandingPage';
import NavBar from './Components/NavBar/NavBar'
import Detail from './Components/Detail/Detail';
import Form from './Components/Form/Form';
import Footer from './Components/Footer/Footer';

import {Route,Routes, useLocation} from "react-router-dom";


function App() {
  const { pathname } = useLocation();
  return (
    <div className="App">
      
      {pathname !== "/" && <NavBar  />}{" "}
      <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/form' element={<Form/>}/>
          <Route path='/detail/:id' element={<Detail/>}/>
          
          
      </Routes>
      {pathname !== "/" && <Footer  />}{" "}
    </div>
  );
}

export default App;
