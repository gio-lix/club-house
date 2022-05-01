import clsx from "clsx";
import s from "./Layout.module.scss"
import {FaHandSpock} from "react-icons/fa";
import userAvatar from "../../public/avatart.svg"
import Image from "next/image";
import Link from "next/link";

const Layout = ({children}) => {
    return (
        <div className={s.container}>
            <div className={clsx(s.layoutBox)}>
                <span className="d-flex a-i-center ">
                   <FaHandSpock className={s.handeWave} style={{color:" #E8A317"}}/>
                   <h3 className='ml-10'>Clubhouse</h3>
                </span>
                <span className='d-flex a-i-center'>
                    <h4 className='mr-10'>mollie anderson</h4>
                    <Link href="/profile/2">
                        <a>
                            <Image src={userAvatar} width={30} height={30} alt="user"/>
                        </a>
                    </Link>
                </span>
            </div>
            <div >
                {children}
            </div>
        </div>
    )
}
export default Layout