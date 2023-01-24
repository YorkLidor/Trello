import { useNavigate } from "react-router-dom"

export function HomePage() {
    const navigate = useNavigate()

    function onSginup(ev) {
        ev.preventDefault()
        navigate('/workspace')
    }

    return <>
        <main className="homepage-container">

            <div className="background-container">
                <div className="main-layout">
                    <div className="left-hero-container">
                        <div>
                            <h1>Shmello brings all your <br /> tasks, teammates, and tools together</h1>
                            <p>Keep everything in the same place—even if your team <br /> isn’t.</p>
                        </div>

                        <button onClick={onSginup} className="signup-btn">Start Demo</button>
                    </div>

                    <div className="right-hero-container">
                        <img src="https://images.ctfassets.net/rz1oowkt5gyp/75rDABL8fyMtNLlUAtBxrg/c5e145977a86c41c47e17c69410c64f7/TrelloUICollage_4x.png?w=2280&fm=webp" />
                    </div>
                </div>

            </div>

            <div className="secondary-content main-layout">

                <div className="secondary-header">
                    <p>SMELLO 101</p>
                    <h2>A productivity powerhouse</h2>
                    <p className="sss">
                        Simple, flexible, and powerful. All it takes are boards, lists, and <br/> cards to get a clear view of who’s doing what and what needs to <br/> get done. Learn more in our guide for getting started.
                    </p>
                </div>

            </div>

        </main >
    </>
}