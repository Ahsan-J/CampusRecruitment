import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class Profile extends Component{
    constructor(props){
        super(props);
        this.Info = this.Info.bind(this);
    }
    Info(){
        if(this.props.userData.accountType==="Student"){
            return(
                <div className="container">
                    <h1>Welcome {this.props.userData.name}</h1>
                    <p className="lead"><strong>Son of : </strong> {this.props.userData.fatherName} </p>
                    <p className="lead"><strong>Email : </strong> {this.props.userData.email} </p>
                    <p className="lead"><strong>Gender : </strong> {this.props.userData.gender}</p>
                    <p className="lead"><strong>Signed as : </strong> {this.props.userData.accountType}</p>
                    <Link to="/post"> See What's Been Posted </Link>
                </div>
            );
        }
        else if(this.props.userData.accountType==="Company"){
            return(
                <div className="container">
                    <h1>Welcome {this.props.userData.name}</h1>
                    <p className="lead"><strong>Email : </strong> {this.props.userData.email} </p>
                    <p className="lead"><strong>Address : </strong> {this.props.userData.address} </p>
                    <p className="lead"><strong>Signed as : </strong> {this.props.userData.accountType}</p>
                    <Link to="/post"> See What's Been Posted </Link>
                </div>
            );
        }
    }
    render(){
        return(
            <div>
                {this.props.NavBar()}
                {this.Info()}
            </div>
        );
    }
}

export default Profile;