import { Dashboard } from "pages/Dashboard";
import { Navigate, Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
