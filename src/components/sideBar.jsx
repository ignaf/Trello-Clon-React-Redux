import React, { useState } from "react";

function SideBar(props) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (e) => {
    setIsActive((current) => !current);
  };

  return (
    <div
      className={isActive ? "sidebar sidebar--expanded" : "sidebar"}
      onClick={handleClick}
    >
      <div className="sidebar__arrow">
        <i className="bi bi-chevron-right"></i>
      </div>
      <div style={{ overflow: "hidden" }}>
        <div className="sidebar__workspace">
          <div>
            <span>M</span>
            <h2>Mox It</h2>
          </div>
          <i className="bi bi-chevron-left"></i>
        </div>
        <div className="sidebar__tableros">
          <h2>Sus tableros</h2>
          <div>
            <i className="bi bi-square-fill"></i>
            <h3>Save Pets</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
