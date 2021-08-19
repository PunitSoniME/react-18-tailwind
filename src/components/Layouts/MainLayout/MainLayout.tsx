import React, { Suspense } from 'react'
import Header from './Header'

export default function MainLayout({ children }) {
    return (
        <>
            <Header />

            <Suspense fallback={<div>Loading...</div>}>
                {children}
            </Suspense>

        </>
    )
}
