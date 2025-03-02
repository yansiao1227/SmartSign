import React from 'react';
import {DataProvider, useData} from './model/DataContext';
import Navigation from './Navigation';

function App() {
  return (
    <DataProvider>
      <Navigation />
    </DataProvider>
  );
}

export default App;
