'use client';

import { Box, Grid, Card, CardContent, Typography } from '@mui/material';
import { PageContainer } from '@/components/common/PageContainer';
import {
  Inventory as InventoryIcon,
  Business as BusinessIcon,
  History as HistoryIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
}

function StatCard({ title, value, icon, color = 'primary' }: StatCardProps) {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {title}
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {value}
            </Typography>
          </Grid>
          <Grid item>
            <Box
              sx={{
                backgroundColor: `${color}.alpha12`,
                borderRadius: 2,
                p: 1,
                color: `${color}.main`,
              }}
            >
              {icon}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

/**
 * Dashboard page component
 * @returns {JSX.Element} Dashboard page
 */
export default function DashboardPage() {
  return (
    <PageContainer title="Dashboard">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Filaments"
            value={42}
            icon={<InventoryIcon />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Manufacturers"
            value={8}
            icon={<BusinessIcon />}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Usage History"
            value={156}
            icon={<HistoryIcon />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Low Stock"
            value={3}
            icon={<WarningIcon />}
            color="warning"
          />
        </Grid>
      </Grid>
    </PageContainer>
  );
}
