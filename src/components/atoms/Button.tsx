import React, {MouseEventHandler} from "react";

interface ButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
    selected: boolean;
    text: string;
}

export const Button: React.FC<ButtonProps> = ({onClick, selected, text}) => {


    const standardClassName = `m-1 p-2 text-lg rounded-md border-2 border-yellow-500 bg-black text-yellow-500 cursor-pointer
    transition-colors duration-300 ease-in-out hover:bg-gray-800 hover:text-yellow-500`;

    const selectedClassName = `m-1 p-2 text-lg rounded-md border-2 border-yellow-500 bg-yellow-500 text-black cursor-pointer transition-colors duration-300 ease-in-out`;

    return <button type="button"
                   className={selected ? selectedClassName : standardClassName}
                   onClick={onClick}>{text}</button>;
}
