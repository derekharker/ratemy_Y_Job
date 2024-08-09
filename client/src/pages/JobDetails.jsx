import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container } from '@mui/material';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from '@mui/material/Button';

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
        console.log(data);

        setJob(data.job || {});
        setReviews(data.reviews || []);
        setAverageRating(data.average_rating || 0);
        setAverageSupervisorRating(data.average_supervisor_rating || 0);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  return (
    <>
      <Navbar />
      <Container style={{backgroundColor:"#0D579C", borderRadius: "8px", paddingTop: "1px"}}>
      <Container>
      <h1 style={{fontFamily: 'Inter', color:"white"}}>{job.title}</h1>
      <h2 style={{fontFamily: 'Inter', color:"white"}}>{job.department}</h2>
      <h3 style={{fontFamily: 'Inter', color:"white" }}>Average Rating: {averageRating}</h3>
      <h3 style={{fontFamily: 'Inter' , color:"white"}}>Average Supervisor Rating: {averageSupervisorRating}</h3>
      </Container>
      <h2 >Reviews</h2>
      <ul style={{paddingInlineStart:"0px"}}>
        {reviews.map((review) => (
          <li key={review.id} style={{ listStyleType: 'none'}}>
            <Container
              style={{
                backgroundColor: "lightgray",
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "8px", // Rounded corners
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Small shadow
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '150px', // Ensure enough height for centering
              }}
            >
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ textAlign: 'left' }}>
                  <h3 style={{ color: "black", fontFamily:"Libre Baskerville"  }}>Overall Rating: {review.rating}</h3>
                  <h3 style={{ color: "black", fontFamily:"Libre Baskerville"  }}>Supervisor Rating: {review.supervisor_rating}</h3>
                  <h3 style={{ color: "black", fontFamily:"Libre Baskerville"  }}>Pay: ${review.pay}/hr</h3>
                </div>
                <div style={{ textAlign: 'center', margin: 'auto', }}>
                  <h4 style={{ color: "black", fontFamily:"Libre Baskerville"  }}>{review.comment}</h4>
                </div>
              </div>
            </Container>
          </li>
        ))}
      </ul>
      <Link to="/search"><Button 
      variant="contained"
      sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'darkgrey' }, fontFamily:"Libre Baskerville" }}
      >Back to Search Page</Button></Link>
      <p style={{paddingBottom:"0px"}}></p>
      <Footer />
      </Container>
    </>
  );
};

export default JobDetails;
