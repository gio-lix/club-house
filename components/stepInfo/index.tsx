import {FC} from "react";
import clsx from "clsx";
import s from "./StepInfo.module.scss"
import w from "../steps/welcomeStep/WelcomeSteps.module.scss";

interface StepType {
    Icon?: any
    title?: string
    description?: string
}

const StepInfo:FC<StepType> = ({Icon, title,description}) => {
    return (
        <section className={clsx([s.section,"d-flex f-column  a-i-center"])}>
                <span className={clsx([w.handeWave, "d-flex j-c-center"])}>
                    <Icon className={s.logo} />
                </span>
            <h3>{title}</h3>
            <p>{description}</p>
        </section>
    )
}
export default StepInfo