import {FC} from "react";
import Image from "next/image";
import avatarImage from "../../public/avatart.svg"

interface ImageType {
    src?: string,
    isVoice?: any,
    className?: any
    width: number
    height: number
}

const Avatar:FC<ImageType> = ({src, isVoice, className,width,height}) => {
    return (
        <>
            <Image
                src={src ? src : avatarImage.src }
                width={width}
                height={height}
                alt="avatar"
                style={{borderRadius: "100%"}}
            />
        </>
    )
}
export default Avatar