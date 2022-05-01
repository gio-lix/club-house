import s from "./Button.module.scss"
import clsx from "clsx";
import React, {FC} from "react";

const colors = {
    indigo: s.indigoButton,
    green: s.greenButton,
    gray: s.grayButton
}
interface ButtonType {
    // color?: keyof typeof colors,
    color?: string  ,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
    disabled?: boolean,
    children: any
}

const Button:FC<ButtonType> = ({children,color, onClick ,disabled}) =>  {


    return (
       <span className="d-flex j-c-center ">
            <button
                className={clsx(colors[color], s.buttonBox )}
                type="button"
                disabled={disabled}
                onClick={onClick}
            >
                {children}
            </button>
       </span>
    )
}
export default Button