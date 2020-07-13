import React from 'react';

import './App.css';

export default function AuthPage() {
  return (
    <div className="ui middle  aligned center aligned grid">
      <div className="column">
        <h2 className="ui teal image header">
          {/* <img src="assets/images/logo.png" alt="" className="image" /> */}
          <div className="content">Log-in to your account</div>
        </h2>
        <form className="ui large form">
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
            <div className="ui fluid large teal submit button">Login</div>
          </div>

          <div className="ui error message"></div>
        </form>
      </div>
    </div>
  );
}
