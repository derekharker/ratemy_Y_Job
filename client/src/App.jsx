import { Route, Routes } from "react-router-dom";
import Home from "./pages/DefaultHome";
import SearchJobs from "./pages/SearchJobs";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchJobs />} />
    </Routes>
  );
}
