import React from 'react';
import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const navItems = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  return (
    <BrowserRouter>
      <div className="min-vh-100 app-shell">
        <nav className="navbar navbar-expand-lg navbar-dark app-navbar">
          <div className="container py-1">
            <span className="navbar-brand fw-bold">OctoFit Tracker</span>
            <div className="navbar-nav gap-1 ms-auto">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `nav-link rounded-pill px-3 ${isActive ? 'active fw-semibold text-dark bg-warning' : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        <header className="container pt-4 pb-2">
          <div className="card border-0 shadow-sm app-hero">
            <div className="card-body p-4 d-flex flex-wrap align-items-center justify-content-between gap-3">
              <div>
                <h1 className="h3 mb-1">Fitness Dashboard</h1>
                <p className="mb-0 text-secondary">
                  Track users, teams, activities, leaderboard scores, and workouts in one place.
                </p>
              </div>
              <a className="btn btn-outline-light" href="/api" target="_blank" rel="noreferrer">
                Open API Root
              </a>
            </div>
          </div>
        </header>

        <main className="pb-4">
          <Routes>
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
