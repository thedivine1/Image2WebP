import { useState, useEffect } from 'react';
import { auth, googleProvider, facebookProvider, twitterProvider } from './firebaseConfig';
import { signInWithPopup, signOut } from "firebase/auth";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [user, setUser] = useState(null);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
      });
  };

  const handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.error("Error signing in with Facebook:", error);
      });
  };

  const handleTwitterSignIn = () => {
    signInWithPopup(auth, twitterProvider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.error("Error signing in with Twitter:", error);
      });
  };

  const handleAppleSignIn = () => {
    // Apple Sign-In implementation (requires backend)
    alert("Apple Sign-In requires a backend implementation.");
  };

  const handleInstagramSignIn = () => {
    // Instagram Sign-In implementation (requires backend)
    alert("Instagram Sign-In requires a backend implementation.");
  };

  const handlePinterestSignIn = () => {
    // Pinterest Sign-In implementation (requires backend)
    alert("Pinterest Sign-In requires a backend implementation.");
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My App</h1>
      <button
        onClick={handleThemeSwitch}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Switch to {theme === 'dark' ? 'Light' : 'Dark'} Theme
      </button>

      {user ? (
        <div className="mt-4">
          <img src={user.photoURL} alt="Profile" className="rounded-full w-16 h-16" />
          <p>Welcome, {user.displayName}!</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Sign In with Google
          </button>
          <button
            onClick={handleFacebookSignIn}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Sign In with Facebook
          </button>
          <button
            onClick={handleTwitterSignIn}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Sign In with Twitter
          </button>
          <button
            onClick={handleAppleSignIn}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Sign In with Apple
          </button>
          <button
            onClick={handleInstagramSignIn}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Sign In with Instagram
          </button>
          <button
            onClick={handlePinterestSignIn}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Sign In with Pinterest
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
