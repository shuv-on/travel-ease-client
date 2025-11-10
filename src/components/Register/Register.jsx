import React, { useState } from 'react';

const Register = ({ onClose, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasMinLength = password.length >= 6;
    return { hasUpperCase, hasLowerCase, hasMinLength };
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { hasUpperCase, hasLowerCase, hasMinLength } = validatePassword(password);

    if (!hasUpperCase) {
      setError('Password must contain at least one uppercase letter.');
      setLoading(false);
      return;
    }
    if (!hasLowerCase) {
      setError('Password must contain at least one lowercase letter.');
      setLoading(false);
      return;
    }
    if (!hasMinLength) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    console.log('Register Attempt:', { name, email, photoURL, password });
    setLoading(false);
    onClose();
  };

  const switchToLogin = () => {
    onClose();
    if (onSwitchToLogin) onSwitchToLogin();
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-md">
        <h3 className="font-bold text-lg mb-4">Register for travelEase</h3>
        {error && <div className="alert alert-error mb-4"><span>{error}</span></div>}
        
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
            required
          />
          <input
            type="url"
            placeholder="Photo URL (optional)"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="input input-bordered w-full"
          />
          <input
            type="password"
            placeholder="Create password (min 6 chars, 1 uppercase, 1 lowercase)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full"
            required
          />
          <button 
            type="submit" 
            disabled={loading} 
            className="btn btn-success w-full"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          <p>Already have an account?</p>
          <button onClick={switchToLogin} className="btn btn-link p-0 text-green-500">Yes, Login Now</button>
        </div>

        <div className="modal-action mt-6">
          <button className="btn btn-ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Register;