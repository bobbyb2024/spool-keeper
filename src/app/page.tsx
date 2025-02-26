'use client';

import { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  LinearProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';

interface Filament {
  id: string;
  name: string;
  brand: string;
  material: string;
  color: string;
  currentWeight: number;
  initialWeight: number;
  spoolWeight: number;
}

/**
 * Home page component displaying filament inventory
 * @returns {JSX.Element} Home page component
 */
export default function Home() {
  const [filaments, setFilaments] = useState<Filament[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFilaments();
  }, []);

  /**
   * Fetches filaments from the API
   */
  const fetchFilaments = async () => {
    try {
      const response = await fetch('/api/filaments');
      const data = await response.json();
      setFilaments(data);
    } catch (error) {
      console.error('Failed to fetch filaments:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'brand', headerName: 'Brand', width: 130 },
    { field: 'material', headerName: 'Material', width: 130 },
    { field: 'color', headerName: 'Color', width: 130 },
    {
      field: 'remaining',
      headerName: 'Remaining',
      width: 150,
      renderCell: (params: any) => {
        const remaining = ((params.row.currentWeight - params.row.spoolWeight) / 
          (params.row.initialWeight - params.row.spoolWeight)) * 100;
        return (
          <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={remaining} />
            <Typography variant="body2">{`${Math.round(remaining)}%`}</Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          SpoolKeeper - Filament Inventory
        </Typography>
        
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ mb: 3 }}
          href="/filaments/new"
        >
          Add New Filament
        </Button>

        <Card>
          <CardContent>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={filaments}
                columns={columns}
                loading={loading}
                pageSizeOptions={[5, 10, 25]}
                disableRowSelectionOnClick
              />
            </div>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
} 