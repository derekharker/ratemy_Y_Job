import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Rating } from '@mui/material';
import TableSortLabel from '@mui/material/TableSortLabel';

export default function JobsTable({ jobList }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('job');
  const navigate = useNavigate();

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleRowClick = (jobId) => {
    navigate(`/job/${jobId}`);
  };

  const sortedJobList = [...jobList].sort((a, b) => {
    if (orderBy === 'average_rating' || orderBy === 'total_ratings') {
      return order === 'asc'
        ? (a[orderBy] || 0) - (b[orderBy] || 0)
        : (b[orderBy] || 0) - (a[orderBy] || 0);
    }
    return order === 'asc'
      ? (a[orderBy] || '').localeCompare(b[orderBy] || '')
      : (b[orderBy] || '').localeCompare(a[orderBy] || '');
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'job'}
                direction={orderBy === 'job' ? order : 'asc'}
                onClick={() => handleRequestSort('job')}
              >
                <b>Job</b>
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === 'average_rating'}
                direction={orderBy === 'average_rating' ? order : 'asc'}
                onClick={() => handleRequestSort('average_rating')}
              >
                <b>Avg Rating</b>
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === 'total_ratings'}
                direction={orderBy === 'total_ratings' ? order : 'asc'}
                onClick={() => handleRequestSort('total_ratings')}
              >
                <b>Total Ratings</b>
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === 'department'}
                direction={orderBy === 'department' ? order : 'asc'}
                onClick={() => handleRequestSort('department')}
              >
                <b>Department</b>
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedJobList.map((job) => (
            <TableRow
              key={job.id}
              hover
              onClick={() => handleRowClick(job.id)}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              <TableCell component="th" scope="row">
                {job.title}
              </TableCell>
              <TableCell align="right">
                <Rating
                  name="read-only"
                  value={job.average_rating}
                  readOnly
                  sx={{
                    '& .MuiRating-iconFilled': {
                      color: '#0D579C',
                    },
                  }}
                />
              </TableCell>
              <TableCell align="right">
                <Rating
                  name="read-only"
                  value={job.total_ratings}
                  readOnly
                  sx={{
                    '& .MuiRating-iconFilled': {
                      color: '#0D579C',
                    },
                  }}
                />
              </TableCell>
              <TableCell align="right">{job.department}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
