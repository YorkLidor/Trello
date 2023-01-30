import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login } from "../store/actions/user.actions"

const guest = {
    username: 'matanad',
    password: 'matan123'
}
export function HomePage() {
    const navigate = useNavigate()
    const user = useSelector(state => state.userModule.user)

    useEffect(() => {
        console.log(user);
        if (user) navigate('/workspace')
    }, [])

    async function onGuestLogin(ev) {
        ev.preventDefault()
        try {
            const user = await login(guest)
            console.log('user:', user)
            if (user) navigate('/workspace')
        } catch (error) {
            console.error('cant login')
        }
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

                        <button onClick={onGuestLogin} className="signup-btn">Start Demo</button>
                    </div>

                    <div className="right-hero-container">
                        <img src="https://images.ctfassets.net/rz1oowkt5gyp/75rDABL8fyMtNLlUAtBxrg/c5e145977a86c41c47e17c69410c64f7/TrelloUICollage_4x.png?w=2280&fm=webp" />
                    </div>
                </div>

            </div>

            <div className="secondary-content main-layout">

                <div className="secondary-header-1">
                    <p>SHMELLO 101</p>
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
                        <img src="https://images.ctfassets.net/rz1oowkt5gyp/4U0VUZYX2tQmB5KVGxBabp/7321ac088fe8ec39dbe3069c47d7df99/Carousel_Image_Lists_2x.png?w=1140&fm=webp" alt="" />
                    </div>
                </div>

            </div>

        </main >
    </>
}