import { useFilaments } from '@/hooks/features/useFilaments';
import { DataGrid } from '@mui/x-data-grid';
import type { Filament } from '@/types/models/filament';

export function FilamentList() {
  const { filaments, loading } = useFilaments();

  const columns = [
    // ... column definitions
  ];

  return (
    <DataGrid
      rows={filaments}
      columns={columns}
      loading={loading}
      // ... other props
    />
  );
} 