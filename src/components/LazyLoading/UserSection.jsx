import React, { Suspense } from "react";
const UserRoutes = React.lazy(() => import("../Users/UserRoutes"));

export default function () {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <UserRoutes />
            </Suspense>
        </>
    );
}