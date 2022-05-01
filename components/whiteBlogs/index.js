import s from "./WhiteBlogs.module.scss"

export default function WhiteBlogs({children}) {
    return (
        <>
            <div className={s.container}>
                {children}
            </div>
        </>
    )
}