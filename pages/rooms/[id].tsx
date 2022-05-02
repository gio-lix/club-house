import {NextPage} from "next";
import {useRouter} from "next/router";
import Layout from "../../components/Layout/Layout";
import s from "../../components/pages/profilePage/ProfilePage.module.scss"
import Link from "next/link";
import {IoMdArrowBack} from "react-icons/io";
import RoomPage from "../../components/pages/roomPage";
import Axios from "../../core/axios";

const RoomsId:NextPage = ({room}:any) => {


    console.log("room - ", room)

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
            <RoomPage
                title={room.title}
            />
        </Layout>
    )
}
export default RoomsId

export const getServerSideProps = async ({params}) => {
    const {data} = await Axios.get('/mo.json')
    const filterData = data?.filter(el => el._id === params.id)

    return {
        props: {room:filterData[0] }
    }
}