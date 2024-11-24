import React, { useState } from 'react';
import PublicProfile from './PublicProfile';
import AccountSettings from './AccountSettings';
import Notifications from './Notifications';
import ProAccount from './ProAccount';

const Profile = () => {
    const [activePage, setActivePage] = useState('publicProfile');

    const handleTabChange = (page) => {
        setActivePage(page);
    };

    return (
        <div className="bg-gradient-to-r from-indigo-50 via-indigo-100 to-indigo-200 w-full flex flex-col gap-5 px-4 md:px-16 lg:px-28 md:flex-row text-[#161931]">
            <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
                <div className="sticky flex flex-col gap-4 p-6 text-sm border-r border-indigo-300 top-12 bg-white rounded-lg shadow-lg">
                    <h2 className="pl-3 mb-4 text-2xl font-semibold text-indigo-900">Settings</h2>
                    <button
                        className={`px-4 py-3 font-semibold rounded-full ${activePage === 'publicProfile' ? 'bg-indigo-900 text-white' : 'text-indigo-700 hover:text-indigo-900 hover:border hover:border-indigo-300'}`}
                        onClick={() => handleTabChange('publicProfile')}
                    >
                        Public Profile
                    </button>
                    <button
                        className={`px-4 py-3 font-semibold rounded-full ${activePage === 'accountSettings' ? 'bg-indigo-900 text-white' : 'text-indigo-700 hover:text-indigo-900 hover:border hover:border-indigo-300'}`}
                        onClick={() => handleTabChange('accountSettings')}
                    >
                        Account Settings
                    </button>
                    <button
                        className={`px-4 py-3 font-semibold rounded-full ${activePage === 'notifications' ? 'bg-indigo-900 text-white' : 'text-indigo-700 hover:text-indigo-900 hover:border hover:border-indigo-300'}`}
                        onClick={() => handleTabChange('notifications')}
                    >
                        Notifications
                    </button>
                    <button
                        className={`px-4 py-3 font-semibold rounded-full ${activePage === 'proAccount' ? 'bg-indigo-900 text-white' : 'text-indigo-700 hover:text-indigo-900 hover:border hover:border-indigo-300'}`}
                        onClick={() => handleTabChange('proAccount')}
                    >
                        PRO Account
                    </button>
                </div>
            </aside>
            <main className="w-full min-h-screen py-6 md:w-2/3 lg:w-3/4">
                <div className="p-6 md:p-8 bg-white shadow-lg rounded-lg">
                    {activePage === 'publicProfile' && <PublicProfile />}
                    {activePage === 'accountSettings' && <AccountSettings />}
                    {activePage === 'notifications' && <Notifications />}
                    {activePage === 'proAccount' && <ProAccount />}
                </div>
            </main>
        </div>
    );
};

export default Profile;
