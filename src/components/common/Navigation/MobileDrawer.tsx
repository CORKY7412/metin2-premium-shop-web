import { Link } from 'react-router-dom';
import { useEffect } from 'react';

interface NavigationTab {
    id: string;
    label: string;
    path: string;
}

interface MobileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    tabs: NavigationTab[];
    currentTab: string;
}

export const MobileDrawer = ({ isOpen, onClose, tabs, currentTab }: MobileDrawerProps) => {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            <div
                className={`fixed top-0 left-0 h-full w-64 bg-[#662d12] border-r-2 border-[#E8A314] z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex items-center justify-between p-4 border-b border-[#E8A314]">
                    <h2 className="text-[#f2e69f] font-bold text-lg">Navigation</h2>
                    <button
                        onClick={onClose}
                        className="text-[#f2e69f] hover:text-[#e8a314] transition-colors p-2"
                        aria-label="Menü schließen"
                    >
                        <i className="fa-solid fa-xmark text-2xl"></i>
                    </button>
                </div>

                <nav className="py-4">
                    {tabs.map((tab) => {
                        const isActive = currentTab === tab.id;

                        const getIcon = (tabId: string) => {
                            switch (tabId) {
                                case 'home':
                                    return 'fa-house';
                                case 'all':
                                    return 'fa-bag-shopping';
                                case 'new':
                                    return 'fa-sparkles';
                                case 'hot':
                                    return 'fa-fire';
                                case 'tombola':
                                    return 'fa-dice';
                                default:
                                    return 'fa-circle';
                            }
                        };

                        return (
                            <Link
                                key={tab.id}
                                to={tab.path}
                                onClick={onClose}
                                className={`flex items-center px-6 py-3 transition-all duration-200 ${isActive
                                        ? 'bg-[#e8a314] text-[#3c1e16] border-l-4 border-[#f2e69f] font-bold'
                                        : 'text-[#f2e69f] hover:bg-[rgba(232,163,20,0.2)] border-l-4 border-transparent'
                                    }`}
                            >
                                <i className={`fa-solid ${getIcon(tab.id)} text-lg mr-3 min-w-5`}></i>
                                <span className="font-medium">{tab.label}</span>
                                {isActive && (
                                    <i className="fa-solid fa-check ml-auto text-sm"></i>
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </>
    );
};
