import React from 'react';
import { login } from './services';

import './App.css';

export default function AuthPage() {
  const loginFun = () => {
    login({ username: 'admin', password: 'admin' });
  };
  return (
    <div className="ui middle  aligned center aligned grid">
      <div className="column">
        <h2 className="ui teal image header">
          <div className="content">Log-in to your account</div>
          <p>user: admin & pwd: admin</p>
        </h2>
        <form
          className="ui large form"
          onSubmit={() => {
            loginFun();
          }}
        >
          <div className="ui stacked segment">
            <div className="field">
              <div className="ui left icon input">
                <i className="user icon"></i>
                <input type="text" name="email" placeholder="E-mail address" />
              </div>
            </div>
            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon"></i>
                <input type="password" name="password" placeholder="Password" />
              </div>
            </div>
            <button type="submit" className="ui fluid large teal submit button">
              Login
            </button>
          </div>

          <div className="ui error message"></div>
        </form>
      </div>
    </div>
  );
}
