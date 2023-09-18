import React, { useState } from 'react';
import { Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import PaginationComponent from './PaginationComponent';

interface Data {
  description: string;
  title: string;
}

interface Movie {
  title: string;
  description: string;
  id: number;
}

interface MovieTableProps {
  movies: Movie[];
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'Title',
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: true,
    label: 'Description',
  }
];


function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={'normal'}
            >
              {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable({ movies }: MovieTableProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);

  const createData = (title: string, description: string, id: number) => {
    return { title, description, id };
  };
  
  
  const rows = React.useMemo(() => {
    return movies.length ? movies.map(movie => createData(movie.title, movie.description, movie.id)) : [];
  }, [movies]);

  const handleChangePage = (event: unknown, newPage: number) => {
    const startIndex = newPage * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    setPage(newPage);
    setStartIndex(startIndex);
    setEndIndex(endIndex);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    const newPage = Math.floor(startIndex / newRowsPerPage);
    const newStartIndex = newPage * newRowsPerPage;
    const newEndIndex = newStartIndex + newRowsPerPage;

    setRowsPerPage(newRowsPerPage);
    setPage(newPage);
    setStartIndex(newStartIndex);
    setEndIndex(newEndIndex);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  
  const visibleRows = React.useMemo(
    () => rows.slice(startIndex, endIndex),
    [rows, startIndex, endIndex]
  );

  const totalCount = rows.length;

  return (
    
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="FavMoviesTable"
            size={'medium'}
          >
            <EnhancedTableHead />
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No matches found
                  </TableCell>
                </TableRow>
              ) : (
                visibleRows.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow key={row.id}>
                      <TableCell>
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 200, maxHeight: 50 }}
                      >
                        <Link to={`/movies/${row.id}`}>
                          {row.title}
                        </Link>
                      </TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                    </TableRow>
                  );
                })
              )}
              {emptyRows > 0 && (
                <TableRow style={{ height: (53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <PaginationComponent 
          count={totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
