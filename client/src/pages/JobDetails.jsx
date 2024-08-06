import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState({});
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [averageSupervisorRating, setAverageSupervisorRating] = useState(null);

  useEffect(() => {
    // Fetch job details and reviews
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/job/${jobId}`);
        const data = await response.json();
        console.log(data)

        setJob(data.job);
        setReviews(data.reviews);
        setAverageRating(data.average_rating);
        setAverageSupervisorRating(data.average_supervisor_rating);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  return (
    <div>
      <h1>Job Title: {job.title}</h1>
      <h2>Department: {job.department}</h2>
      <h3>Average Rating: {averageRating}</h3>
      <h3>Average Supervisor Rating: {averageSupervisorRating}</h3>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <strong>Overall Rating:</strong> {review.rating}
            <br />
            <strong>Supervisor Rating:</strong> {review.supervisor_rating}
            <br />
            <strong>Pay:</strong> ${review.pay}
            <br />
            <strong>Comment:</strong> {review.comment}
          </li>
        ))}
      </ul>
      <Link to="/search">Back to Search</Link>
    </div>
  );
};

export default JobDetails;
