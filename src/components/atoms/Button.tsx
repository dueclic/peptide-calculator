import React, {MouseEventHandler} from "react";

interface ButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
    selected: boolean;
    text: string;
}

export const Button: React.FC<ButtonProps> = ({onClick, selected, text}) => {


    const standardClassName = `m-1 p-1 text-sm  md:text-lg rounded-md border-2 border-alkemya-500 bg-black text-alkemya-500 cursor-pointer
    transition-colors duration-300 ease-in-out hover:bg-gray-800 hover:text-alkemya-500`;

    const selectedClassName = `m-1 p-1 text-sm md:text-lg rounded-md border-2 border-alkemya-500 bg-alkemya-500 text-black cursor-pointer transition-colors duration-300 ease-in-out`;

    return <button type="button"
                   className={selected ? selectedClassName : standardClassName}
                   onClick={onClick}>{text}</button>;
}
