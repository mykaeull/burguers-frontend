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
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
        setHasError(true);
    };

    return hasError ? (
        <div className="w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center flex-col text-gray-600 ">
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
