import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../Firebase/config';


const Register = ({ onClose, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');  
  const [photoURL, setPhotoURL] = useState('');  
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false);  


  const validatePassword = (password) => {
    // Uppercase letter check
    const hasUpperCase = /[A-Z]/.test(password);
    // Lowercase letter 
    const hasLowerCase = /[a-z]/.test(password);
    // Len 6 char
    const hasMinLength = password.length >= 6;
    return { hasUpperCase, hasLowerCase, hasMinLength };  
  };

 
  const handleRegister = async (e) => {
    e.preventDefault(); 
    setLoading(true); 
    setError('');  

    // Password validate 
    const { hasUpperCase, hasLowerCase, hasMinLength } = validatePassword(password);

    //check upper
    if (!hasUpperCase) {
      setError('Password must contain at least one uppercase letter.');
      setLoading(false);
      return; 
    }
    // check lower
    if (!hasLowerCase) {
      setError('Password must contain at least one lowercase letter.');
      setLoading(false);
      return;
    }
    // check len 6
    if (!hasMinLength) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      // create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL || null 
      });
      console.log('User registered successfully'); 
      onClose(); 
    } catch (err) {
    
      setError(err.message);
    }
    setLoading(false); 
  };

  
  const handleGoogleRegister = async () => {
    setLoading(true); 
    setError(''); 
    try {
      await signInWithPopup(auth, googleProvider);
      onClose(); 
    } catch (err) {
      setError(err.message);  
    }
    setLoading(false);
  };

  // Login modal
  const switchToLogin = () => {
    onClose();  
    if (onSwitchToLogin) onSwitchToLogin();  
  };

  return (
    
    <div className="modal modal-open">
      <div className="modal-box max-w-md">  
        <h3 className="font-bold text-lg mb-4">Register for travelEase</h3> 
        {error && <div className="alert alert-error mb-4"><span>{error}</span></div>}
        

        <form onSubmit={handleRegister} className="space-y-4 mb-4">
          {/* Name input */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)} 
            className="input input-bordered w-full"
            required 
          />
          {/* Email input */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
            required
          />
          {/* Photo URL  */}
          <input
            type="url"
            placeholder="Photo URL "
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="input input-bordered w-full"
          />
          {/* Password input */}
          <input
            type="password"
            placeholder="Create password (min 6 chars, 1 uppercase, 1 lowercase)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full"
            required
          />
          {/* Submit button */}
          <button 
            type="submit" 
            disabled={loading} 
            className="btn btn-success w-full"
          >
            {loading ? 'Registering...' : 'Register with Email'}
          </button>
        </form>

   
        <div className="divider text-sm before:bg-gray-300 after:bg-gray-300">OR</div>

        {/* Google button */}
        <button 
          onClick={handleGoogleRegister} 
          disabled={loading}
          className="btn btn-outline w-full"
        >
          {/* Google icon SVG */}
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google  {/* Button text */}
        </button>

        {/* Switch to login  */}
        <div className="text-center mt-4 text-sm">
          <p>Already have an account?</p>
          <button onClick={switchToLogin} className="btn btn-link p-0 text-green-500">Yes, Login Now</button>
        </div>

        {/* Close button */}
        <div className="modal-action mt-6">
          <button className="btn btn-ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};


export default Register;