import React from 'react';
import ArtTable from './components/ArtTable';

// PrimeReact theme and core styles
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// Main application component
const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Art Institute of Chicago</h1>
      {/* Renders the data table component */}
      <ArtTable />
    </div>
  );
};

export default App;
