import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import { Container } from "@mui/material";
import NavBar from "./components/NavBar/NavBar";

const App = () => {
  return (
    <Router>
      <Container maxWidth="lg">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
