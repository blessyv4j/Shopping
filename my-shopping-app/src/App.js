import { Routes, Route } from "react-router-dom"
import Login from "./Components/Login/login";
import Products from "./Components/Products/products";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/products" element={ <Products /> } />
      </Routes>
    </>
  );
}

export default App;