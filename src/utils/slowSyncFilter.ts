import type { GeoLocation } from '../data/locations';

export function slowSyncFilter(
  countriesdata: GeoLocation[],
  searchValue: string
): GeoLocation[] {
  const filtered = [];
  for (const country of countriesdata) {
    // Simulate extremely slow computation for simulation/testing purposes
    const now = performance.now();
    while (performance.now() - now < 0.9) {
      // wait
    }

    if (country.name.toLowerCase().includes(searchValue.toLowerCase())) {
      filtered.push(country);
    }
  }
  return filtered;
}
