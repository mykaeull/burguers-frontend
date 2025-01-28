import React, { lazy, Suspense, useEffect, useState } from "react";
import Skeleton from "../Skeleton";

const LazyImageComponent = lazy(() => import("./LazyImageComponent"));

const LazyImage = ({
    image,
    altName,
    className,
}: {
    image?: string;
    altName: string;
    className?: string;
}) => {
    // SIMULAR ANIMAÇÃO DE CARREGAMENTO SKELETON
    // const [shouldRender, setShouldRender] = useState(false);

    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         setShouldRender(true);
    //     }, 2000);

    //     return () => clearTimeout(timeout);
    // }, []);

    // if (!shouldRender) {
    //     return <Skeleton className={className} />;
    // }

    return (
        <Suspense fallback={<Skeleton className={className} />}>
            <LazyImageComponent
                image={image}
                altName={altName}
                className={className}
            />
        </Suspense>
    );
};

export default LazyImage;
