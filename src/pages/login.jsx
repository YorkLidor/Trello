import { useState } from "react"
import { useForm } from "../customHooks/useForm"

export function Login() {
    const [user, setUser, handleChange] = useForm({ email: '', password: '' })
    const [isFilled, setIsFilled] = useState(false)

    async function onLogIn() {
        if (user.email && user.password) return
    }

    function onContinue(ev) {
        ev.preventDefault()
        if (user.email) setIsFilled(true)
    }

    return <main className="login-page">
        <header className="header">
            <img
                className="logo"
                src="https://www.linkpicture.com/q/shmello-logo.jpg"
                alt="logo"
            />
        </header>
        <form onSubmit={onLogIn} className={`login-form ${isFilled ? 'filled' : ''}`}>
            <h1 className="login-title">Log in to Shmello</h1>
            <input
                className="input-email"
                type="email"
                name="email"
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
                onClick={onContinue}
                type="button"
            >
                Continue
            </button>
            <button className="btn-Login">Log in</button>
            <section className="signup-link">
                <a >Sign up for an account</a>
            </section>
        </form>
        <hr />
        <img src="" alt="atlassian" />
    </main>
}