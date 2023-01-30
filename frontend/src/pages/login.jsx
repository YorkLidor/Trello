import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "../customHooks/useForm"
import { userService } from "../services/user.service"
import { login } from "../store/actions/user.actions"
import logo from "../assets/img/smello-no-bg.png"

export function Login() {
    const [user, setUser, handleChange] = useForm(userService.getEmptyCredentials())
    const [isFilled, setIsFilled] = useState(false)
    const navigate = useNavigate()

    async function onLogIn(ev) {
        ev.preventDefault()
        console.log('user:', user)
        if (!user.username || !user.password) return
        try {
            await login(user)
            navigate('/')
        } catch (err) {
            console.error(err.massage)
        }
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
        <form onSubmit={onLogIn} className={`login-form ${isFilled ? 'filled' : ''}`}>
            <h1 className="login-title">Log in to Shmello</h1>
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
            <button type="submit" className="btn-login">Log in</button>
            <hr className="divider"/>
            <section className="signup-link">
                <a >Sign up for an account</a>
            </section>
        </form>
        <hr />
        <img className="atlassian-img" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/16006ae28f149063408d601e8c80eddc/atlassian-logo-blue-small.svg" alt="atlassian" />
    </main>
}