import { useState } from "react"
import { useNavigate, useParams, useResolvedPath, useRoutes } from "react-router-dom"
import { useForm } from "../customHooks/useForm"
import { userService } from "../services/user.service"
import { login, signup } from "../store/actions/user.actions"
import logo from "../assets/img/smello-no-bg.png"

export function LoginSignup() {
    const [user, setUser, handleChange] = useForm(userService.getEmptyCredentials())
    const [isFilled, setIsFilled] = useState(false)
    const navigate = useNavigate()
    const mode = useResolvedPath().pathname

    async function onLogIn() {
        console.log('user:', user)
        if (!user.username || !user.password) return
        try {
            await login(user)
            navigate('/')
        } catch (err) {
            console.error(err.massage)
        }
    }

    function onSignup() {

    }

    function onSubmit(ev) {
        ev.preventDefault()
        mode.includes('login') ? onLogIn() : onSignup()
    }

    function onContinue(ev) {
        ev.preventDefault()
        if (user.username) setIsFilled(true)
    }

    return <main className="login-page">
        <header className="header">
            <img
                className="logo"
                src={logo}
                alt="logo"
            />
        </header>
        <form
            onSubmit={onSubmit}
            className={`login-form ${isFilled ? 'filled' : ''}`}
        >
            <h1
                className="login-title"
            >
                {mode.includes('login') ? 'Log in' : 'Sign up'} to Shmello
            </h1>
            <input
                className="input-email"
                type="text"
                name="username"
                placeholder="Enter email"
                onChange={handleChange}
            />
            <input
                className="input-password"
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
            />
            <button
                className="btn-continue"
                type="button"
                onClick={onContinue}
            >
                Continue
            </button>
            <button type="submit" className="btn-login">{mode.includes('login') ? 'Log in' : 'Sign up'}</button>
            <hr className="divider" />
            <section className="signup-link">
                <a >{mode.includes('login') ? 'Sign up for an account' : 'Log in to Shmello'}</a>
            </section>
        </form>
        <hr />
    </main>
}