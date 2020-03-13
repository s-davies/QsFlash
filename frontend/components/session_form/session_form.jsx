import React from 'react';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      cls: 'session-modal',
      usernameError: " ",
      emailError: " ",
      passwordError: " ",
      submitDisabled: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  showForm() {
    if (this.state.cls === "session-modal") {
      this.setState({ cls: "session-modal show-modal" })
    } else {
      this.setState({ cls: "session-modal" })
    }
  }

  hideForm(e) {
    if (e.target.className === "session-modal show-modal" || 
    e.target.className === "close-form"){
      this.setState({ cls: "session-modal" })
    }
  }

  handleUsernameChange(e) {
    this.setState({username: e.currentTarget.value}, () => {
      if (this.props.formType === "Sign up") {
        if (this.props.usernames.has(this.state.username)) {
          this.setState({ submitDisabled: true, usernameError: "Username taken" })
        } else if (this.state.emailError === "" && this.state.passwordError === "") {
          this.setState({ submitDisabled: false, usernameError: "" })
        } else {
          this.setState({ usernameError: "" })
        }
      } else {
        if (!this.props.usernames.has(this.state.username)) {
          this.setState({ submitDisabled: true, usernameError: "There is no associated user with this username" })
        } else if (this.state.password.length === 0) {
          this.setState({ usernameError: "" })
        } else {
          this.setState({ submitDisabled: false, usernameError: "" })
        }
      }
      
    })
    
  }

  handleEmailChange(e) {
    this.setState({ email: e.currentTarget.value }, () => {
      if (this.props.emails.has(this.state.email)) {
        this.setState({ submitDisabled: true, emailError: "It looks like this email address has already been registered" })
      } else if (this.state.usernameError === "" && this.state.passwordError === "") {
        this.setState({ submitDisabled: false, emailError: "" })
      } else {
        this.setState({ emailError: "" })
      }
    })
  }

  handlePasswordChange(e) {
    this.setState({ password: e.currentTarget.value }, () => {
      if (this.props.formType === "Sign up") {
        if (this.state.password.length < 6) {
          this.setState({ submitDisabled: true, passwordError: "Password must contain at least 6 characters" })
        } else if (this.state.usernameError === "" && this.state.emailError === "") {
          this.setState({ submitDisabled: false, passwordError: "" })
        } else {
          this.setState({ passwordError: "" })
        }
      } else {
        if (this.state.password.length === 0 || this.state.usernameError.length > 1) {
          this.setState({ submitDisabled: true })
        } else {
          this.setState({ submitDisabled: false })
        }
      }
      
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    let user;
    if (this.props.formType === "Sign up") {
      user = { username: this.state.username, email: this.state.email, password: this.state.password };
    } else {
      user = {username: this.state.username, password: this.state.password}
    }
    this.props.processForm(user);
  }

  renderErrors() {
    return(
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  componentDidMount() {
    this.props.fetchUsers();
    if (this.props.formType === "Log in") {
      this.setState({ username: "DemoUser", password: "DemoUser9999", submitDisabled: false});
    }
  }

  render() {
    // console.log(this.props.usernames)
    // console.log(this.props.emails)
    return (
      <div className="session-form-container">
        <button onClick={this.showForm.bind(this)} className={this.props.formType === "Log in" ? "login-button" : "signup-button"}>{this.props.formType}</button>
        <div onClick={this.hideForm.bind(this)} className={this.state.cls}>
          <form onSubmit={this.handleSubmit} className='session-form-box' spellCheck="false">
            <div className="session-banner">
              <h1 className="form-title">{this.props.formType}</h1>
              <div onClick={this.hideForm.bind(this)} className="close-form">X</div>
            </div>
            <div className="session-form">
              <div className="session-field">
                <input type="text"
                  value={this.state.username}
                  onChange={this.handleUsernameChange.bind(this)}
                  className="session-input"
                  placeholder={this.props.formType === "Log in" ? "Type your username" : "steven123"}
                />
                <label>USERNAME</label>
                <div className="session-errors">{this.state.usernameError}</div>
              </div>
              {this.props.formType === "Sign up" ?
                <div className="session-field">
                  <input type="text"
                      value={this.state.email}
                    onChange={this.handleEmailChange.bind(this)}
                      className="session-input"
                      placeholder="user@qsflash.com"
                    />
                    <label>EMAIL</label>
                    <div className="session-errors">{this.state.emailError}</div>
                </div>
                :
                ''
              }
              <div className="session-field">
                <input type="password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange.bind(this)}
                  className="session-input"
                  placeholder={this.props.formType === "Log in" ? "Type your password" : "Must be 6 or more characters"}
                />
                <label>PASSWORD</label>
                <div className="session-errors">{this.props.formType === "Sign up" ? this.state.passwordError : this.renderErrors()}</div>
              </div>
              <input className="session-submit" type="submit" value={this.props.formType} disabled={this.state.submitDisabled}/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SessionForm;
