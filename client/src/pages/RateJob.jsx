import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

const RateMyJobReview = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [rating, setRating] = useState(1);
  const [supervisorRating, setSupervisorRating] = useState(1);
  const [comment, setComment] = useState("");
  const [pay, setPay] = useState("");
  const [jobs, setJobs] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    // Fetch jobs and departments from an API or other data source
    axios
      .get("/api/jobs")
      .then((response) => setJobs(response.data))
      .catch((error) => console.error("Error fetching jobs:", error));

    axios
      .get("/api/departments")
      .then((response) => setDepartments(response.data))
      .catch((error) => console.error("Error fetching departments:", error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const reviewData = {
      jobTitle,
      department,
      rating,
      supervisorRating,
      comment,
      pay,
    };
    // Send review data to the server
    axios
      .post("/review", reviewData)
      .then((response) => console.log("Review submitted:", response))
      .catch((error) => console.error("Error submitting review:", error));
  };

  return (
    <div>
      <a href="/">
        <svg width="350" height="350">
          <image
            xlinkHref="/static/Blue Logo V2.svg"
            width="350"
            height="350"
          />
        </svg>
      </a>
      <h1>Rate My Job Review</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="job_title">Job Title:</label>
        <Select
          className="js-example-basic-single"
          id="job_title"
          options={jobs.map((job) => ({ value: job, label: job }))}
          onChange={(selectedOption) => setJobTitle(selectedOption.value)}
          placeholder="Select or type..."
          isSearchable
          isClearable
        />

        <label htmlFor="department">Department:</label>
        <Select
          className="js-example-basic-single"
          id="department"
          options={departments.map((department) => ({
            value: department,
            label: department,
          }))}
          onChange={(selectedOption) => setDepartment(selectedOption.value)}
          placeholder="Select or type..."
          isSearchable
          isClearable
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          name="rating"
          id="rating"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />

        <label htmlFor="supervisor_rating">Supervisor Rating:</label>
        <input
          type="number"
          name="supervisor_rating"
          id="supervisor_rating"
          min="1"
          max="5"
          value={supervisorRating}
          onChange={(e) => setSupervisorRating(e.target.value)}
          required
        />

        <label htmlFor="comment">Comment:</label>
        <textarea
          name="comment"
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />

        <label htmlFor="pay">Pay:</label>
        <input
          type="number"
          name="pay"
          id="pay"
          step="0.01"
          value={pay}
          onChange={(e) => setPay(e.target.value)}
          required
        />

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default RateMyJobReview;
