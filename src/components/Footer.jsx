const Footer = () => (
    <footer style={{backgroundColor:'#050a05', borderTop:'1px solid #1a3a1a'}}>
        <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-green-600 text-sm font-bold tracking-widest">
                <span className="text-green-400">[ POKÉDEX v202601 ]</span>
            </div>
            <p className="text-xs text-green-800 tracking-widest">
                &copy; 2026 // TODOS LOS DERECHOS RESERVADOS
            </p>
        </div>
    </footer>
);

export default Footer;
