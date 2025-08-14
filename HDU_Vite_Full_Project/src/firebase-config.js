// Firebase configuration and exports
// This file provides a centralized location for Firebase services

// Import all Firebase services from the firebase directory
export { auth, db, storage, functions, default as app } from './firebase/firebaseConfig';

// You can also add any Firebase-related utility functions here
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

// Helper function to check if user is authenticated
export const isAuthenticated = () => {
  return auth.currentUser !== null;
};

// Helper function to get user ID
export const getUserId = () => {
  return auth.currentUser?.uid || null;
};

// Helper function to get user email
export const getUserEmail = () => {
  return auth.currentUser?.email || null;
};

// Helper function to sign out
export const signOut = () => {
  return auth.signOut();
};

export default {
  auth,
  db,
  storage,
  functions,
  getCurrentUser,
  isAuthenticated,
  getUserId,
  getUserEmail,
  signOut
};
