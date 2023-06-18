import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import { Container } from "@mui/material";
import NavBar from "./components/NavBar/NavBar";
import PostDetails from "./components/PostDetails/PostDetails";
import UserProfile from "./components/UserProfile/UserProfile";

const App = () => {
  const user = JSON.parse(localStorage.getItem("userProfile"));
  return (
    <Router>
      <Container maxWidth="xl">
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/posts" />}
          />
          <Route path="/profile" element={<UserProfile />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
