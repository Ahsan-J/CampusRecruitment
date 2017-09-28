import React,{Component} from 'react';
import {Link,Redirect} from 'react-router-dom';

const AuthRedirect = (val)=>{
    if(val){
      return(<Redirect to ="/" />);
    }
  }

class login extends Component{
    constructor(props){
        super(props);
        this.state = {AuthRedirectBool:false};
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        var Email = this.refs.AuthEmail.value;
        var Password = this.refs.AuthPassword.value
        this.props.LogIn(Email,Password);
        this.setState({AuthRedirectBool:true});
    }
    render(){
        return (
            <div className="container">
                {AuthRedirect(this.state.AuthRedirectBool)}
                <h1>Campus Recruitement</h1>
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Login</legend>
                        <div className="form-group">
                            <label htmlFor="inputEmail" className="pull-left col-lg-2 control-label">Email</label>
                            <div className="col-lg-4 ">
                                <input type="text" ref="AuthEmail" className="form-control" id="inputEmail" placeholder="Email"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword" className=" pull-left col-lg-2 control-label">Password</label>
                            <div className="col-lg-4">
                                <input type="password" ref="AuthPassword" className="form-control" id="inputPassword" placeholder="Password"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-lg-10 col-lg-offset-2">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                        <p className = "col-lg-offset-2">Or Do u want to <Link to="/SignUp">Sign up</Link>?</p>
                    </fieldset>
                </form>
            </div>
        );
    }
}
export default login;