import React, { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, User, Mail, Lock, ArrowRight } from 'lucide-react';
import { loadFirebase } from '../lib/firebaseLoader';

export default function AuthModal() {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    setUser, 
    navigateToTab, 
    theme,
    authRole,
    setAuthRole
  } = useStore();

  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [role, setRole] = useState(authRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const isDark = theme === 'dark';

  useEffect(() => {
    if (isAuthModalOpen) {
      setRole(authRole);
      setMode('login');
      setErrorMessage('');
    }
  }, [authRole, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const finishSignIn = async (firebaseUser, firebase) => {
    const userRole = await firebase.getFirebaseUserRole(firebaseUser);
    if (role === 'admin' && userRole !== 'admin') {
      await firebase.signOut(firebase.firebaseAuth);
      setErrorMessage('This account does not have administrator access.');
      return;
    }

    setUser({
      name: firebaseUser.displayName || firebaseUser.email || 'Customer Athlete',
      email: firebaseUser.email || '',
      phone: firebaseUser.phoneNumber || (mode === 'register' ? phone : ''),
      role: userRole,
      isLoggedIn: true,
      firebaseUid: firebaseUser.uid,
      firebaseAuthenticated: true
    });
    setIsAuthModalOpen(false);
    setPassword('');
    setErrorMessage('');
    if (userRole === 'admin') navigateToTab('admin');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const firebase = await loadFirebase();
      if (!firebase.firebaseAuth) {
        setErrorMessage(firebase.getFirebaseConfigurationError());
        return;
      }

      if (mode === 'register') {
        if (role !== 'customer') {
          setErrorMessage('Only customer accounts can be created here.');
          return;
        }
        const credential = await firebase.createUserWithEmailAndPassword(firebase.firebaseAuth, email.trim(), password);
        await firebase.updateProfile(credential.user, { displayName: name.trim() });
        await finishSignIn(credential.user, firebase);
      } else {
        const credential = await firebase.signInWithEmailAndPassword(firebase.firebaseAuth, email.trim(), password);
        await finishSignIn(credential.user, firebase);
      }
    } catch (error) {
      const firebase = await loadFirebase();
      setErrorMessage(firebase.getFirebaseAuthError(error));
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const firebase = await loadFirebase();
      if (!firebase.firebaseAuth) {
        setErrorMessage(firebase.getFirebaseConfigurationError());
        return;
      }
      const credential = await firebase.signInWithPopup(firebase.firebaseAuth, firebase.googleProvider);
      await finishSignIn(credential.user, firebase);
    } catch (error) {
      const firebase = await loadFirebase();
      setErrorMessage(firebase.getFirebaseAuthError(error));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className={`relative w-full max-w-md rounded-3xl border overflow-hidden shadow-2xl my-6 transition-colors ${
          isDark 
            ? 'bg-slate-900 border-slate-700 text-slate-100' 
            : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between bg-gradient-to-r from-sky-500/10 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-500 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-black text-lg text-slate-900 dark:text-white">
                {role === 'admin' ? 'Admin Sign In' : mode === 'login' ? 'Account Login' : 'Create Customer Account'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Muscle Avenue Supplements Portal
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-sky-500 hover:text-slate-950 flex items-center justify-center transition-colors text-slate-600 dark:text-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          {/* Registration Fields */}
          {mode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kasun Fernando"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 077XXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-sky-500"
                />
              </div>
            </>
          )}

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="e.g. yourname@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-sky-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              minLength={mode === 'register' ? 6 : undefined}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-sky-500"
            />
          </div>

          {errorMessage && (
            <p role="alert" className="text-xs font-bold text-red-600 dark:text-red-400">
              {errorMessage}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-display font-black text-xs uppercase tracking-wider bg-sky-500 hover:bg-sky-600 text-slate-950 shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <span>{mode === 'login' ? `Sign in${role === 'admin' ? ' as admin' : ''}` : 'Create Customer Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {role === 'customer' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
                <span>or</span>
                <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
              </div>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <span className="font-display font-black text-base text-blue-600" aria-hidden="true">G</span>
                Continue with Google
              </button>
            </div>
          )}

          {role === 'customer' && (
            <p className="text-center text-xs text-slate-600 dark:text-slate-400">
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === 'login' ? 'register' : 'login');
                  setRole('customer');
                  setAuthRole('customer');
                  setErrorMessage('');
                }}
                className="font-bold text-sky-600 dark:text-sky-400 hover:underline"
              >
                {mode === 'login' ? 'Create customer account' : 'Sign in'}
              </button>
            </p>
          )}

        </form>
      </div>
    </div>
  );
}
