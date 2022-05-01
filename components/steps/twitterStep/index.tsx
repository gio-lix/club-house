import WhiteBlogs from "../../whiteBlogs"
import StepInfo from "../../stepInfo";
import {SiTwitter} from "react-icons/si"
import Button from "../../Button";
import s from "./Twitter.module.scss"
import {BsArrowRight} from "react-icons/bs";
import {useContext} from "react";
import {MainContext} from "../../../pages";

const TwitterStep = () => {
    const {onNextSteps} = useContext(MainContext)

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
                    <Button onClick={onNextSteps} disabled={false} color={'indigo'}>
                        <SiTwitter className="mr-10"/>
                        import from twitter
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