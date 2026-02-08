import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MobileDrawer } from './MobileDrawer';

interface NavigationTab {
    id: string;
    label: string;
    path: string;
}

interface NavigationProps {
    activeTab?: string;
}

export const Navigation = ({ activeTab = 'all' }: NavigationProps) => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const tabs: NavigationTab[] = [
        { id: 'home', label: 'Home', path: '/' },
        { id: 'all', label: 'Alle Artikel', path: '/category/all' },
        { id: 'new', label: 'Neue Artikel', path: '/category/new' },
        { id: 'hot', label: 'Beliebte Artikel', path: '/category/hot' },
        { id: 'tombola', label: 'Tombola', path: '/tombola' },
    ];

    const getCurrentTab = () => {
        if (location.pathname === '/') return 'home';
        if (location.pathname === '/tombola') return 'tombola';

        const match = location.pathname.match(/\/category\/(.+)/);
        if (match) return match[1];

        return activeTab || 'home';
    };

    const currentTab = getCurrentTab();

    return (
        <>
            <div className="md:hidden border-b border-solid border-[#E8A314]">
                <div className="h-12 flex items-center px-3">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="text-[#f2e69f] hover:text-[#e8a314] transition-colors p-2"
                        aria-label="Menü öffnen"
                    >
                        <i className="fa-solid fa-bars text-2xl"></i>
                    </button>
                    <span className="text-[#f2e69f] ml-3 font-bold">
                        {tabs.find(t => t.id === currentTab)?.label || 'Navigation'}
                    </span>
                </div>
            </div>

            <nav className="hidden md:block border-b border-solid border-[#E8A314]">
                <div className="h-8 sm:h-8 md:h-9 flex items-center min-w-max">
                    {tabs.map((tab) => {
                        const isActive = currentTab === tab.id;
                        const tabClasses = "text-[11px] sm:text-[12px] md:text-[13px] text-[#f2e69f] py-1 px-2 font-normal btn-navitem whitespace-nowrap inline-block"
                        const isActiveClasses = "btn-navitem-active";

                        if (tab.id === 'home') {
                            return (
                                <Link className="mr-1 sm:mr-1.5 shadow-none!" key={tab.id} to={tab.path}>
                                    <div className={`${tabClasses} ${isActive ? isActiveClasses : ''}`}>
                                        <i className="fa-solid fa-house text-sm sm:text-base" />
                                    </div>
                                </Link>
                            )
                        }

                        return (
                            <Link className="mr-1 sm:mr-1.5 shadow-none!" key={tab.id} to={tab.path}>
                                <div className={`${tabClasses} ${isActive ? isActiveClasses : ''}`}>{tab.label}</div>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            <MobileDrawer
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                tabs={tabs}
                currentTab={currentTab}
            />
        </>
    );
};