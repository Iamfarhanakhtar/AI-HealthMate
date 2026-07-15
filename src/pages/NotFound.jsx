import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/UI/Container';

function NotFound() {
  return (
    <Container className="py-20 text-center flex flex-col items-center gap-4">
      <span className="material-symbols-outlined text-primary text-6xl" aria-hidden="true">
        error
      </span>
      <h1 className="font-display-lg text-3xl font-bold text-secondary">
        404 - Page Not Found
      </h1>
      <p className="text-body-sm text-on-surface-variant max-w-sm mt-1 leading-normal">
        The healthcare awareness route you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 rounded-lg bg-primary text-on-primary text-xs font-semibold shadow-lg hover:scale-105 transition-all"
      >
        Return to Home
      </Link>
    </Container>
  );
}

export default NotFound;
