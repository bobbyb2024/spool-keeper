import { BaseEntity } from '@/types';

export interface MaterialType extends BaseEntity {
  name: string;
  abbreviations: string[];
  registered: Date;
  profileOptions: string | null;
  tags: string[];
  
  // Temperature Settings
  bedTempLow: number;
  bedTempHigh: number;
  nozzleTempLow: number;
  nozzleTempHigh: number;
  chamberTempLow: number | null;
  chamberTempHigh: number | null;
  
  // Layer-specific Settings
  bedTempFirstLayer: number;
  bedTempOtherLayers: number;
  nozzleTempFirstLayer: number;
  nozzleTempOtherLayers: number;
  chamberTempFirstLayer: number | null;
  chamberTempOtherLayers: number | null;
  
  // Compatibility Settings
  supportedNozzleTypes: string[];
  supportedPrinters: string[];
  supportsAMS: boolean;
  
  // Extended Settings
  profileOptionsExtended: string | null;
}

export type MaterialTypeCreate = Omit<MaterialType, keyof BaseEntity>;
export type MaterialTypeUpdate = Partial<MaterialTypeCreate>; 