import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const { pathname, search } = useLocation();
    const isActive = (path) => {
        if (path === '/') return pathname === '/';
        return pathname.startsWith(path);
    };

    const baseClass = "text-sm font-medium transition-all relative py-1";
    const activeClass = "text-primary font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full";
    const inactiveClass = "text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-slate-50 dark:hover:bg-white/5 rounded-md px-2";

    return (
        <header className="fixed top-0 left-0 right-0 z-[60] w-full border-b border-slate-200 dark:border-white/10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md glass-nav transition-colors duration-300">
            <div className="flex h-16 items-center justify-between px-4 md:px-10 max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-4">
                    <div className="p-1 bg-primary/15 rounded-lg">
                        <img src="/images/favicon.png" alt="Logo" className="size-8 object-contain" />
                    </div>
                    <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] text-slate-900 dark:text-white font-display">RuangKreasi</h2>
                </div>
                <nav className="hidden md:flex flex-1 justify-center gap-8">
                    <Link className={`${baseClass} ${isActive('/') ? activeClass : inactiveClass}`} to={`/${search}`}>Home</Link>
                    <Link className={`${baseClass} ${isActive('/catalog') ? activeClass : inactiveClass}`} to={`/catalog${search}`}>Catalog</Link>
                    <Link className={`${baseClass} ${isActive('/portfolio') ? activeClass : inactiveClass}`} to={`/portfolio${search}`}>Portfolio</Link>
                    <Link className={`${baseClass} ${isActive('/contact') ? activeClass : inactiveClass}`} to={`/contact${search}`}>Contact</Link>
                </nav>
                <div className="flex items-center gap-4">
                    <button className="hidden sm:flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-400">
                        <span className="material-symbols-outlined text-xl">search</span>
                    </button>
                    <button className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors relative text-slate-600 dark:text-slate-400">
                        <span className="material-symbols-outlined text-xl">shopping_bag</span>
                        <span className="absolute top-2 right-2 size-2 bg-primary rounded-full"></span>
                    </button>
                    <button className="hidden sm:flex cursor-pointer items-center justify-center overflow-hidden rounded-[var(--radius-card)] h-10 px-5 bg-primary hover:bg-primary/90 text-white text-sm font-bold transition-colors shadow-sm shadow-primary/20 nav-cta-btn">
                        <span>Shop Now</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
