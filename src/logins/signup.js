import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';

const AuthRedirect = (val)=>{
  if(val){
    return(<Redirect to ="/" />);
  }
}

class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {accountType:"",RedirectRender:false,Gender:"Male"};
        this.handleAccountRadio = this.handleAccountRadio.bind(this);
        this.handleGenderRadio = this.handleGenderRadio.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.ConditionalFormRender = this.ConditionalFormRender.bind(this);
        this.handleStudent = this.handleStudent.bind(this);
    }
    handleAccountRadio(e){
        this.setState({accountType:e.currentTarget.value});
    }
    handleGenderRadio(e){
      this.setState({Gender:e.currentTarget.value});
    }
    handleStudent(){
      
    }
    ConditionalFormRender(){
        if(this.state.accountType==="Student"){
        return(
            <div id="StudentRender">
            <div className="form-group">
            <label htmlFor="inputName" className="col-lg-2 control-label ">Name</label>
            <div className="col-lg-5">
              <input type="text" className="form-control" ref="Name" id="StudentName" placeholder="Name" required={this.state.accountType==="Student"}/>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputFather" className="col-lg-2 control-label ">Father's Name</label>
            <div className="col-lg-5">
              <input type="text" className="form-control" ref="Father" id="StudentFather" placeholder="Father's Name" required={this.state.accountType==="Student"}/>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputEmail" className="col-lg-2 control-label ">Email</label>
            <div className="col-lg-5">
              <input type="email" className="form-control" ref="Email" id="StudentEmail" placeholder="Email" required={this.state.accountType==="Student"}/>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword" className="col-lg-2 control-label ">Password</label>
            <div className="col-lg-5">
              <input type="password" className="form-control" ref="Password" id="StudentPassword" placeholder="Password" required={this.state.accountType==="Student"} pattern="[A-Za-z]{6}" title="AtLeast 6 characters needed"/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-lg-2 control-label ">Gender</label>
            <div className="col-lg-5">
              <div className="radio">
                <label>
                  <input type="radio"  name="GenderRadio" id="GenderRadiosM" value="Male" onChange ={this.handleGenderRadio} checked={this.state.Gender==="Male"}/>
                  Male
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio"  name="GenderRadio" id="GenderRadiosF" value="Female" onChange ={this.handleGenderRadio} checked={this.state.Gender==="Female"}/>
                     Female
                </label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="col-lg-2 col-lg-offset-5">
              <button type="submit" className="btn btn-primary" >Submit</button>
            </div>
          </div>
          </div>
        );
    }
    else if(this.state.accountType==="Company"){
        return(
            <div id="CompanyRender">
            <div className="form-group">
            <label htmlFor="inputName" className="col-lg-2 control-label ">Company Name</label>
            <div className="col-lg-5">
              <input type="text" className="form-control" ref="Name" id="CompanyName" placeholder="Name" required={this.state.accountType==="Company"}/>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputEmail" className="col-lg-2 control-label ">Company Email</label>
            <div className="col-lg-5">
              <input type="email" className="form-control" ref="Email" id="ComapnyEmail" placeholder="Email" required={this.state.accountType==="Company"}/>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress" className="col-lg-2 control-label ">Main Branch Address</label>
            <div className="col-lg-5">
              <input type="text" className="form-control" ref="Address" id="CompanyAddress" placeholder="Address" required={this.state.accountType==="Company"}/>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword" className="col-lg-2 control-label ">Account Password</label>
            <div className="col-lg-5">
              <input type="password" className="form-control" ref="Password" id="CompanyPassword" placeholder="Password" required={this.state.accountType==="Company"} pattern="[A-Za-z]{6}" title="AtLeast 6 characters needed"/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-lg-3 col-lg-offset-5">
              <input type="submit" className="btn btn-primary" value='Submit' />
            </div>
          </div>
          </div>
        );
    }
    }
    handleSignUp(e){
      e.preventDefault();
      var data={};
      if(this.state.accountType==="Student"){
        data = {
          name : this.refs.Name.value,
          fatherName : this.refs.Father.value,
          email : this.refs.Email.value,
          password : this.refs.Password.value,
          gender : this.state.Gender,
          accountType:this.state.accountType
        };
      }
      else if(this.state.accountType==="Company"){
        data = {
          name : this.refs.Name.value,
          email : this.refs.Email.value,
          address : this.refs.Address.value,
          password : this.refs.Password.value,
          accountType:this.state.accountType
        };
      }
      this.props.SignUp(data);
      this.setState({RedirectRender:true})
    }
    render(){
        return(
            <div className = "container">
              {AuthRedirect(this.state.RedirectRender)}
            <h2 className="text-muted">New to Campus ??</h2>
            <form className="form-horizontal" onSubmit={this.handleSignUp}>
            <fieldset>
              <legend>Sign Up</legend>
              <div id="accountType">
                <div className="form-group">
                <label className="col-lg-2 control-label ">Account Type</label>
                <div className="col-lg-5">
                  <div className="radio">
                    <label>
                      <input type="radio" name="accountTypeRadio" id="StudentRadio" value="Student" onChange ={this.handleAccountRadio} checked={this.state.accountType==="Student"}/>
                      Student
                    </label>
                  
                    <label className="col-lg-offset-1">
                      <input type="radio" name="accountTypeRadio" id="CompanyRadios2" value="Company" onChange ={this.handleAccountRadio} checked={this.state.accountType==="Company"}/>
                         Company
                    </label>
                    </div>
                </div>
              </div>
            </div>
            {this.ConditionalFormRender()}
            </fieldset>
          </form>
          </div>
        );
    }
}
export default SignUp;