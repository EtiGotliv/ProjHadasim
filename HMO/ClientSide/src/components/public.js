import { Link } from "react-router-dom";

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">HMO members website</span></h1>
            </header>
            <main className="public__main">
                
            </main>
            <footer>
                <Link to="/login">To all Members</Link>
            </footer>
        </section>

    )
    return content
}
export default Public