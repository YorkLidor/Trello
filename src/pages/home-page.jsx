
import { MdPlayCircleOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom"

// MdOutlinePlayCircle

export function HomePage() {

    const navigate = useNavigate()

    function onSginup(ev) {
        ev.preventDefault()
        navigate('/workspace')
    }

    return <main className="homepage-container">

        <div className="hero-container">

            <div className="left-hero-container">
                <div>
                    <h1>Shmello brings all your tasks, teammates, and tools together</h1>
                    <p>Keep everything in the same place—even if your team isn’t.</p>
                </div>

                <form onSubmit={onSginup}>
                    {/* <input className="signup-input" type="text" placeholder="Email" /> */}
                    {/* <button className="signup-btn">Sign up - it's free!</button> */}
                    <button className="signup-btn">Start Demo</button>
                </form>


                <div className="watch-video-container">
                    <div>
                        <span>Watch video</span>
                    </div>
                    <MdPlayCircleOutline />
                </div>
            </div>

            <div className="right-hero-container">

                <img src="https://images.ctfassets.net/rz1oowkt5gyp/75rDABL8fyMtNLlUAtBxrg/c5e145977a86c41c47e17c69410c64f7/TrelloUICollage_4x.png?w=2280&fm=webp" />

            </div>

        </div>

    </main >
}