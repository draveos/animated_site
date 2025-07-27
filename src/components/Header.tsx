import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="absolute top-0 inset-x-0 z-50 flex justify-between px-8 py-4 backdrop-blur-md bg-white/10">
            <Link to="/" className="font-semibold tracking-wider text-white">EotW Demo</Link>
            <nav className="space-x-4 text-white">
                <Link to="/">Intro</Link>
                <Link to="/Cave">Cave</Link>
                <Link to="/Ruins">Ruins</Link>
            </nav>
        </header>
    );
}
