import s from "./Room.module.scss"
import Button from "../../Button";
import {FaHandSpock} from "react-icons/fa"
import {useRouter} from "next/router";
import Link from "next/link";
import {FC} from "react";

interface RoomsState {
    title: string
}


const RoomPage:FC<RoomsState> = ({title}) => {

    return (
        <div className={s.roomBox}>
            <div >
                <h2>{title}</h2>
               <Link href="/rooms">
                   <a>
                       <Button color="gray" >
                           <FaHandSpock className="mr-10" style={{color:"#d9b501"}}/>
                           <p> live quietly </p>
                       </Button>
                   </a>
               </Link>
            </div>
        </div>
    )
}
export default RoomPage