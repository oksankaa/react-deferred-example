import './App.css';
import { SearchLag } from './components/SearchLag';
import SearchSmooth from './components/SearchSmooth';

function App() {
  return (
    <>
      <SearchSmooth />
      <br />
      <br />
      <hr />
      <br />
      <SearchLag />
    </>
  );
}

export default App;
