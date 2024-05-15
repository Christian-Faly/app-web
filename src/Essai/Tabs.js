// tabs.js

import React from "react";
import PropTypes from "prop-types";

export const Tab = ({ title }) => (
  <li className="tab-item">{title}</li>
);

export default function Tabs() {
  return (
    <div className="tabs">
      <ul className="tab-list">
        {/* Render a list of Tab component */}
      </ul>

      <div className="tab-content">
        {/* Render the content of a Tab if it's active */}
      </div>
    </div>
  );
}

Tab.propTypes = {
  title: PropTypes.string.isRequired
};