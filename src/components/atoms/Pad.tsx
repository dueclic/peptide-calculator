import React, {MouseEventHandler} from "react";

interface PadProps {
    onClick: MouseEventHandler<HTMLDivElement>;
    selected: boolean;
    text: string;
    image: string;
}

export const Pad: React.FC<PadProps> = ({onClick, selected, text, image}) => {


    const standardClassName = `flex flex-col justify-between items-center md:h-44 md:w-44 cursor-pointer rounded-md border-2 border-yellow-500 bg-black text-yellow-500
    transition-colors duration-300 ease-in-out text-lg hover:bg-gray-800 hover:text-yellow-500`;

    const selectedClassName = `flex flex-col justify-between items-center md:h-44 md:w-44 cursor-pointer rounded-md border-2 border-yellow-500 bg-yellow-500 text-black
    transition-colors duration-300 ease-in-out text-lg`;

    return <div className={selected ? selectedClassName : standardClassName}
                onClick={onClick}>
        <div className="flex-1 flex items-center justify-center">
            <img src={image}
                                                                      className="w-20 md:w-36 m-2 cursor-pointer transition-transform transform hover:scale-110"
                                                                      alt={text}/>
        </div>
        <div className="h-10 flex text-sm md:text-lg items-center justify-center w-full">
            {text}
        </div>
    </div>;
}
