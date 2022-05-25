import {RiQrCodeLine} from "react-icons/ri"
import StepInfo from "../../stepInfo";
import WhiteBlogs from "../../whiteBlogs";
import {ChangeEvent, useContext, useState} from "react";
import s from "./EnterActiveCode.module.scss"
import clsx from "clsx";
import {useRouter} from "next/router";
import {MainContext} from "../../../pages";
import {Axios} from "../../../core/axios";

const EnterActiveCode = () => {
    const {onNextSteps} = useContext(MainContext)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [codes, setCodes] = useState(["", "", "", ""])
    const nextDisabled = codes?.some((v) => !v) || codes?.length < 4
    const router = useRouter()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const index = Number(e.target.getAttribute("id"))
        const value = e.target.value

        setCodes((prev: any): any => {
            const newArr = [...prev]
            newArr[index] = value
            return newArr
        })
        if (e.target.nextSibling) {
            (e.target.nextSibling as HTMLInputElement).focus()
        } else {
            onSubmit([...codes, value].join(''))
        }
    }
    const onSubmit = async (code: string ) => {
        console.log("code -> ", code)
        try {
            setIsLoading(true)
            await Axios.get(`/auth/sms/activate?code=${code}`)
            router.push("./rooms")
        } catch (err) {
            alert("something went wrong!")
            setCodes(["", "", "", ""])
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <div>
            {isLoading ? (
                <div className="d-flex f-column a-i-center">
                    <div className={s.loading}> </div>
                    <p>Activation in progress...</p>
                </div>
            ) : (
                <div className="d-flex f-column" >
                    <StepInfo
                        Icon={RiQrCodeLine}
                        title="Enter your active code"
                    />
                    <WhiteBlogs>
                        <div className={clsx(s.activeCode, "d-flex")}>
                            {codes?.map((code, index) => (
                                <input
                                    key={index}
                                    type="tel"
                                    placeholder="x"
                                    maxLength={1}
                                    id={String(index)}
                                    onChange={handleChange}
                                    value={code}
                                />
                            ))}
                        </div>
                        {/*<Button onClick={onSubmit} disabled={nextDisabled} color={!nextDisabled &&  "indigo"}>*/}
                        {/*    Next*/}
                        {/*    <span className="ml-10 d-flex a-i-center">*/}
                        {/*    <BsArrowRight/>*/}
                        {/*</span>*/}
                        {/*</Button>*/}
                    </WhiteBlogs>
                </div>
            )}
        </div>
    )
}
export default EnterActiveCode