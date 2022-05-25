import WhiteBlogs from "../../whiteBlogs";
import {BsTelephoneXFill} from "react-icons/bs";
import s from "./EnterNumberStep.module.scss"
import clsx from "clsx";
import NumberFormat from "react-number-format";
import {useContext, useState} from "react";
import {BsArrowRight} from "react-icons/bs"
import Button from "../../Button";
import StepInfo from "../../stepInfo";
import {MainContext} from "../../../pages";
import {Axios} from "../../../core/axios";

type InputValueState = {
    formattedValue: string
    value: string
}

export default function EnterNumberStep() {
    const {onNextSteps, setFilterMenu} = useContext(MainContext)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<InputValueState>({} as InputValueState)
    const nextDisabled = !inputValue.formattedValue || inputValue.formattedValue.includes("_")


    const onSubmit = async () => {
        try {
            setIsLoading(true)
            await Axios.get(`/auth/sms?phone=${inputValue.value}`)
            setFilterMenu("phone", inputValue.value)
            onNextSteps()
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }


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
                <Button onClick={onSubmit} disabled={isLoading || nextDisabled } color={!nextDisabled && "indigo"}>
                    {!isLoading ? (
                        <>
                            <p> Next</p>
                             <span className="ml-10 d-flex a-i-center">
                               <BsArrowRight/>
                             </span>
                        </>
                    ) : (
                        <p>Sending...</p>
                    )}
                </Button>
                <p className={clsx(s.para, "t-center")}>
                    By entering your phone nubmer, you are agreeing to your
                    term of Service and Privacy Policy, Thanks
                </p>
            </WhiteBlogs>
        </div>

    )
}