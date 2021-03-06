import {GetServerSideProps, GetStaticProps, NextPage} from "next";
import Layout from "../components/Layout/Layout";
import Button from "../components/Button";
import {BiPlus} from "react-icons/bi";
import s from "../components/cart/Cart.module.scss"
import clsx from "clsx";
import ConversationCart from "../components/cart";
import Link from "next/link";
import Cookies from "nookies"
import {useEffect, useState} from "react";
import {UserApi} from "../api/UserApi";
import {CheckAuth} from "../helper/checkAuth";



const Rooms:NextPage = ({rooms}: any) => {

    return (
        <Layout>
            <section className="d-flex a-i-center j-c-between">
                <h1>All Conversations</h1>
                <Button color="green" >
                    start room
                    <span className="ml-10 d-flex a-i-center">
                           <BiPlus/>
                    </span>
                </Button>
            </section>
            <div className={clsx(s.grid,'mt-20')}>
                {rooms?.map((r , index)=> (
                    <Link href={`/rooms/${r._id}`} key={r._id}>
                        <a>
                            <ConversationCart
                                title={r.title}
                                guests={r.guests}
                                avatars={r.avatars}
                                guestsCount={r.guestCount}
                                speakersCount={r.speakersCount}
                            />
                        </a>
                    </Link>
                ))}
            </div>
        </Layout>
    )
}
export default Rooms

export const getServerSideProps: GetServerSideProps = async (ctx) => {


    try {
        const user = await CheckAuth(ctx)
        console.log("user-> ", user)
        // const {data} = await Axios.get('/mo.json')
        return {
            props: {rooms: []}
        }
    } catch (err) {
        return {
            props: {rooms: []}
        }

    }


}