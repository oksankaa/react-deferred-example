import React, {
  useDeferredValue,
  useEffect,
  useState,
  useTransition,
} from 'react';
import { CountriesAndCapitals, countriesAndCapitals } from './countriesAndCapitals';
import { FilteredList } from './FilteredList';

function slowSyncFilter(
  countriesAndCapitalsData: CountriesAndCapitals[],
  searchValue: string
): CountriesAndCapitals[] {
  const filtered = [];
  for (const country of countriesAndCapitalsData) {
    // Artificial delay added for simulation/testing purposes.
    // This busy-wait blocks the CPU for ~0.9ms per item.
    // Do NOT use this – it's intentionally inefficient.
    const now = performance.now();
    while (performance.now() - now < 0.9) {
      // busy wait to block CPU
    }

    if (country.name.toLowerCase().includes(searchValue.toLowerCase())) {
      filtered.push(country);
    }
  }
  return filtered;
}

function SearchBad(): React.ReactElement {
  const [searchValue, setsearchValue] = useState('');
  const [filtered, setFiltered] = useState(countriesAndCapitals);

  useEffect(() => {
    const result = slowSyncFilter(countriesAndCapitals, searchValue);
    setFiltered(result);
  }, [searchValue]);

  return (
    <div>
      <h2>Direct filtering on input – causes UI lag</h2>
      <div>Search for a country:</div>
      <input
        placeholder="Type here..."
        value={searchValue}
        onChange={(e) => setsearchValue(e.target.value)}
      />
      <FilteredList filtered={filtered} searchValue={searchValue} />
    </div>
  );
}

function SearchTransition(): React.ReactElement {
  const [searchValue, setSearchValue] = useState('');
  const [filtered, setFiltered] = useState<Country[]>([]);

  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = e.target;
    setSearchValue(value);

    startTransition(() => {
      const filteredCountries = countriesAndCapitals.filter((country) =>
        country.name.toLowerCase().includes(value.toLowerCase())
      );
      setFiltered(filteredCountries);
    });
  }

  return (
    <div>
      <h2>Search with useTransition – smooth input</h2>
      <div>Search for a country:</div>
      <input value={searchValue} onChange={handleChange} />

      {isPending ? (
        <div style={{ color: 'rot' }}>Filtering...</div>
      ) : (
        <FilteredList filtered={filtered} searchValue={searchValue} />
      )}
    </div>
  );
}

function SearchGood(): React.ReactElement {
  const [searchValue, setsearchValue] = useState('');
  const deferredsearchValue = useDeferredValue(searchValue);
  const [filtered, setFiltered] = useState(countries);

  useEffect(() => {
    const result = slowSyncFilter(countries, deferredsearchValue);
    setFiltered(result);
  }, [deferredsearchValue]);

  return (
    <div>
      <h2>Filtering with useDeferredValue – smooth user experience</h2>
      <div>Search for a country:</div>
      <input
        placeholder="Type here..."
        value={searchValue}
        onChange={(e) => setsearchValue(e.target.value)}
      />
      <FilteredList filtered={filtered} searchValue={searchValue} />
    </div>
  );
}

function validateDiscountCode(
  code: string
): Promise<{ valid: boolean; discount?: number }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate code check
      if (code.toLowerCase() === 'reactrocks') {
        resolve({ valid: true, discount: 15 });
      } else {
        resolve({ valid: false });
      }
    }, 1500); // simulate 1.5s server delay
  });
}

function DiscountCodeInput() {
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleApply = async () => {
    setError(null);
    // Mark state update as transition to keep UI responsive
    startTransition(async () => {
      const result = await validateDiscountCode(code);
      if (result.valid) {
        setDiscount(result.discount ?? null);
        setError(null);
      } else {
        setDiscount(null);
        setError('Invalid discount code');
      }
    });
  };

  return (
    <div>
      <input
        type="text"
        value={code}
        placeholder="Enter discount code"
        onChange={(e) => setCode(e.target.value)}
        disabled={isPending}
      />
      <button onClick={handleApply} disabled={isPending || !code.trim()}>
        Apply
      </button>

      {isPending && <p>Checking code...</p>}

      {discount !== null && <p>Discount applied: {discount}% off!</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export function Search(): React.ReactElement {
  return (
    <div style={{ padding: 20 }}>
      <SearchBad />
      <hr />
      <br />
      <SearchTransition />
      <hr />
      <br />
      <SearchGood />
      <hr />
      <br />
      <DiscountCodeInput />
    </div>
  );
}
