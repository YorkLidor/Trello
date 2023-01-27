export function UserQuickMenu({ user }) {
    console.log(user);

    return <section className="user-quick-menu">
        <header>
            <h2 className="title">Account</h2>
            <section className="user-preview flex">
                <img
                    alt={user.fullname}
                    src={user.imgUrl}
                    className='list-member'
                />
                <h3>{user.fullname}</h3>
                <h4>{user.username}</h4>
            </section>
            <section>Switch account</section>
        </header>
        <footer>
            <button>Log out</button>
        </footer>
    </section>
}