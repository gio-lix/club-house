import s from "../styles/Home.module.scss"
import WelcomeSteps from "../components/steps/welcomeStep";
import EnterNameStep from "../components/steps/enterNameStep";
import EnterNumberStep from "../components/steps/enterNumberStep";
import {createContext, Dispatch, SetStateAction, useEffect, useState} from "react";
import ChooseAvatarStep from "../components/steps/chooseAvatarStep";
import EnterActiveCode from "../components/steps/EnterActiveCode";
import GithubStep from "../components/steps/githubStep";

export type UserType = {
    id: number
    fullname: string
    avatarUrl: string
    isActive: number
    username: string
    phone: string,
    token?: string
}


interface MainContextProps {
    onNextSteps: () => void
    setFilterMenu: (field: keyof UserType, value: string) => void
    setUserData:  Dispatch<SetStateAction<UserType>>
    userData?: UserType
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

const getUserData = (): UserType | null => {
    try {
        return  JSON.parse(window.localStorage.getItem("userData"))
    } catch (err) {
        return null
    }
}


const getFormStep = (): number => {
       const json = getUserData()
       if (json) {
           if (json.phone) {
               return 5
           } else {
               return 4
           }
       }
    return 0
}

export default function Home() {
    const [step, setStep] = useState<number>(0)
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
    useEffect(() => {
        console.log("window -> ",typeof window)
        if (typeof window !== "undefined") {
            const json = getUserData()
            if (json) {
                setUserData(json)
                setStep(getFormStep())
            }
        }
    },[])

    useEffect(() => {
        window.localStorage.setItem("userData",userData ? JSON.stringify(userData) : '')

    }, [userData])

    return (
        <MainContext.Provider value={{step, onNextSteps, userData, setUserData, setFilterMenu}}>
            <div className={s.containerBox}>
                <Step />
            </div>
        </MainContext.Provider>

    )
}
