import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./Pages/page-js/About";
import Menu from   "./Pages/page-js/Menu";
import Contact from "./Pages/page-js/Contact";
import UserRegister from "./Pages/page-js/UserRegister";
import HomePage from "./Pages/page-js/HomePage";
import Footer from "./components/components-js/Footer";
import Login from "./Pages/page-js/Login";
import Cart from "./Pages/page-js/Cart"
import FakeMenu from "./Pages/page-js/FakeMenu";
import PrivacyPolicy from "./Pages/page-js/PrivacyPolicy";

function App() {
  return (
    <Router className="router">
      
      
      <div >
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/Menu" element={<FakeMenu/>} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/UserRegister" element={<UserRegister />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/MenuAndOrder" element={<Menu/>} />
          <Route path="/PrivacyPolicy" element={ <PrivacyPolicy/>} />
        </Routes>
     
      </div>
      <Footer/>
      </Router>
    
  );
}

export default App;
