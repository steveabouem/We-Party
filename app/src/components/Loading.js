import React from "react";

export const Loading =({size}) => {
    return (
    <div className={"loader " + size || ""}>
        <span className="material-icons">av_timer</span>
    </div>
    );
}