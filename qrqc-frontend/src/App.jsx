import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirection automatique vers Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Page Login */}
        <Route path="/login" element={<Login />} />

        {/* Les prochaines pages seront ajoutées ici */}
        {/*
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/qrqc" element={<QrqcList />} />
        */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;