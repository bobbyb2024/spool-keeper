'use client';

import { ReactNode } from 'react';
import { Container, Paper, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  action?: ReactNode;
}

/**
 * PageContainer component providing consistent page layout
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components
 * @param {string} [props.title] - Page title
 * @param {ReactNode} [props.action] - Action component (e.g., buttons)
 * @returns {JSX.Element} Page container
 */
export function PageContainer({ children, title, action }: PageContainerProps) {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {title && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontSize: '2rem',
              fontWeight: 700,
              color: theme.palette.text.primary,
            }}
          >
            {title}
          </Typography>
          {action && <Box>{action}</Box>}
        </Box>
      )}
      <Box
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        {children}
      </Box>
    </Container>
  );
} 