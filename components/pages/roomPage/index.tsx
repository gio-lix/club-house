import s from "./Room.module.scss"
import Button from "../../Button";
import {FaHandSpock} from "react-icons/fa"
import {useRouter} from "next/router";


const RoomPage = () => {
    const router = useRouter()
    const handleClick = () => {
        router.push('/')
    }
    return (
        <div className={s.roomBox}>
            <div >
                <h4>new cons</h4>
                <Button color="gray" onClick={handleClick}  >
                    <FaHandSpock className="mr-10" style={{color:"#d9b501"}}/>
                    <p> live quietly </p>
                </Button>
            </div>
        </div>
    )
}
export default RoomPage