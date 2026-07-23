// DriverDost brand palette used for charts (single-hue trends + reserved status colors).
export const CHART = {
  blue: '#2f6bc4',
  green: '#2ba84a',
  amber: '#c77700',
  red: '#e2574c',
  grid: '#e9edf3',
  axis: '#9aa3b2',
  text: '#5b6472',
};

// KPI-tile accent colors (line + soft fill for the sparklines).
export const TILE = {
  users: '#2f6bc4',
  drivers: '#2ba84a',
  online: '#57b85e',
  rides: '#e2574c',
  active: '#e0a800',
  revenue: '#8b5cf6',
};

// Soft pastel fills for the progress-bar lists (dark text sits on top).
export const STATUS_SOFT: Record<string, string> = {
  COMPLETED: '#8fb8e8',
  CANCELLED: '#f0a9a3',
  ONGOING: '#9ab8e8',
  ACCEPTED: '#f5c9a3',
  ARRIVING: '#a9c3ec',
  REQUESTED: '#a7e3bd',
};
export const BAR_SOFT = '#b9c7f0';

// Ride statuses map to reserved status colors (always shown WITH a text label).
export const STATUS_COLOR: Record<string, string> = {
  COMPLETED: '#2ba84a',
  CANCELLED: '#e2574c',
  ONGOING: '#2f6bc4',
  ACCEPTED: '#5b8ad4',
  ARRIVING: '#21508f',
  REQUESTED: '#c77700',
};
