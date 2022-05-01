import {NextPage} from "next";
import {useRouter} from "next/router";
import Layout from "../../components/Layout/Layout";
import s from "../../components/pages/profilePage/ProfilePage.module.scss"
import Link from "next/link";
import {IoMdArrowBack} from "react-icons/io";
import RoomPage from "../../components/pages/roomPage";

const RoomsId:NextPage = () => {
    const {query} = useRouter()
    const {id} = query
    console.log("id - ", id)


    return (
        <Layout>
            <section>
                <Link href="/rooms">
                    <a className={s.sendBack}>
                   <span className='d-flex  a-i-center' >
                        <h3 className='d-flex a-i-center mr-5'>
                            <IoMdArrowBack/>
                        </h3>
                        <h3>All Rooms</h3>
                   </span>
                    </a>
                </Link>
            </section>
            <RoomPage />
        </Layout>
    )
}
export default RoomsId