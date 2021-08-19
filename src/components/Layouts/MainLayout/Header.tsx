import routes from 'helpers/routes'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <div className="flex gap-3 p-3 bg-blue-500">
            <Link to={routes.home.path}
                className="p-2 bg-blue-500 border border-blue-300 text-white rounded hover:bg-blue-700 focus:bg-blue-700"
            >
                Home
            </Link>

            <Link to={routes.profile.path}
                className="p-2 bg-blue-500 border border-blue-300 text-white rounded hover:bg-blue-700 focus:bg-blue-700"
            >
                Profile
            </Link>
        </div>
    )
}
