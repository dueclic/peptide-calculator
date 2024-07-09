import React from 'react';
import Calculator from './components/Calculator';

const App: React.FC = () => {

  function getQueryParam(param: string): string | null {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  return (
      <div className="container bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-2xl w-full">
        <Calculator />
      </div>
  );
};

export default App;
