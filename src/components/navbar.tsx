import logo from "@/assets/logo.svg";

function Navbar() {
    return (
        <nav className="flex justify-between border-b py-4 max-w-xl px-8 min-[36rem]:px-0 mx-auto sm">
            <a href="/">
                <img src={logo} />
            </a>
        </nav>
    );
}

export { Navbar };
