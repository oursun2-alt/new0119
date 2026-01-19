import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Board from "./pages/Board";
import Friends from "./pages/Friends";
import Meals from "./pages/Meals";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/board" element={<Board />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/meals" element={<Meals />} />
          </Routes>
        </main>
        <footer>
          © 2026 4학년 1반 홈페이지 - 우리들의 소중한 공간
        </footer>
      </AuthProvider>
    </Router>
  );
}

export default App;
