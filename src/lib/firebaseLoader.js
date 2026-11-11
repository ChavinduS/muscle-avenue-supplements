let firebaseModule;

export function loadFirebase() {
  if (!firebaseModule) {
    firebaseModule = import('./firebase.js');
  }
  return firebaseModule;
}
