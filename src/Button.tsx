import React, {PropsWithChildren} from 'react';

type ButtonPropsType  = {
    type?: "submit" | "reset" | "button";

} & React.HTMLProps<HTMLButtonElement>

export const Button: React.FC<PropsWithChildren<ButtonPropsType>> = ({children,  ...rest} ) => {


    return <button  {...rest} >{children}</button>
};

