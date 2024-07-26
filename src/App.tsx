import React from 'react';
import Calculator from './components/Calculator';
import Credits from "./components/Credits";

const App: React.FC = () => {
    return (
        <div className="container bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-2xl w-full">
            <Calculator/>
            <Credits/>
        </div>
    );
};

export default App;
