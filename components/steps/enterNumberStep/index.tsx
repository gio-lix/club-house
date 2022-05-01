import WhiteBlogs from "../../whiteBlogs";
import {BsTelephoneXFill} from "react-icons/bs";
import s from "./EnterNumberStep.module.scss"
import w from "../welcomeStep/WelcomeSteps.module.scss"
import clsx from "clsx";
import NumberFormat from "react-number-format";
import {useContext, useState} from "react";
import {BsArrowRight} from "react-icons/bs"
import Button from "../../Button";
import StepInfo from "../../stepInfo";
import {MainContext} from "../../../pages";

type InputValueState = {
    formattedValue: string
    value: string
}

export default function EnterNumberStep() {
    const {onNextSteps} = useContext(MainContext)
    const [inputValue, setInputValue] = useState<InputValueState>({} as InputValueState)
    const nextDisabled = !inputValue.formattedValue || inputValue.formattedValue.includes("_")


    console.log("inputValue -> ", inputValue)

    return (
        <div className="d-flex f-column  a-i-center">
            <StepInfo
                Icon={BsTelephoneXFill}
                title={"Enter Your Phone"}
                description={"We will send you a confirmation code"}
            />
            <WhiteBlogs>
                   <span className='d-flex j-c-center mt-15 mb-15 '>
                        <NumberFormat
                            className={clsx(s.numFormat, "outline")}
                            format="+### (###) ##-##-##"
                            mask="_"
                            placeholder="+995 (595) 55 55 55"
                            value={inputValue.value}
                            onValueChange={({formattedValue, value}) => setInputValue({formattedValue, value})}
                        />
                   </span>
                <Button onClick={onNextSteps} disabled={nextDisabled} color={!nextDisabled && "indigo"}>
                    <p> Next</p>
                    <span className="ml-10 d-flex a-i-center">
                           <BsArrowRight/>
                    </span>
                </Button>
                <p className={clsx(s.para, "t-center")}>
                    By entering your phone nubmer, you are agreeing to your
                    term of Service and Privacy Policy, Thanks
                </p>
            </WhiteBlogs>
        </div>

    )
}