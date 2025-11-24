import type { GeoLocation } from '../data/locations';

export function slowSyncFilter(
  locations: GeoLocation[],
  searchValue: string
): GeoLocation[] {
  const filtered = [];
  for (const location of locations) {
    // Simulate extremely slow computation for simulation/testing purposes
    const now = performance.now();
    while (performance.now() - now < 0.9) {
      // wait
    }

    if (location.name.toLowerCase().includes(searchValue.toLowerCase())) {
      filtered.push(location);
    }
  }
  return filtered;
}

