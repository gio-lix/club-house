import s from "./ProfilePage.module.scss"
import userAvatar  from "../../../public/avatart.svg"
import Image from "next/image";
import Avatar from "../../avatar";
import Button from "../../Button";
import {FC} from "react";

interface ProfileState {
    fullName: string
    username: string
    avatar?: string
    about?: string
}

const ProfilePage:FC<ProfileState> = ({fullName,username,avatar,about}) => {
    return (
        <div>
            <section className={s.mainBox}>
                <div>
                    <Avatar src={avatar ? avatar : userAvatar.src} width={80} height={80} />
                </div>
                <main>
                <span>
                    <span>
                        <h4>{fullName}</h4>
                        <p>{username}</p>
                    </span>
                    <button>
                        Follow
                    </button>
                </span>
                    <span>
                    <div>
                        <p>
                            <span>2</span>
                            following
                        </p>
                    </div>
                    <div>
                        <p>
                            <span>2</span>
                            following
                        </p>
                    </div>
                </span>
                </main>
            </section>
            <section className={s.userInfo}>
                <p>
                    {about}
                </p>
            </section>
        </div>
    )
}
export default ProfilePage