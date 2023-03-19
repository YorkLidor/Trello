import { useState } from "react"
import logo from "../assets/img/smello-no-bg.png"
import { useForm } from "../customHooks/useForm"
import { userService } from "../services/user.service"

export function Signp() {
    const [userToedit, setUserToEdit, handleChange] = useForm(userService.getEmptyCredentials)
    const [isFilled, setIsFilled] = useState(false)
    
    function onSignUp() {

    }

    return <main className="login-page">
        <header className="header">
            <img
                className="logo"
                src={logo}
                alt="logo"
            />
        </header>
        <form onSubmit={onSignUp} className={`login-form ${isFilled ? 'filled' : ''}`}>
            <h1 className="login-title">Log in to Shmello</h1>
            <input
                className="input-email"
                type="text"
                name="username"
                placeholder="Enter email address"
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
                className="btn-signup"
                type="button"
            >
                Sign up
            </button>
            <button type="submit" className="btn-signup">Log in</button>
            <hr className="divider" />
            <section className="signup-link">
                <a >Already have an account? Log in</a>
            </section>
        </form>
        <hr />
        <img className="atlassian-img" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/16006ae28f149063408d601e8c80eddc/atlassian-logo-blue-small.svg" alt="atlassian" />
    </main>
}