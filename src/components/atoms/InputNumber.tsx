import React, {ChangeEventHandler} from "react";

interface NumberProps {
    onChange: ChangeEventHandler<HTMLInputElement>;
    placeholder: string;
    value: number | null;
}

export const InputNumber: React.FC<NumberProps> = ({onChange, placeholder, value}) => {

    return <input type="number"
                  className={
                      `m-1 p-2 text-lg rounded-md border-2 border-yellow-500 bg-black text-yellow-500 cursor-pointer
    transition-colors duration-300 ease-in-out hover:bg-gray-800 placeholder:text-yellow-100 focus:outline-none focus:ring focus:ring-yellow-500`
                  }
                  value={value ?? ''}
                  onChange={onChange} placeholder={placeholder}/>;
}
