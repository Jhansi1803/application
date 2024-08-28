import React, { useState } from 'react';
import './LoginAndSigninPage.css';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDatabase, ref, set, get } from 'firebase/database';
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyDA3XWVzxkDBdsN1FT9mrwXw4Qon-IrC1Q",
  authDomain: "project-1c4cf.firebaseapp.com",
  databaseURL: "https://project-1c4cf-default-rtdb.firebaseio.com",
  projectId: "project-1c4cf",
  storageBucket: "project-1c4cf.appspot.com",
  messagingSenderId: "920999943280",
  appId: "1:920999943280:web:31ff27ceaa6e6e44cca8b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app); 

export const LoginAndSigninPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  function handleClick() {
    setIsSignup(!isSignup);
    document.querySelector('.cont').classList.toggle('s--signup');
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isSignup) {
      // Sign up logic
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          // Save user details in Firebase with a placeholder for passkey
          set(ref(database, 'users/' + user.uid), {
            name: name,
            email: email,
            passkey: '' // Placeholder for passkey
          }).then(() => {
            alert("Sign up successful, please enter your passkey");
            navigate('/passkey', { state: { userId: user.uid } }); // Redirect to passkey page with user ID
          });
        })
        .catch(error => {
          console.error('Error during sign up:', error);
          alert(error.message);
        });
    } else {
      // Login logic
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          // Firebase handles the ID token securely. We use it directly.
          user.getIdToken().then((idToken) => {
            console.log('ID Token:', idToken); // Use the ID token for authorized requests

            // Verify passkey
            get(ref(database, 'users/' + user.uid)).then((snapshot) => {
              if (snapshot.exists()) {
                const userData = snapshot.val();
                if (userData.passkey) {
                  alert("Logged in successfully");
                  navigate('/dashboard'); // Redirect to dashboard
                } else {
                  alert("Passkey not found. Please complete signup by entering your passkey.");
                  signOut(auth); // Sign the user out if passkey is missing
                }
              } else {
                alert("User not found. Please sign up first.");
                signOut(auth);
              }
            });
          }).catch((error) => {
            console.error('Error fetching ID token:', error);
          });
        })
        .catch(error => {
          console.error('Error during login:', error);
          alert(error.message);
        });
    }
  };

  return (
    <div className="cont">
      <div className="form sign-in">
        <h2>Welcome</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            <span>Password</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <p className="forgot-pass">Forgot password?</p>
          <button type="submit" className="submit">Log In</button>
        </form>
      </div>
      <div className="sub-cont">
        <div className="img">
          <div className="img__text m--up">
            <h3>Don't have an account? Please Sign up!</h3>
          </div>
          <div className="img__text m--in">
            <h3>If you already have an account, just sign in.</h3>
          </div>
          <div className="img__btn" onClick={handleClick}>
            <span className="m--up">Sign Up</span>
            <span className="m--in">Log In</span>
          </div>
        </div>
        <div className="form sign-up">
          <h2>Create your Account</h2>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Name</span>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
              <span>Email</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
              <span>Password</span>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <button type="submit" className="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};
