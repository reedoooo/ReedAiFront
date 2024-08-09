import {
  Box,
  Icon,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { MdCancel, MdCheckCircle, MdOutlineError } from 'react-icons/md';
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';
import { Card } from 'components/index';
import Menu from 'components/themed/CommonUi/menu/MainMenu.jsx';
import configs from 'config/index';
import { useMode } from 'hooks';

// Custom components

export default function ColumnsTable(props) {
  const { columnsData, tableData } = props;
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 5;
  const { theme } = useMode();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const textColor = theme.palette.text.primary;
  const iconColor = theme.palette.grey[500];
  const borderColor = theme.palette.grey[200];

  return (
    <Card
      direction="column"
      width="100%"
      paddingX="0px"
      overflowX={isSm ? 'scroll' : 'hidden'}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        paddingX="25px"
        marginBottom="20px"
      >
        <Typography
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Complex Table
        </Typography>
        <Menu items={configs.menus.genericMenuItems} />
      </Box>
      <TableContainer component={Paper}>
        <Table
          {...getTableProps()}
          sx={{ minWidth: 650 }}
          aria-label="simple table"
        >
          <TableHead>
            {headerGroups.map((headerGroup, index) => (
              <TableRow {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <TableCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                    sx={{ borderColor }}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      fontSize={{
                        sm: '10px',
                        lg: '12px',
                      }}
                      color="#fff"
                    >
                      {column.render('Header')}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = '';
                    if (cell.column.Header === 'NAME') {
                      data = (
                        <Typography
                          color={textColor}
                          fontSize="sm"
                          fontWeight="700"
                        >
                          {cell.value}
                        </Typography>
                      );
                    } else if (cell.column.Header === 'STATUS') {
                      data = (
                        <Box display="flex" alignItems="center">
                          <Icon
                            style={{
                              marginRight: '5px',
                            }}
                            color={
                              cell.value === 'Approved'
                                ? 'success'
                                : cell.value === 'Disable'
                                  ? 'error'
                                  : cell.value === 'Error'
                                    ? 'warning'
                                    : 'inherit'
                            }
                            component={
                              cell.value === 'Approved'
                                ? MdCheckCircle
                                : cell.value === 'Disable'
                                  ? MdCancel
                                  : cell.value === 'Error'
                                    ? MdOutlineError
                                    : null
                            }
                          />
                          <Typography
                            color={textColor}
                            fontSize="sm"
                            fontWeight="700"
                          >
                            {cell.value}
                          </Typography>
                        </Box>
                      );
                    } else if (cell.column.Header === 'PROGRESS') {
                      data = (
                        <Box display="flex" alignItems="center">
                          <Typography
                            sx={{
                              marginRight: '10px',
                            }}
                            variant="body2"
                            fontWeight="700"
                            color={textColor}
                          >
                            {cell.value}%
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={cell.value}
                            sx={{
                              width: '108px',
                              height: '8px',
                              backgroundColor: 'brandScheme.main',
                            }}
                          />
                        </Box>
                      );
                    } else {
                      data = cell.value;
                    }
                    return (
                      <TableCell
                        {...cell.getCellProps()}
                        key={index}
                        sx={{
                          borderColor,
                          fontSize: { sm: '14px' },
                          minWidth: {
                            sm: '150px',
                            md: '200px',
                            lg: 'auto',
                          },
                        }}
                      >
                        {data}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

ColumnsTable.propTypes = {
  columnsData: PropTypes.array.isRequired,
  tableData: PropTypes.array.isRequired,
};
