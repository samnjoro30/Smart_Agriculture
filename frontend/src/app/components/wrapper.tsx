
import React from 'react';

const Wrapper = ({ children } : { children: React.ReactNode }) => {
    return (
        <div className="flex-1 px-6 py-4">
            <div className="bg-green-500 rounded-xl shadow-md p-6 h-full">
                {children}
            </div>
        </div>
    );
};

export default Wrapper;
