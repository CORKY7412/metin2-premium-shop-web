import { Link, useLocation } from 'react-router-dom';

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

    const tabs: NavigationTab[] = [
        { id: 'home', label: '', path: '/' },
        { id: 'all', label: 'Alle Artikel', path: '/category/all' },
        { id: 'new', label: 'Neue Artikel', path: '/category/new' },
    ];

    const getCurrentTab = () => {
        if (location.pathname === '/') return 'home';
        
        const match = location.pathname.match(/\/category\/(.+)/);
        if (match) return match[1];
        
        return activeTab || 'home';
    };

    const currentTab = getCurrentTab();

    return (
        <nav className="border-b border-solid border-[#E8A314]">
            <div className="h-8">
                {tabs.map((tab) => {
                    console.log(currentTab)
                    const isActive = currentTab === tab.id;
                    const tabClasses = "text-[13px] text-[#f2e69f] pt-1.5 pr-1.5 pb-1.5 pl-1.5 font-normal btn-navitem"
                    const isActiveClasses = "btn-navitem-active";


                    if (tab.id === 'home') {
                        return (
                            <>
                                <Link className="mr-1 shadow-none!" key={tab.id} to={tab.path}>
                                    <a className={`${tabClasses} ${isActive ? isActiveClasses : ''}`}>
                                        <i className="fa-solid fa-house" />
                                    </a>
                                </Link>
                            </>
                        )
                    }

                    return (
                        <>
                            <Link className="mr-1 shadow-none!" key={tab.id} to={tab.path}>
                                <a className={`${tabClasses} ${isActive ? isActiveClasses : ''}`}>{tab.label}</a>
                            </Link>

                        </>
                    );
                })}
            </div>
        </nav>
    );
};