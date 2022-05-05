import WhiteBlogs from "../../whiteBlogs"
import StepInfo from "../../stepInfo";
import Cookies from "js-cookie"
import {BsGithub} from "react-icons/bs"
import Button from "../../Button";
import s from "./Github.module.scss"
import {BsArrowRight} from "react-icons/bs";
import {useContext, useEffect} from "react";
import {MainContext, UserType} from "../../../pages";

const GithubStep = () => {
    const {onNextSteps, setUserData} = useContext(MainContext)

    const onClick = () => {
        window.open("http://localhost:5001/auth/github",
            'Auth',
            "width=400,height=500,status=yes,toolbar=no,menubar-nolocation=no"
        )
    }

    useEffect(() => {
        window.addEventListener("message", ({data, origin}) => {
            const user = data
            console.log("user -> ",user)
            if (typeof data === "string" &&  user.includes("avatarUrl")) {
                const json: UserType = JSON.parse(user)
                if (json) {
                    Cookies.set("token", json.token)
                    onNextSteps()
                }
                setUserData(json)
            }
        })
    }, [])

    return (
        <div className="d-flex f-column">
            <StepInfo
                Icon={BsGithub}
                title={"Do you want import info from Twitter?"}
                />
            <WhiteBlogs>
                <div className={s.twitterBox}>
                    <div>
                        ML
                    </div>
                    <p>mollie andersson</p>
                    <Button onClick={onClick} disabled={false} color={'indigo'}>
                        <BsGithub className="mr-10"/>
                        import from Github
                        <span className="ml-10 d-flex a-i-center">
                            <BsArrowRight/>
                        </span>
                    </Button>
                    <p>Enter my info manually.</p>
                </div>
            </WhiteBlogs>
        </div>
    )
}
export default GithubStep