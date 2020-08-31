import React from "react";
import loginImg from "../../Login/login.svg";
import AuthService from "../../services/auth.service";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

const required = value =>
{
  if(! value)
  {
    return(
      <div className="alert alert-danger" role="alert" >
        this filed is required 
      </div>
    );
  }
};
class LoginLayout extends React.Component{
    constructor(props)
    {
        super (props)
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this); 
     this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
    }
    
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push("/profile");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }
    // handleClick()
    // {
    //   alert('This is logedIn ');
    // }
    render()
    {      
        return (
          <Form
          onSubmit={this.handleLogin}
          ref={c => {
            this.form = c;
          }}
        >
            <div className="base-container" ref={this.props.containerRef}>
              <div className="header">Login</div>
              <div className="content">
                <div className="image">
                  { <img src={loginImg} /> }
                </div>
                <div className="form">
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" placeholder="username" value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="password"         value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]} />
                  </div>
                </div>
              </div>
              <div className="footer">
                <button type="button" disabled={this.state.loading} className="btn" onClick={this.handleLogin}>
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                  Login   
                </button>
               
              </div>
              
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
              <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
            </Form>
          );
  }
}
export default LoginLayout ;
  