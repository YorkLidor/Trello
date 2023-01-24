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
                    <div className="demo-container">
                        <div className="text-container">
                            <h1>Shmello brings all your  tasks, teammates, and tools together</h1>
                            <p>Keep everything in the same place—even if your team isn’t.</p>
                        </div>

                        <button onClick={onSginup} className="signup-btn">Start Demo</button>
                    </div>

                    <div className="right-hero-container">
                        <img src="https://images.ctfassets.net/rz1oowkt5gyp/75rDABL8fyMtNLlUAtBxrg/c5e145977a86c41c47e17c69410c64f7/TrelloUICollage_4x.png?w=2280&fm=webp" />
                    </div>
                </div>

            </div>

            <div className="secondary-content main-layout">

                <div className="secondary-header-1">
                    <p>SMELLO 101</p>
                    <h2>A productivity powerhouse</h2>
                    <p className="second-p">
                        Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who`s doing what and what needs to get done. Learn more in our guide for getting started.
                    </p>
                </div>

                <div className="secondary-header-2">
                    <div className="cards-container import another">
                        <div className="card-1">
                            <h3>Boards</h3>
                            <p>
                                Shmello boards keep tasks organized and work moving forward. In a glance, see everything from “things to do” to “aww yeah, we did it!”
                            </p>
                        </div>
                        <div className="card-2">
                            <h3>Lists</h3>
                            <p>
                                The different stages of a task. Start as simple as To Do, Doing or Done—or build a workflow custom fit to your team’s needs. There’s no wrong way to Smello.
                            </p>

                        </div>
                        <div className="card-3">
                            <h3>Cards</h3>
                            <p>
                                Cards represent tasks and ideas and hold all the information to get the job done. As you make progress, move cards across lists to show their status.
                            </p>
                        </div>
                    </div>

                    <div className="img-container">
                        <img src="https://images.ctfassets.net/rz1oowkt5gyp/3N2U3C71rApm61cGFxnc2E/970b010002488a09a420282df5e7b43a/Carousel_Image_Boards_2x.png?w=1140&fm=webp" alt="" />
                    </div>
                </div>

            </div>

        </main >
    </>
}