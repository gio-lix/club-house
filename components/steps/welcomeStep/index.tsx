import WhiteBlogs from "../../whiteBlogs";
import s from "./WelcomeSteps.module.scss"
import {FaHandSpock} from "react-icons/fa"
import clsx from "clsx";
import {BsArrowRight} from "react-icons/bs";
import Button from "../../Button";
import {useContext} from "react";
import {MainContext} from "../../../pages";

export default function WelcomeSteps() {
    const {onNextSteps} = useContext(MainContext)
    return (
        <WhiteBlogs>
          <span className='d-flex a-i-center j-c-center '>
            <FaHandSpock className={s.handeWave}/>
            <h3 className={clsx([s.title, "ml-10"])}> Hello To Clubhouse </h3>
          </span>
            <p className={s.para}>
                We're working to get Clubhouse ready for everyone!
                while we wrap up the finishing youches, we're adding people
                gradually to make sure nothing breaks :)
            </p>
            <div className={clsx(s.buttonBox, "mb-15")} >
                <Button onClick={onNextSteps} color="indigo">
                    <p> Get Your Username</p>
                    <span  className="ml-10 d-flex a-i-center">
                        <BsArrowRight/>
                    </span>
                </Button>
                <p>
                    <span>Have an invite text?</span>
                    <span>Sign in</span>
                </p>
           </div>
        </WhiteBlogs>
    )
}