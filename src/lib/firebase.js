import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  getIdTokenResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean);

const firebaseApp = isFirebaseConfigured
  ? (getApps().length ? getApp() : initializeApp(firebaseConfig))
  : null;

export const firebaseAuth = firebaseApp ? getAuth(firebaseApp) : null;
export const googleProvider = new GoogleAuthProvider();

export {
  createUserWithEmailAndPassword,
  getIdTokenResult,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
};

export async function getFirebaseUserRole(user) {
  const token = await getIdTokenResult(user);
  return token.claims.admin === true ? 'admin' : 'customer';
}

export function getFirebaseAuthError(error) {
  switch (error?.code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Email or password is incorrect.';
    case 'auth/email-already-in-use':
      return 'An account already exists for this email. Sign in instead.';
    case 'auth/weak-password':
      return 'Choose a password with at least 6 characters.';
    case 'auth/invalid-email':
      return 'Enter a valid email address.';
    case 'auth/popup-blocked':
      return 'Your browser blocked the Google sign-in window. Allow popups and try again.';
    case 'auth/popup-closed-by-user':
      return 'Google sign-in was cancelled.';
    case 'auth/unauthorized-domain':
      return 'This site domain is not authorized for Firebase Authentication.';
    case 'auth/operation-not-allowed':
      return 'This sign-in method is not enabled in Firebase Authentication.';
    case 'auth/network-request-failed':
      return 'Could not connect to Firebase. Check your internet connection and try again.';
    default:
      return error?.message || 'Authentication failed. Please try again.';
  }
}

export function getFirebaseConfigurationError() {
  return 'Authentication is not configured. Add the Firebase web app settings to the deployment environment.';
}
