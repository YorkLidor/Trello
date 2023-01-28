import { useNavigate } from "react-router-dom"

import { logout } from "../store/actions/user.actions"

export function UserQuickMenu({ user }) {
    const navigate = useNavigate()

    async function onLogout() {
        try {
            await logout()
            navigate('/')
        } catch (error) {

        }
    }

    return <section className="user-quick-menu main-layout">
        <header className="header">
            <h2 className="title">Account</h2>
            <section className="user-preview flex">
                <img
                    alt={user.fullname}
                    src={user.imgUrl}
                    className='list-member'
                />
                <section className="user-details">
                    <h3>{user.fullname}</h3>
                    <h4>{user.email}</h4>
                </section>
            </section>
            <ul className="header-action-list clean-list">
                <li>
                    <button
                        className="btn-switch-account full"
                    >
                        Switch accounts
                    </button>
                </li>
            </ul>
        </header>
        <hr className="divider" />
        <footer className="footer-container full">
            <ul className="footer-action-list clean-list">
                <li>
                    <button
                        onClick={onLogout}
                        className="btn-logout"
                    >
                        Log out
                    </button>
                </li>
            </ul>
        </footer>
    </section>
}