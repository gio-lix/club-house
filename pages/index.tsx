import s from "../styles/Home.module.scss"
import WelcomeSteps from "../components/steps/welcomeStep";
import EnterNameStep from "../components/steps/enterNameStep";
import EnterNumberStep from "../components/steps/enterNumberStep";
import {createContext, Dispatch, SetStateAction, useState} from "react";
import ChooseAvatarStep from "../components/steps/chooseAvatarStep";
import EnterActiveCode from "../components/steps/EnterActiveCode";
import GithubStep from "../components/steps/githubStep";

type UserType = {
    id: string
    fullname: string
    avatarUrl: string
    isActive: number
    username: string
    phone: string
}


interface MainContextProps {
    onNextSteps: () => void
    setFilterMenu: (field: keyof UserType, value: string) => void
    setUserData:  Dispatch<SetStateAction<UserType>>
    userData: UserType
    step: number
}
export const MainContext = createContext<MainContextProps>({} as MainContextProps)

const stepsComponents = {
    0: WelcomeSteps,
    1: GithubStep,
    2: EnterNameStep,
    3: ChooseAvatarStep,
    4: EnterNumberStep,
    5: EnterActiveCode
}


export default function Home() {
    const [step, setStep] = useState<number>(3)
    const [userData, setUserData] = useState<UserType>()
    const Step = stepsComponents[step]

    const onNextSteps = () => {
        setStep((prev) => prev + 1)
    }

    const setFilterMenu = (field: string, value: string) => {
        setUserData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    console.log("userData -> ", userData)


    return (
        <MainContext.Provider value={{step, onNextSteps, userData, setUserData, setFilterMenu}}>
            <div className={s.containerBox}>
                <Step />
            </div>
        </MainContext.Provider>

    )
}
