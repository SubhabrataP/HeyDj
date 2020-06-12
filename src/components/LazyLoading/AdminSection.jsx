import React, { Suspense } from "react";
const AdminRoutes = React.lazy(() => import("../Admin/AdminRoutes"));

export default function () {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <AdminRoutes />
            </Suspense>
        </>
    );
}