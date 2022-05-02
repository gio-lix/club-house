import {FC} from "react";
import s from "./Cart.module.scss"
import {FaUser} from "react-icons/fa"
import {RiMessage3Fill} from "react-icons/ri"
import Avatar from "../avatar";

interface CartState {
    title?: string
    avatars?: string[]
    guests?: string[]
    guestsCount?: number
    speakersCount?: number
}

const ConversationCart: FC<CartState> = ({guestsCount, guests, speakersCount, avatars, title}) => {


    const titleFun = (title: string): string => {
        if (title.length < 20) {
            return  title
        } else {
            return `${title.substring(0, 30)}...`
        }
    }
    return (
        <>
            <div className={s.cartBox}>
                <h3>{ titleFun(title)}</h3>
                <div>
                    <div>
                        {avatars?.length > 1 ? avatars?.map((el, index) => (
                            <div key={index}>
                                <Avatar src={el} width={50} height={50}/>
                            </div>
                        )) : (
                            <div >
                                <Avatar src={avatars && avatars[0]} width={50} height={50}/>
                            </div>
                        )}

                    </div>
                    <span>
                        {guests?.map((el, index) => (
                            <p key={index}>
                                {el}
                            </p>
                        ))}
                    </span>
                </div>
                <div>
                    <span className='d-flex a-i-center '>
                        <p className="mr-10">{guestsCount ? guestsCount : 0}</p>
                        <FaUser/>
                    </span>
                    <span className='d-flex a-i-center ml-25'>
                        <p className="mr-10">{speakersCount ? speakersCount : 0}</p>
                        <RiMessage3Fill style={{height: "20px", width: "20px"}}/>
                    </span>
                </div>
            </div>
        </>
    )
}
export default ConversationCart