import React, { useContext } from 'react'
import { CustomToastContext } from 'context/CustomToastContext';

const types = {
    success: {
        icon: <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
        </svg>,
        title: "Success",
        borderColor: "border-green-500",
        backgroundColor: "bg-green-500",
        textColor: "text-green-500 dark:text-green-400"
    },
    error: {
        icon: <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
        </svg>,
        title: "Error",
        borderColor: "border-red-500",
        backgroundColor: "bg-red-500",
        textColor: "text-red-500 dark:text-red-400"
    },
    warning: {
        icon: <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
        </svg>,
        title: "Warning",
        borderColor: "border-yellow-500",
        backgroundColor: "bg-yellow-500",
        textColor: "text-yellow-500 dark:text-yellow-400"
    },
    info: {
        icon: <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
        </svg>,
        title: "Info",
        borderColor: "border-blue-500",
        backgroundColor: "bg-blue-500",
        textColor: "text-blue-500 dark:text-blue-400"
    }
}

export default function CustomToaster({ show, type, message, timeout = 3000 }) {

    const { setToastConfig } = useContext(CustomToastContext);

    const { icon, title, borderColor, backgroundColor, textColor } = types[type];

    setTimeout(() => {
        setToastConfig({ show: false })
    }, timeout);

    return (
        show ? <div className={`fixed bottom-5
                                sm:fixed sm:bottom-5 sm:right-5
                                w-full flex max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800
                                border ${borderColor}`}>
            <div className={`flex items-center justify-center w-12 ${backgroundColor}`}>
                {icon}
            </div>

            <div className="px-4 py-2 -mx-3">
                <div className="mx-3">
                    <span className={`font-semibold ${textColor}`}>{title}</span>
                    <p className="text-sm text-gray-600 dark:text-gray-200">
                        {message}
                    </p>
                </div>
            </div>
        </div> : <></>
    )
}
