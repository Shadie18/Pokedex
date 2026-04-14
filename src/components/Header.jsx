import { useState } from 'react';
import { useNavigate } from 'react-router';

const NAV_LINKS = [
    { label: 'Catálogo', path: "/" },
    { label: 'Mi Colección', path: "/collection" },
    { label: 'Acerca de Nosotros', path: "/about" },
];

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const redirectTo = useNavigate();

    return (
        <header style={{backgroundColor:'#050a05', borderBottom:'1px solid #1a3a1a'}}>
            <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => redirectTo('/')}>
                    <span className="text-green-400 text-xl font-bold">[</span>
                    <h1 className="text-lg font-bold tracking-widest text-green-400 uppercase">
                        POKÉ<span className="text-green-300">DEX</span>
                        <span className="text-green-700 font-normal text-xs ml-2">v202601</span>
                    </h1>
                    <span className="text-green-400 text-xl font-bold">]</span>
                    <span className="animate-pulse text-green-400 text-sm">█</span>
                </div>

                <nav className="hidden md:block">
                    <ul className="flex items-center gap-1">
                        {NAV_LINKS.map(({ label, path }) => (
                            <li key={label}>
                                <button
                                    className="px-4 py-2 text-sm font-bold text-green-600 hover:text-green-400 hover:bg-green-950 transition-colors cursor-pointer tracking-wider uppercase border border-transparent hover:border-green-800"
                                    onClick={() => redirectTo(path)}
                                >
                                    &gt; {label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <button
                    className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 hover:bg-green-950 transition-colors border border-transparent hover:border-green-800"
                    onClick={() => setMenuOpen((prev) => !prev)}
                >
                    <span className="text-green-400 text-xs font-bold">{menuOpen ? '[X]' : '[=]'}</span>
                </button>
            </div>

            <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-60' : 'max-h-0'}`}>
                <nav style={{backgroundColor:'#030703', borderTop:'1px solid #1a3a1a'}} className="px-4 pb-3">
                    <ul className="flex flex-col gap-1 pt-2">
                        {NAV_LINKS.map(({ label, path }) => (
                            <li key={label}>
                                <button
                                    className="w-full text-left px-4 py-2 text-sm font-bold text-green-600 hover:text-green-400 hover:bg-green-950 transition-colors cursor-pointer tracking-wider uppercase"
                                    onClick={() => redirectTo(path)}
                                >
                                    &gt; {label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
