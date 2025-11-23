import React, { memo } from 'react';
import { type GeoLocation } from '../data/locations';

type FilteredListProps = {
  filteredLocation: GeoLocation[];
  searchValue: string;
  isLocationSelected: boolean;
  onSelect: (name: string) => void;
};

const FilteredList = memo(function FilteredList({
  filteredLocation,
  searchValue,
  isLocationSelected,
  onSelect,
}: FilteredListProps): React.ReactElement {
  return (
    <>
      <div className="autocomplete-list">
        {searchValue.trim() !== '' &&
          !isLocationSelected &&
          (filteredLocation.length > 0 ? (
            filteredLocation.slice(0, 15).map((item) => (
              <div
                key={item.name}
                className="autocomplete-item"
                onClick={() => onSelect(item.name)}
              >
                {item.name}
              </div>
            ))
          ) : (
            <div className="no-results">No results found.</div>
          ))}
      </div>
    </>
  );
});

export default FilteredList;
