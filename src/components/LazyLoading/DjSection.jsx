import React, { Suspense } from "react";
const DjRoutes = React.lazy(() => import("../DJs/DjRoutes"));

export default function () {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <DjRoutes />
            </Suspense>
        </>
    );
}