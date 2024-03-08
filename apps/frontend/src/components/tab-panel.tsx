import { Box, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

interface ITabPanelProps {
  children?: ReactNode;
  value: number;
  index: number;
}

const TabPanel = ({ children, value, index }: ITabPanelProps) => {
  console.log(value, index);
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export default TabPanel;