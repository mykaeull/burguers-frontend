import React from "react";
import "./index.css";

const Skeleton = ({ className }: { className?: string }) => {
    return <div className={`skeleton ${className}`}></div>;
};

export default Skeleton;
