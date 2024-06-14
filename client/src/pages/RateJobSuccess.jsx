import { Link } from "react-router-dom";
const ReviewSuccess = () => {
  return (
    <div>
      <h1>Thanks for your rating!</h1>
      <p>Your rating has been submitted successfully.</p>
      <Link to="/" className="btn">
        Back to Home
      </Link>
    </div>
  );
};

export default ReviewSuccess;
