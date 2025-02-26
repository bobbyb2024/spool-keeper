interface MaterialProperty {
  printTemp: {
    min: number;
    max: number;
  };
  bedTemp: {
    min: number;
    max: number;
  };
  shrinkage?: number;
  dryingTemp?: number;
  dryingTime?: number;
}

export const materialTypes = [
  {
    name: 'PLA',
    abbreviations: ['PLA', 'Polylactic Acid'],
    profileOptions: 'Standard PLA',
    tags: ['Standard', 'Easy to Print', 'Biodegradable'],
    
    // Temperature Ranges
    bedTempLow: 20,
    bedTempHigh: 60,
    nozzleTempLow: 180,
    nozzleTempHigh: 220,
    chamberTempLow: null,
    chamberTempHigh: null,
    
    // Layer Settings
    bedTempFirstLayer: 60,
    bedTempOtherLayers: 55,
    nozzleTempFirstLayer: 215,
    nozzleTempOtherLayers: 210,
    chamberTempFirstLayer: null,
    chamberTempOtherLayers: null,
    
    // Compatibility
    supportedNozzleTypes: ['Brass', 'Hardened Steel', 'Stainless Steel'],
    supportedPrinters: ['Prusa i3', 'Ender 3', 'Any FDM'],
    supportsAMS: true,
    
    profileOptionsExtended: `
      # PLA Print Settings
      - Recommended cooling: 100%
      - Fan speed: Always on
      - Retraction distance: 0.8mm
      - Retraction speed: 35mm/s
      - No enclosure needed
      - Store in dry environment
      
      ## Special Considerations
      - Sensitive to UV light
      - Biodegradable under industrial conditions
      - Good layer adhesion
      - Minimal warping
    `.trim(),
  },
  {
    name: 'PETG',
    abbreviations: ['PETG', 'PET-G', 'Polyethylene Terephthalate Glycol'],
    profileOptions: 'Standard PETG',
    tags: ['Durable', 'Water Resistant', 'Chemical Resistant'],
    
    bedTempLow: 70,
    bedTempHigh: 90,
    nozzleTempLow: 230,
    nozzleTempHigh: 250,
    chamberTempLow: 30,
    chamberTempHigh: 50,
    
    bedTempFirstLayer: 85,
    bedTempOtherLayers: 80,
    nozzleTempFirstLayer: 245,
    nozzleTempOtherLayers: 240,
    chamberTempFirstLayer: 45,
    chamberTempOtherLayers: 40,
    
    supportedNozzleTypes: ['Brass', 'Hardened Steel', 'Stainless Steel'],
    supportedPrinters: ['Prusa i3', 'Ender 3', 'Any FDM'],
    supportsAMS: true,
    
    profileOptionsExtended: `
      # PETG Print Settings
      - Recommended cooling: 30-50%
      - Fan speed: Reduced
      - Retraction distance: 1.2mm
      - Retraction speed: 30mm/s
      - Light enclosure recommended
      - Dry before printing
      
      ## Special Considerations
      - Tends to string
      - Excellent layer adhesion
      - Good chemical resistance
      - Moderate moisture sensitivity
    `.trim(),
  },
  {
    name: 'ABS',
    abbreviations: ['ABS', 'Acrylonitrile Butadiene Styrene'],
    profileOptions: 'Standard ABS',
    tags: ['Engineering', 'Heat Resistant', 'Durable'],
    
    bedTempLow: 95,
    bedTempHigh: 110,
    nozzleTempLow: 230,
    nozzleTempHigh: 250,
    chamberTempLow: 45,
    chamberTempHigh: 60,
    
    bedTempFirstLayer: 105,
    bedTempOtherLayers: 100,
    nozzleTempFirstLayer: 245,
    nozzleTempOtherLayers: 240,
    chamberTempFirstLayer: 55,
    chamberTempOtherLayers: 50,
    
    supportedNozzleTypes: ['Brass', 'Hardened Steel', 'Stainless Steel'],
    supportedPrinters: ['Prusa i3 (Enclosure)', 'Voron', 'Professional FDM'],
    supportsAMS: true,
    
    profileOptionsExtended: `
      # ABS Print Settings
      - Recommended cooling: 0-20%
      - Fan speed: Minimal
      - Retraction distance: 0.5mm
      - Retraction speed: 35mm/s
      - Enclosure required
      - Dry before printing
      
      ## Special Considerations
      - Requires enclosure
      - High temperature resistance
      - Prone to warping
      - Releases fumes - ventilation needed
    `.trim(),
  },
  {
    name: 'TPU',
    description: 'Thermoplastic Polyurethane - A flexible, rubber-like material.',
    properties: {
      printTemp: { min: 210, max: 230 },
      bedTemp: { min: 30, max: 60 },
      dryingTemp: 45,
      dryingTime: 4,
      shrinkage: 0.2,
    } as MaterialProperty,
  },
  // Add more material types...
]; 