import WhiteBlogs from "../../whiteBlogs"
import StepInfo from "../../stepInfo";
import {SiTwitter} from "react-icons/si"
import Button from "../../Button";
import s from "./Twitter.module.scss"
import {BsArrowRight} from "react-icons/bs";
import {useContext, useEffect} from "react";
import {MainContext} from "../../../pages";

const TwitterStep = () => {
    const {onNextSteps} = useContext(MainContext)

    const onClick = () => {
        const win = window.open("http://localhost:5001/auth/github", 'Auth',
            "width=400,height=500,status=yes,toolbar=no,menubar-nolocation=no")
        const timer = setInterval(() => {
            if (win.closed) {
                clearInterval(timer)
                onNextSteps()
            }
        }, 300)
    }

    useEffect(() => {
        window.addEventListener("message", (data) => {
            console.log("data,", data)
        })
    }, [])

    return (
        <div className="d-flex f-column">
            <StepInfo
                Icon={SiTwitter}
                title={"Do you want import info from Twitter?"}
                />
            <WhiteBlogs>
                <div className={s.twitterBox}>
                    <div>
                        ML
                    </div>
                    <p>mollie andersson</p>
                    <Button onClick={onClick} disabled={false} color={'indigo'}>
                        <SiTwitter className="mr-10"/>
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
export default TwitterStep