// src/Components/SignIn.js
import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../Styles/SignIn.css'; // optional CSS

function SignIn() {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account' // force Google account chooser every time
      });

      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;

      if (email.endsWith('@nie.ac.in')) {
        // allowed → navigate
        navigate('/welcome');
      } else {
        // not allowed → sign out and alert
        await signOut(auth);
        alert('Please sign in with your college email (@nie.ac.in)');
      }
    } catch (error) {
      console.error('Error during sign in:', error);
      alert('Failed to sign in. Please try again.');
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-box">
        <h2>ISE Study Hub</h2>
        <p className="signin-subtitle">Login with NIE college email ID</p>
        <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      </div>
    </div>
  );
}

export default SignIn;
