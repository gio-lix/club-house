import StepInfo from "../../stepInfo";
import {MdMonochromePhotos} from "react-icons/md"
import WhiteBlogs from "../../whiteBlogs/index"
import s from "./ChooseAvatar.module.scss"
import Button from "../../Button";
import {BsArrowRight} from "react-icons/bs";
import React, {useContext, useEffect, useRef, useState} from "react";
import defaultAvatar from "../../../public/avatart.svg";
import Avatar from "../../avatar";
import {MainContext} from "../../../pages";


const ChooseAvatarStep = () => {
    const {onNextSteps} = useContext(MainContext)
    const [avatarUrl , setAvatarUrl] = useState<string>('')
    const imageRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (imageRef.current) {
            imageRef.current.addEventListener("change", handleChangeImage)
        }
    },[])
    const handleChangeImage = (event: Event) => {
        const file = (event.target as HTMLInputElement).files[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setAvatarUrl(imageUrl)
        }

    }

    return (
        <div>
            <StepInfo
                Icon={MdMonochromePhotos}
                title={"Okay, Mollie andersson"}
                description={"How's Photo?"}
           />
            <WhiteBlogs>
                <div className={s.photoBox}>
                    <div>
                        <Avatar
                            height={60}
                            width={60}
                            src={avatarUrl}
                        />
                    </div>
                    <label htmlFor="image">Choose a different photo</label>
                    <input
                        ref={imageRef}
                        hidden
                        type="file"
                        id="image"
                    />
                    <Button onClick={onNextSteps} color="indigo">
                        next
                        <span className="ml-10 d-flex a-i-center">
                            <BsArrowRight/>
                        </span>
                    </Button>
                </div>
            </WhiteBlogs>
        </div>
    )
}
export default ChooseAvatarStep