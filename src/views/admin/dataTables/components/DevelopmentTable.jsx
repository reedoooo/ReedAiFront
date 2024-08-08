import {
  Box,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useMemo } from 'react';
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';
import { AndroidLogo, AppleLogo, WindowsLogo } from 'assets/humanIcons/custom';
import Menu from 'components/themed/CommonUi/menu/MainMenu.jsx';
import Card from 'components/themed/UncommonUi/card/Card';
import configs from 'config/index';
import useMode from 'hooks/useMode';

export default function DevelopmentTable(props) {
  const { columnsData, tableData } = props;
  const { theme } = useMode();
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

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        paddingX: 0,
        overflowX: { sm: 'scroll', lg: 'hidden' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingX: '25px',
          marginBottom: '20px',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: '#1B2559', // secondaryGray.900
            fontWeight: 700,
            lineHeight: '100%',
          }}
        >
          Development Table
        </Typography>
        <Menu items={configs.menus.genericMenuItems} />
      </Box>
      <TableContainer component={Paper}>
        <Table
          {...getTableProps()}
          sx={{ color: 'gray.500', marginBottom: '24px' }}
        >
          <TableHead>
            {headerGroups.map((headerGroup, index) => (
              <TableRow {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <TableCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                    sx={{
                      paddingRight: '10px',
                      borderColor: '#E2E8F0', // gray.200
                      fontSize: '12px',

                      // fontSize: { sm: '10px', lg: '12px' },
                      color: 'gray.400',
                    }}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
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
                          sx={{
                            color: '#1B2559',
                            fontSize: 'sm',
                            fontWeight: 700,
                          }}
                        >
                          {cell.value}
                        </Typography>
                      );
                    } else if (cell.column.Header === 'TECH') {
                      data = (
                        <Box display="flex" alignItems="center">
                          {cell.value.map((item, key) => {
                            if (item === 'apple') {
                              return (
                                <AppleLogo
                                  key={key}
                                  color="#A0AEC0" // secondaryGray.500
                                  height="18px"
                                  width="19px"
                                  sx={{
                                    marginRight: '16px',
                                    height: '18px',
                                    width: '15px',
                                  }}
                                />
                              );
                            } else if (item === 'android') {
                              return (
                                <AndroidLogo
                                  key={key}
                                  color="#A0AEC0" // secondaryGray.500
                                  height="18px"
                                  width="19px"
                                  sx={{
                                    marginRight: '16px',
                                    height: '18px',
                                    width: '16px',
                                  }}
                                />
                              );
                            } else if (item === 'windows') {
                              return (
                                <WindowsLogo
                                  key={key}
                                  color="#A0AEC0" // secondaryGray.500
                                  height="18px"
                                  width="19px"
                                  sx={{ height: '18px', width: '19px' }}
                                />
                              );
                            }
                          })}
                        </Box>
                      );
                    } else if (cell.column.Header === 'DATE') {
                      data = (
                        <Typography
                          sx={{
                            color: '#1B2559',
                            fontSize: '12px',
                            fontWeight: 700,
                          }}
                        >
                          {cell.value}
                        </Typography>
                      );
                    } else if (cell.column.Header === 'PROGRESS') {
                      data = (
                        <Box display="flex" alignItems="center">
                          <Typography
                            sx={{
                              marginRight: '10px',
                              color: '#1B2559',
                              fontSize: '12px',
                              fontWeight: 700,
                            }}
                          >
                            {cell.value}%
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={cell.value}
                            sx={{ height: '8px', width: '63px' }}
                          />
                        </Box>
                      );
                    }
                    return (
                      <TableCell
                        {...cell.getCellProps()}
                        key={index}
                        sx={{
                          fontSize: { sm: '14px' },
                          minWidth: { sm: '150px', md: '200px', lg: 'auto' },
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
