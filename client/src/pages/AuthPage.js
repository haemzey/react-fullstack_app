import { useState } from 'react';

function AuthPage({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const user = {
      name: form.get('name') || 'Guest User',
      email: form.get('email')
    };

    onLogin(user);
  };

  return (
    <section className="page-shell auth-shell">
      <div className="auth-panel">
        <div className="auth-tabs">
          <button className={isLogin ? 'auth-tab active' : 'auth-tab'} onClick={() => setIsLogin(true)}>
            Login
          </button>
          <button className={!isLogin ? 'auth-tab active' : 'auth-tab'} onClick={() => setIsLogin(false)}>
            Sign Up
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <label>
              Full Name
              <input type="text" name="name" placeholder="Your name" />
            </label>
          )}

          <label>
            Email
            <input type="email" name="email" placeholder="you@example.com" required />
          </label>

          <label>
            Password
            <input type="password" name="password" placeholder="Password" required />
          </label>

          <button className="btn btn-primary full" type="submit">
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AuthPage;
