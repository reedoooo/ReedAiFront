import { Box, Grid } from '@mui/material';
import React from 'react';
import CheckTable from 'views/admin/dataTables/components/CheckTable';
import ColumnsTable from 'views/admin/dataTables/components/ColumnsTable';
import ComplexTable from 'views/admin/dataTables/components/ComplexTable';
import DevelopmentTable from 'views/admin/dataTables/components/DevelopmentTable';
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from 'views/admin/dataTables/variables/columnsData';
import tableDataCheck from 'views/admin/dataTables/variables/tableDataCheck.json';
import tableDataColumns from 'views/admin/dataTables/variables/tableDataColumns.json';
import tableDataComplex from 'views/admin/dataTables/variables/tableDataComplex.json';
import tableDataDevelopment from 'views/admin/dataTables/variables/tableDataDevelopment.json';

// ==============================|| DATA TABLES ||============================== //

export default function Settings() {
  return (
    <Box sx={{ pt: { xs: '130px', md: '80px', xl: '80px' } }}>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6}>
          <DevelopmentTable
            columnsData={columnsDataDevelopment}
            tableData={tableDataDevelopment}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ColumnsTable
            columnsData={columnsDataColumns}
            tableData={tableDataColumns}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ComplexTable
            columnsData={columnsDataComplex}
            tableData={tableDataComplex}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
