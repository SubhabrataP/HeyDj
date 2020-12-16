import React, { Suspense } from "react";
const NightClubRoutes = React.lazy(() => import("../Nightclubs/NightclubRoutes"));

export default function () {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <NightClubRoutes />
            </Suspense>
        </>
    );
}