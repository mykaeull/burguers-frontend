import React, { lazy, Suspense } from "react";
import LoadingSpinner from "../LoadingSpinner";

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
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <LazyImageComponent
                image={image}
                altName={altName}
                className={className}
            />
        </Suspense>
    );
};

export default LazyImage;
