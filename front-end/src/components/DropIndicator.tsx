import React from "react";

interface DropIndicatorProps {
    beforeId: string | null;
    column: string;
}

const DropIndicator: React.FC<DropIndicatorProps> = ({ beforeId, column }) => {
    console.log(beforeId);
    
    return (
        <div
            data-before={beforeId || "-1"}
            data-column={column}
            className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
        >
        </div>
    );
};

export default DropIndicator;
