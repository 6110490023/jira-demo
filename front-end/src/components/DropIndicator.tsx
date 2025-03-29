import React from "react";

interface DropIndicatorProps {
    beforeId: string | null;
    status: string;
}

const DropIndicator: React.FC<DropIndicatorProps> = ({ beforeId, status }) => {
    return (
        <div
            data-before={beforeId || "-1"}
            data-status={status}
            className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
        >
        </div>
    );
};

export default DropIndicator;
