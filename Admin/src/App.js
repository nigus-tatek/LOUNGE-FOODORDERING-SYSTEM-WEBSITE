import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Admin from "./pages/page-js/Admin";
import AddFoods from "./pages/page-js/AddFoods";
import AdminSidebar from "./components/component-Js/AdminSidebar";
import FoodOrders from "./pages/page-js/FoodOrders";
import List from "./pages/page-js/List";
import Customers from "./pages/page-js/Customers";
import Message from "./pages/page-js/Messages";

function App() {
  return (
    <Router className="router">
      <div className="App">
        <Routes>
          <Route path="/" element={<Admin />} />
          <Route path="/AdminSidebar" element={<AdminSidebar />} />
          <Route path="/AddFoods" element={<AddFoods />} />
          <Route path="/Orders" element={<FoodOrders />} />
          <Route path="/List" element={<List />} />
          <Route path="/Customer" element={<Customers />} />
          <Route path="/Message" element={<Message />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
