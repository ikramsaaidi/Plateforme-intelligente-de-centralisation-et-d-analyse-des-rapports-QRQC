import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Page de connexion */}
        <Route path="/login" element={<Login />} />

        {/* Layout principal */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;