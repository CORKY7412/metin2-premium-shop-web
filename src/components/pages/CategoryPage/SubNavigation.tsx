export const SubNavigation = () => {
    return (
        <ul className="mr-2">
            {/* Highlights Kategorie */}
            <li className="relative group text-[0.846em]">
                <button className="w-26.25 text-[#f2e69f] bg-[#662d12] px-1.5 py-2 text-center hover:bg-[#7d3515] transition-colors">
                    <img
                        className="h-7.5 w-7.5 mx-auto mb-1"
                        src="https://gf3.geo.gfsrv.net/cdn29/23b5f848f1a0b324f6e3c3d3564130.png"
                        alt="Highlights"
                    />
                    Highlights
                </button>

                {/* Dropdown */}
                <ul className="absolute left-full top-0 bg-[#680603] min-w-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <li>
                        <a href="#" className="block px-4 py-2 text-[#f2e69f] hover:text-[#e8a314] transition-colors font-serif text-[1.182em]">
                            Metin+
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 text-[#f2e69f] hover:text-[#e8a314] transition-colors font-serif text-[1.182em]">
                            Reduziert
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 text-[#f2e69f] hover:text-[#e8a314] transition-colors font-serif text-[1.182em]">
                            Offers
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 text-[#f2e69f] hover:text-[#e8a314] transition-colors font-serif text-[1.182em]">
                            Pakete
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 text-[#f2e69f] hover:text-[#e8a314] transition-colors font-serif text-[1.182em]">
                            Gutscheine
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    );
};