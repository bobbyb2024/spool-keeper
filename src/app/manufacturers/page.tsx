'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import { PageContainer } from '@/components/common/PageContainer';

interface Manufacturer {
  id: string;
  name: string;
  registeredDate: string;
  website: string | null;
  logo: string | null;
  labelLogo: string | null;
  tags: string[];
  comments: string | null;
}

/**
 * ManufacturersPage component for managing manufacturers
 * @returns {JSX.Element} Manufacturers page component
 */
export default function ManufacturersPage() {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentManufacturer, setCurrentManufacturer] = useState<Partial<Manufacturer>>({});

  useEffect(() => {
    fetchManufacturers();
  }, []);

  const fetchManufacturers = async () => {
    try {
      const response = await fetch('/api/manufacturers');
      const data = await response.json();
      setManufacturers(data);
    } catch (error) {
      console.error('Failed to fetch manufacturers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const url = currentManufacturer.id 
        ? `/api/manufacturers/${currentManufacturer.id}`
        : '/api/manufacturers';
      
      const method = currentManufacturer.id ? 'PUT' : 'POST';
      
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentManufacturer),
      });
      
      setOpenDialog(false);
      fetchManufacturers();
    } catch (error) {
      console.error('Failed to save manufacturer:', error);
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'website', headerName: 'Website', width: 200 },
    {
      field: 'tags',
      headerName: 'Tags',
      width: 300,
      renderCell: (params: any) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          {params.row.tags.map((tag: string) => (
            <Chip key={tag} label={tag} size="small" />
          ))}
        </Box>
      ),
    },
    {
      field: 'registeredDate',
      headerName: 'Registered Date',
      width: 200,
      valueGetter: (params: any) => new Date(params.row.registeredDate).toLocaleDateString(),
    },
  ];

  const addButton = (
    <Button
      variant="contained"
      startIcon={<AddIcon />}
      onClick={() => {
        setCurrentManufacturer({});
        setOpenDialog(true);
      }}
    >
      Add Manufacturer
    </Button>
  );

  return (
    <PageContainer title="Manufacturers" action={addButton}>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={manufacturers}
          columns={columns}
          loading={loading}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          onRowClick={(params) => {
            setCurrentManufacturer(params.row);
            setOpenDialog(true);
          }}
        />
      </div>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {currentManufacturer.id ? 'Edit Manufacturer' : 'Add Manufacturer'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Name"
              value={currentManufacturer.name || ''}
              onChange={(e) => setCurrentManufacturer({
                ...currentManufacturer,
                name: e.target.value,
              })}
            />
            <TextField
              label="Website"
              value={currentManufacturer.website || ''}
              onChange={(e) => setCurrentManufacturer({
                ...currentManufacturer,
                website: e.target.value,
              })}
            />
            <TextField
              label="Logo URL"
              value={currentManufacturer.logo || ''}
              onChange={(e) => setCurrentManufacturer({
                ...currentManufacturer,
                logo: e.target.value,
              })}
            />
            <TextField
              label="Label Logo URL"
              value={currentManufacturer.labelLogo || ''}
              onChange={(e) => setCurrentManufacturer({
                ...currentManufacturer,
                labelLogo: e.target.value,
              })}
            />
            <TextField
              label="Tags (comma-separated)"
              value={currentManufacturer.tags?.join(',') || ''}
              onChange={(e) => setCurrentManufacturer({
                ...currentManufacturer,
                tags: e.target.value.split(',').map(tag => tag.trim()),
              })}
            />
            <TextField
              label="Comments"
              multiline
              rows={4}
              value={currentManufacturer.comments || ''}
              onChange={(e) => setCurrentManufacturer({
                ...currentManufacturer,
                comments: e.target.value,
              })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
} 