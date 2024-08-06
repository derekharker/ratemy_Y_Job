import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RateJobSuccess from "./pages/RateJobSuccess";
import SearchJobs from "./pages/SearchJobs";
import RateJob from "./pages/RateJob";
import JobDetails from "./pages/JobDetails";
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchJobs />} />
      <Route path="/job/:jobId" element={<JobDetails />} />
      <Route path="/success" element={<RateJobSuccess />} />
      <Route path="/rate" element={<RateJob />} />
    </Routes>
  );
}
