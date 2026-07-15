import { useState, useEffect } from 'react';
import { signInAnonymousUser, subscribeToAuthChanges } from '../services/firebaseAuthService';

export function useFirebaseUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Subscribe to auth changes
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        // 2. If no user is logged in, authenticate anonymously
        signInAnonymousUser().catch((err) => {
          console.error("Failed to sign in anonymously:", err);
          setError(err);
          setLoading(false);
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, loading, error };
}
