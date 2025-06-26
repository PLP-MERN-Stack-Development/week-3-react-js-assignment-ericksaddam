import React from 'react';
import PropTypes from 'prop-types';

export default function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`bg-white text-gray-900 rounded-lg shadow border border-gray-200 p-6 transition-colors duration-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
