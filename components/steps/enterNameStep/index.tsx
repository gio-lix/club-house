import WhiteBlogs from "../../whiteBlogs";
import Button from "../../Button";
import {useContext, useState} from "react";
import {BsArrowRight} from "react-icons/bs";
import StepInfo from "../../stepInfo";
import {RiUserSharedFill} from "react-icons/ri";
import clsx from "clsx";
import s from "./Enter.module.scss"
import {MainContext} from "../../../pages";

export default function EnterNameStep() {
    const {onNextSteps,userData, setFilterMenu} = useContext(MainContext)
    const [name, setName] = useState<string>(userData.fullname)


    const handleNext = () => {
        onNextSteps()
        setFilterMenu("fullname", name)
    }
    return (
        <div>
            <StepInfo
                Icon={RiUserSharedFill}
                title={"What's your full name?"}
                description={"people use real names on Clubhouse :), Thnx!"}
            />
            <WhiteBlogs>
                   <span className="d-flex j-c-center">
                        <input
                            type="text"
                            placeholder={"Enter FullName"}
                            className={clsx(s.inputName,"outline")}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                   </span>
                    <Button onClick={handleNext} disabled={!name} color={name && "indigo"}>
                        Next
                        <span className="ml-10 d-flex a-i-center">
                            <BsArrowRight/>
                        </span>
                    </Button>
            </WhiteBlogs>
        </div>
    )
}