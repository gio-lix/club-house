import {useRouter} from "next/router";
import Layout from "../../components/Layout/Layout";
import {IoMdArrowBack} from "react-icons/io"
import s from "../../components/pages/profilePage/ProfilePage.module.scss"
import ProfilePage from "../../components/pages/profilePage/ProfilePage";
import Link from "next/link";

const Profile = () => {
    const {query} = useRouter()
    const {id} = query
    return (
        <Layout>
            <Link href="/rooms">
                <a className={s.sendBack}>
                   <span className='d-flex  a-i-center' >
                        <h3 className='d-flex a-i-center mr-5'>
                            <IoMdArrowBack/>
                        </h3>
                        <h3>Back</h3>
                   </span>
                </a>
            </Link>
            <ProfilePage
                fullName="mollie anderson"
                username="@anderson"
                about="lereme10"
            />

        </Layout>
    )
}
export default Profile