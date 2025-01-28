import React, { useState } from "react";
import { MdBrokenImage } from "react-icons/md";

const LazyImageComponent = ({
    image,
    altName,
    className,
}: {
    image?: string;
    altName: string;
    className?: string;
}) => {
    const [hasError, setHasError] = useState<boolean>(false);

    const handleError = () => {
        setHasError(true);
    };

    return hasError ? (
        <div
            className={`${className} flex items-center justify-center flex-col bg-gray-200 text-gray-600 `}
        >
            Error
            <MdBrokenImage size={24} />
        </div>
    ) : (
        <img
            src={image}
            alt={altName}
            className={className}
            onError={handleError}
        />
    );
};

export default LazyImageComponent;
