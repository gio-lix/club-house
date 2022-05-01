import {NextPage} from "next";
import Layout from "../components/Layout/Layout";
import Button from "../components/Button";
import {BiPlus} from "react-icons/bi";
import s from "../components/cart/Cart.module.scss"
import clsx from "clsx";
import ConversationCart from "../components/cart";
import Link from "next/link";

const Rooms:NextPage = () => {
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
                <Link href={"/rooms/demo"}>
                    <a>
                        <ConversationCart
                            title="create conversation"
                            users={[
                                "mollie andersson",
                                "rebecca ander",
                                "hanna banna"
                            ]}
                            avatar={[
                                "https://cdn.pixabay.com/photo/2021/10/14/11/40/sea-6708858__340.jpg",
                                "https://cdn.pixabay.com/photo/2022/02/19/11/16/lake-7022344__340.jpg"
                            ]}
                            guestCount={44}
                            speakerCount={3}
                        />
                    </a>
                </Link>
            </div>
        </Layout>
    )
}
export default Rooms