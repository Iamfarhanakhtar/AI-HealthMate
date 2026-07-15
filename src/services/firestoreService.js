import { db } from '../lib/firebase';
import { 
  doc, 
  setDoc, 
  deleteDoc, 
  collection, 
  getDocs,
  serverTimestamp 
} from 'firebase/firestore';

/**
 * Saves a completed quiz attempt to Firestore.
 * If a certificate was generated, saves it to the certificates collection.
 */
export const saveQuizAttempt = async (uid, attempt) => {
  if (!uid || !attempt.id) return;
  
  const attemptRef = doc(db, 'users', uid, 'quizAttempts', attempt.id);
  const dataToSave = {
    ...attempt,
    ownerId: uid,
    createdAt: serverTimestamp()
  };
  
  await setDoc(attemptRef, dataToSave, { merge: true });

  // Requirement: Store certificates in both places
  if (attempt.certificateId) {
    await saveCertificate(uid, {
      id: attempt.certificateId,
      attemptId: attempt.id,
      category: attempt.category,
      percentage: attempt.percentage,
      date: attempt.date
    });
  }
};

/**
 * Saves a certificate to the user's certificates collection.
 */
export const saveCertificate = async (uid, certificate) => {
  if (!uid || !certificate.id) return;
  const certRef = doc(db, 'users', uid, 'certificates', certificate.id);
  await setDoc(certRef, {
    ...certificate,
    ownerId: uid,
    createdAt: serverTimestamp()
  }, { merge: true });
};

/**
 * Saves a bookmark for the user.
 */
export const saveBookmark = async (uid, articleId) => {
  if (!uid || !articleId) return;
  const bookmarkRef = doc(db, 'users', uid, 'bookmarks', articleId);
  await setDoc(bookmarkRef, {
    articleId,
    ownerId: uid,
    createdAt: serverTimestamp()
  }, { merge: true });
};

/**
 * Removes a bookmark for the user.
 */
export const removeBookmark = async (uid, articleId) => {
  if (!uid || !articleId) return;
  const bookmarkRef = doc(db, 'users', uid, 'bookmarks', articleId);
  await deleteDoc(bookmarkRef);
};

/**
 * Saves feedback to the global feedback collection.
 */
export const saveFeedback = async (uid, feedbackData) => {
  if (!uid || !feedbackData.id) return;
  const feedbackRef = doc(db, 'feedback', feedbackData.id);
  await setDoc(feedbackRef, {
    ...feedbackData,
    ownerId: uid,
    createdAt: serverTimestamp()
  }, { merge: true });
};

/**
 * Fetches all of the user's bookmarks from Firestore.
 */
export const getUserBookmarks = async (uid) => {
  if (!uid) return [];
  const bookmarksSnap = await getDocs(collection(db, 'users', uid, 'bookmarks'));
  return bookmarksSnap.docs.map(doc => doc.id);
};

/**
 * Fetches all of the user's quiz history from Firestore.
 */
export const getUserQuizHistory = async (uid) => {
  if (!uid) return [];
  const historySnap = await getDocs(collection(db, 'users', uid, 'quizAttempts'));
  return historySnap.docs.map(doc => doc.data()).sort((a, b) => new Date(b.date) - new Date(a.date));
};
