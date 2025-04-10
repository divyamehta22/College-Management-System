import LandingPage from "./components/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./components/Context/AuthContext";
import College from "./components/Pages/College"
import Department from "./components/Pages/Department"
import Staff from "./components/Pages/Staff"
import Student from "./components/Pages/Student"
import Parent from "./components/Pages/Parent"

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/college" element={<College />} />
        <Route path="/department" element={<Department />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/student" element={<Student />} />
        <Route path="/parent" element={<Parent />} />
      </Routes>
    </Router>
  </AuthProvider>
  );
}

export default App;