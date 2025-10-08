import { Dashboard } from "pages/Dashboard";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
