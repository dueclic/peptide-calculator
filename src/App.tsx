import React, {useEffect, useState} from 'react';
import Calculator from './components/Calculator';
import Credits from "./components/Credits";

const App: React.FC = () => {

    const [hideCopyright, setHideCopyright] = useState<boolean>(false);

    useEffect(() => {
        if (!process.env.HIDE_COPYRIGHT || window?.alkwp?.hide_copyright) {
            setHideCopyright(true);
        }
    }, []);

    return (
        <div className="container bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-2xl w-full">
            <Calculator/>
            {! hideCopyright && <Credits/>}
        </div>
    );
};

export default App;