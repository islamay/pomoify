import logo from "@/assets/logo.svg";

function Navbar() {
    return (
        <nav className="flex justify-between border-b px-8 py-4 max-w-lg lg:px-0 lg:mx-auto">
            <a href="/">
                <img src={logo} />
            </a>
        </nav>
    );
}

export { Navbar };
