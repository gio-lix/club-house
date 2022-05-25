import StepInfo from "../../stepInfo";
import {MdMonochromePhotos} from "react-icons/md"
import WhiteBlogs from "../../whiteBlogs/index"
import s from "./ChooseAvatar.module.scss"
import Button from "../../Button";
import {BsArrowRight} from "react-icons/bs";
import React, {useContext, useEffect, useRef, useState} from "react";
import Avatar from "../../avatar";
import {MainContext} from "../../../pages";
import {Axios} from "../../../core/axios";

const uploadFile = async (file: File): Promise<{url: string}> => {
    const formData = new FormData()
    formData.append("photo", file)
    const {data} = await Axios.post("/upload", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return data
}


const ChooseAvatarStep = () => {
    const {onNextSteps, setFilterMenu, userData} = useContext(MainContext)
    const [avatarUrl , setAvatarUrl] = useState<string>('')
    const imageRef = useRef<HTMLInputElement>(null)
    const nameLetters = userData.fullname.split(" ").map(l => l[0]).join("")



    useEffect(() => {
        if (imageRef.current) {
            imageRef.current.addEventListener("change", handleChangeImage)
        }
    },[])
    const handleChangeImage = async (event: Event) => {
        const target = (event.target as HTMLInputElement)
        const file = target.files[0]
        if (file) {
            // const imageUrl = URL.createObjectURL(file)
            const data = await uploadFile(file)
            setAvatarUrl(data.url)
            target.value = ""
            setFilterMenu("avatarUrl",data.url )
        }

    }



    return (
        <div>
            <StepInfo
                Icon={MdMonochromePhotos}
                title={`"Okay, ${userData?.fullname}`}
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