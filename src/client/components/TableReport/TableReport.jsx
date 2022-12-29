import React from 'react';
import {
  Box,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import moment from 'moment';
import PropTypes from 'prop-types';

import { useThemeMode } from '@/hooks';

import { setTableHeaderStyles } from './styles';

export const TableReport = ({ devicesData }) => {
  const [page, setPage] = React.useState(1);

  const { themeMode } = useThemeMode();

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Table size="small" aria-label="Devices logs table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                ...setTableHeaderStyles(themeMode),
                borderTopLeftRadius: '10px',
                borderBottomLeftRadius: '10px'
              }}
            >
              Name of log
            </TableCell>
            <TableCell sx={setTableHeaderStyles(themeMode)}>Quantity</TableCell>
            <TableCell
              sx={{
                ...setTableHeaderStyles(themeMode),
                borderTopRightRadius: '10px',
                borderBottomRightRadius: '10px'
              }}
            >
              Date
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell colSpan={3} sx={{ fontWeight: 700 }} align="center">
              {devicesData[page - 1]?.deviceName}
            </TableCell>
          </TableRow>

          {devicesData[page - 1].allDeviceLogs.map((log) => {
            return log.issues.map((issue, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{issue.name}</TableCell>
                  <TableCell align="right">{issue.count}</TableCell>
                  {index == 0 && (
                    <TableCell align="center" rowSpan={log.issues.length}>
                      {moment(log.date).format('YYYY-MM-DD')}
                    </TableCell>
                  )}
                </TableRow>
              );
            });
          })}
        </TableBody>
      </Table>

      {!!devicesData.length && devicesData.length > 1 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: '10px'
          }}
        >
          <Pagination
            count={devicesData.length}
            page={page}
            onChange={handleChange}
          />
        </Box>
      )}
    </>
  );
};

TableReport.propTypes = {
  devicesData: PropTypes.arrayOf(
    PropTypes.shape({
      deviceName: PropTypes.string,
      allDeviceLogs: PropTypes.arrayOf(
        PropTypes.shape({
          date: PropTypes.string,
          issues: PropTypes.arrayOf(
            PropTypes.shape({
              count: PropTypes.number,
              name: PropTypes.string
            })
          )
        })
      )
    })
  ).isRequired
};
