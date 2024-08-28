import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getDatabase, ref, update } from 'firebase/database';
import '../LoginAndSigninPage/LoginAndSigninPage.css';

export const PassKeyPage = () => {
  const [email, setEmail] = useState('');
  const [passkey, setPasskey] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId; // Get the user ID passed from the signup process

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!userId) {
      alert("User ID is missing. Please sign up first.");
      return;
    }

    const database = getDatabase();
    const userRef = ref(database, 'users/' + userId);

    // Save the passkey in Firebase
    update(userRef, {
      passkey: passkey,
      email: email
    })
      .then(() => {
        alert('Passkey saved successfully! Your signup is complete.');
        navigate('/login'); // Redirect to the login page after saving the passkey
      })
      .catch(error => {
        console.error('Error saving passkey:', error);
        alert('Failed to save passkey. Please try again.');
      });
  };

  return (
    <div className='cont'>
      <div className="img">
        <div className="img__text right_con">
          <h3>Seems you didn't enter the passKey</h3>
          <div className='down_box m--up'>
            <h6>Note: Nobody can see the passkey except you</h6>
            <h6>We use special methods to ensure your safety and privacy</h6>
          </div>
        </div>
      </div>
      <div className="form sign-in passkey">
        <h2>Welcome Back!</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            <span>PassKey</span>
            <input
              type="number"
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};
