import {
  TableContainer,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
  TablePagination,
} from '@mui/material';
import { usePromptStore } from 'contexts/PromptProvider';
import React, { useState, useEffect, useMemo } from 'react';
import useMode from 'hooks/useMode';
import { isASCII } from 'utils/is';

const useBasicLayout = () => {
  const { theme } = useMode();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return { isMobile };
};

const PromptTable = ({ onUsePrompt }) => {
  const { isMobile } = useBasicLayout();
  const promptStore = usePromptStore();
  const [promptList, setPromptList] = useState(promptStore.promptList);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(isMobile ? 10 : 20);

  const renderTemplate = useMemo(() => {
    const [keyLimit, valueLimit] = isMobile ? [6, 9] : [15, 50];
    return promptList.map(item => {
      let factor = isASCII(item.key) ? 10 : 1;
      return {
        renderKey:
          item.key.length <= keyLimit
            ? item.key
            : `${item.key.substring(0, keyLimit * factor)}...`,
        renderValue:
          item.value.length <= valueLimit
            ? item.value
            : `${item.value.substring(0, valueLimit * factor)}...`,
        key: item.key,
        value: item.value,
      };
    });
  }, [promptList, isMobile]);

  const maxHeight = isMobile ? 400 : 600;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer
      component={Paper}
      style={{ maxHeight: maxHeight, marginTop: '10px' }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>提示词标题</TableCell>
            <TableCell>内容</TableCell>
            <TableCell align="center">操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderTemplate
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.renderKey}</TableCell>
                <TableCell>{row.renderValue}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={() => onUsePrompt(row.key, row.value)}
                  >
                    使用
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={promptList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default PromptTable;
