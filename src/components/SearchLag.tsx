import { useCallback, useEffect, useState } from 'react';
import FilteredList from './FilteredList';
import { locations } from '../data/locations';
import { slowSyncFilter } from '../utils/slowSyncFilter';

export function SearchLag() {
  const [searchValue, setSearchValue] = useState('');
  const [filtered, setFiltered] = useState(locations);
  const [isLocationSelected, setIsLocationSelected] = useState(false);

  useEffect(() => {
    const result = slowSyncFilter(locations, searchValue);
    setFiltered(result);
  }, [searchValue]);

  const handleSelect = useCallback((name: string) => {
    setSearchValue(name);
    setIsLocationSelected(true);
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setIsLocationSelected(false);
  }, []);

  return (
    <div className="autocomplete">
      <h3>Without useDeferredValue (UI may freeze)</h3>
      <div>Search for a location:</div>
      <input
        placeholder="Type here..."
        value={searchValue}
        onChange={handleChange}
      />
      <FilteredList
        filteredLocation={filtered}
        searchValue={searchValue}
        isLocationSelected={isLocationSelected}
        onSelect={handleSelect}
      />
    </div>
  );
}

export default SearchLag;
