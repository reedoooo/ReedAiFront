/* eslint-disable */
import {
  Box,
  Checkbox,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Card } from 'components/index';
import Menu from 'components/themed/CommonUi/menu/MainMenu.jsx';
import configs from 'config/index';
import useMode from 'hooks/useMode';
import { useMemo } from 'react';
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';

export default function CheckTable(props) {
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
  initialState.pageSize = 11;
  const { theme } = useMode();
  const textColor = theme.palette.text.primary;
  const iconColor = theme.palette.grey[500];
  const borderColor = theme.palette.grey[200];

  return (
    <Card
      direction="column"
      width="100%"
      px="0px"
      overflow={{ xs: 'scroll', lg: 'hidden' }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        px="25px"
        mb="20px"
        alignItems="center"
      >
        <Typography
          variant="h5"
          fontWeight="700"
          lineHeight="100%"
          color={textColor}
        >
          Check Table
        </Typography>
        <Menu items={configs.menus.genericMenuItems} />
      </Box>
      <TableContainer>
        <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
          <TableHead>
            {headerGroups.map((headerGroup, index) => (
              <TableRow {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <TableCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                    sx={{ padding: '10px', borderColor: borderColor }}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      fontSize={{ xs: '10px', lg: '12px' }}
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
                        <Box display="flex" alignItems="center">
                          <Checkbox
                            defaultChecked={cell.value[1]}
                            color="primary"
                            sx={{ marginRight: '10px' }}
                          />
                          <Typography
                            variant="body2"
                            fontWeight="700"
                            color={textColor}
                          >
                            {cell.value[0]}
                          </Typography>
                        </Box>
                      );
                    } else if (cell.column.Header === 'PROGRESS') {
                      data = (
                        <>
                          <Typography
                            variant="body2"
                            fontWeight="700"
                            color={textColor}
                            mr={1}
                          >
                            {cell.value}%
                          </Typography>
                          <CircularProgress
                            variant="determinate"
                            value={cell.value}
                            size="63px"
                          />
                        </>
                      );
                    } else if (cell.column.Header === 'QUANTITY') {
                      data = (
                        <Typography
                          variant="body2"
                          fontWeight="700"
                          color={textColor}
                        >
                          {cell.value}
                        </Typography>
                      );
                    } else if (cell.column.Header === 'DATE') {
                      data = (
                        <Typography
                          variant="body2"
                          fontWeight="700"
                          color={textColor}
                        >
                          {cell.value}
                        </Typography>
                      );
                    }
                    return (
                      <TableCell
                        {...cell.getCellProps()}
                        key={index}
                        sx={{
                          fontSize: { xs: '14px' },
                          minWidth: { xs: '150px', md: '200px', lg: 'auto' },
                          borderColor: 'transparent',
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
