/* eslint-disable react/prop-types */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

// function createData(job, rating, totalRatings, department, details) {
//   return {job, rating, totalRatings, department, details};
// }

// const rows = [
//   createData('Office Suplier', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
// ];

export default function JobsTable({ jobList }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Job</TableCell>
            <TableCell align="right"> Avg Rating</TableCell>
            <TableCell align="right">Total Ratings</TableCell>
            <TableCell align="right">Department</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobList.map((job) => (
            <TableRow
              key={job.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row"><Link to={`/job/${job.id}`}>{job.title}</Link>
              
              </TableCell>
              <TableCell align="right">{job.average_rating}</TableCell>
              <TableCell align="right">{job.total_ratings}</TableCell>
              <TableCell align="right">{job.department}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
