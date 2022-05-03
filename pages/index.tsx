import s from "../styles/Home.module.scss"
import WelcomeSteps from "../components/steps/welcomeStep";
import EnterNameStep from "../components/steps/enterNameStep";
import EnterNumberStep from "../components/steps/enterNumberStep";
import {createContext, useState} from "react";
import TwitterStep from "../components/steps/twitterStep";
import ChooseAvatarStep from "../components/steps/chooseAvatarStep";
import EnterActiveCode from "../components/steps/EnterActiveCode";

interface MainContextProps {
    onNextSteps: () => void
    step: number
}
export const MainContext = createContext<MainContextProps>({} as MainContextProps)

const stepsComponents = {
    0: WelcomeSteps,
    1: TwitterStep,
    2: EnterNameStep,
    3: ChooseAvatarStep,
    4: EnterNumberStep,
    5: EnterActiveCode
}

export default function Home() {
    const [step, setStep] = useState<number>(0)
    const Step = stepsComponents[step]

    const onNextSteps = () => {
        setStep((prev) => prev + 1)
    }

    return (
        <MainContext.Provider value={{step, onNextSteps}}>
            <div className={s.containerBox}>
                <Step />
            </div>
        </MainContext.Provider>

    )
}
