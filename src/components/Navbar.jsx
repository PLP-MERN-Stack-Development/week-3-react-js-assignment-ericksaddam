import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 shadow-xl rounded-b-xl px-8 py-3 flex items-center justify-between">
      <span className="text-3xl font-extrabold tracking-tight text-white drop-shadow-lg mr-8">Task Manager</span>
      <div className="flex items-center gap-6">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `custom-nav-button ${isActive ? 'custom-active' : ''}`}
        >
          Home
        </NavLink>
        <NavLink
          to="/api-demo"
          className={({ isActive }) => `custom-nav-button ${isActive ? 'custom-active' : ''}`}
        >
          API Demo
        </NavLink>

      </div>
    </nav>
  );
}
