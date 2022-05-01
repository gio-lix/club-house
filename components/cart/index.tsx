import {FC} from "react";
import s from "./Cart.module.scss"
import avatarUser from "../../public/avatart.svg"
import Image from "next/image";
import {FaUser} from "react-icons/fa"
import {RiMessage3Fill} from "react-icons/ri"
import Avatar from "../avatar";

interface CartState {
    title?: string
    avatar?: string[]
    users?: string[]
    guestCount?: number
    speakerCount?: number
}

const ConversationCart: FC<CartState> = ({guestCount, users, speakerCount, avatar, title}) => {
    const ava = avatar && avatar[0]

    return (
        <>
            <div className={s.cartBox}>
                <h3> {title} </h3>
                <div>
                    <div>
                        {avatar?.length > 1 ? avatar?.map((el, index) => (
                            <div key={index}>
                                <Avatar src={el} width={50} height={50}/>
                            </div>
                        )) : (
                            <div>
                                <Avatar src={avatar && avatar[0]} width={50} height={50}/>
                            </div>
                        )}

                    </div>
                    <span>
                        {users?.map((el, index) => (
                            <p key={index}>
                                {el}
                            </p>
                        ))}
                    </span>
                </div>
                <div>
                    <span className='d-flex a-i-center '>
                        <p className="mr-10">{guestCount ? guestCount : 0}</p>
                        <FaUser/>
                    </span>
                    <span className='d-flex a-i-center ml-25'>
                        <p className="mr-10">{speakerCount ? speakerCount : 0}</p>
                        <RiMessage3Fill style={{height: "20px", width: "20px"}}/>
                    </span>
                </div>
            </div>
        </>
    )
}
export default ConversationCart