import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';

/**
 * Signs the user in anonymously if they aren't already authenticated.
 */
export const signInAnonymousUser = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    return userCredential.user;
  } catch (error) {
    console.error("Firebase Anonymous Auth Error:", error);
    throw error;
  }
};

/**
 * Subscribes to the authentication state.
 * @param {Function} callback - Triggers with the user object or null
 * @returns {Function} Unsubscribe function
 */
export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};
