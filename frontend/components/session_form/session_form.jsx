import React from 'react';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      cls: 'session-modal'
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

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.formType === "Sign up") {
      const user = { username: this.state.username, email: this.state.email, password: this.state.password };
    } else {
      const user = {username: this.state.username, password: this.state.password}
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

  render() {
    return (
      <div className="session-form-container">
        <button onClick={this.showForm.bind(this)} className={this.props.formType === "Log in" ? "login-button" : "signup-button"}>{this.props.formType}</button>
        <div onClick={this.hideForm.bind(this)} className={this.state.cls}>
          <form onSubmit={this.handleSubmit} className='session-form-box' spellCheck="false">
            <div className="session-banner">
              <h1 className="form-title">{this.props.formType}</h1>
              <div onClick={this.hideForm.bind(this)} className="close-form">X</div>
            </div>
            {this.renderErrors()}
            <div className="session-form">
              <div className="session-field">
                <input type="text"
                  value={this.state.username}
                  onChange={this.update('username')}
                  className="session-input"
                  placeholder={this.props.formType === "Log in" ? "Type your username" : "steven123"}
                />
                <label>USERNAME</label>
              </div>
              {this.props.formType === "Sign up" ?
                <div className="session-field">
                  <input type="text"
                      value={this.state.username}
                      onChange={this.update('email')}
                      className="session-input"
                      placeholder="user@qsflash.com"
                    />
                    <label>EMAIL</label>
                </div>
                :
                ''
              }
              <div className="session-field">
                <input type="password"
                  value={this.state.password}
                  onChange={this.update('password')}
                  className="session-input"
                  placeholder={this.props.formType === "Log in" ? "Type your password" : "Must be 6 or more characters"}
                />
                <label>PASSWORD</label>
              </div>
              <input className="session-submit" type="submit" value={this.props.formType} />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SessionForm;
