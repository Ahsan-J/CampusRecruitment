import React,{Component} from 'react';
import AllUsers from './AllUsers.js';
import Post from '../postModules/viewPosts.js';

class Admin extends Component{
    constructor(props){
        super(props);
        this.viewUsers = this.viewUsers.bind(this);
        this.viewPosts = this.viewPosts.bind(this);
        this.ConditionalRender = this.ConditionalRender.bind(this);
        this.state = {
            Users:true,
            postRender:false
        }
    }
    viewUsers(){
        this.setState({
            Users:true,
            postRender:false
        });
    }
    viewPosts(){
        this.setState({
            Users:false,
            postRender:true
        });
    }
    ConditionalRender(){
        if(this.state.Users){
            return(
                <AllUsers AccountFor="All" getUsers={this.props.getAllUsers} DeleteUsers={this.props.DeleteUsers}/>
            );
        }else if(this.state.postRender){
            return(
                <Post userData={this.props.userData} getPostFromServer={this.props.getPostFromServer} />
            );
        }else return null;
    }
    render(){
        return(
            <div>
                {this.props.NavBar()}
                <div className="container">
                    <h1>Managing Stuffs</h1>
                    <ul className="nav nav-pills">
                        <li><button className="btn btn-link" onClick={this.viewUsers}>Users</button></li>
                        <li><a onClick={this.viewPosts}>Posts</a></li>
                    </ul>
                    {this.ConditionalRender()};
                </div>
            </div>
        );
    }
}

export default Admin;