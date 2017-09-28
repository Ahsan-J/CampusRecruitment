import React,{Component} from 'react';
import StuList from './studentItem.js';
import ComList from './companyItem.js';
import AllList from './allItem.js';

class userView extends Component{
    constructor(props){
        super(props);
        this.setLocalObject = this.setLocalObject.bind(this);
        this.PopulateStudentItems = this.PopulateStudentItems.bind(this);
        this.PopulateCompanyItems = this.PopulateCompanyItems.bind(this);
        this.PopulateAllItems = this.PopulateAllItems.bind(this);
        this.renderCompany = this.renderCompany.bind(this);
        this.renderStudents = this.renderStudents.bind(this);
        this.renderAll = this.renderAll.bind(this);
        this.DeleteUser = this.DeleteUser.bind(this);
        this.displayNav = this.displayNav.bind(this);
        this.state = {
            userLists:{}
        }
    }
    setLocalObject(snapshot){
        // Object.values(snapshot.val()).map(this.setLocalUsersLists);
        this.setState({
            userLists:snapshot.val()
        })
    }
    // setLocalUsersLists(item){
    //     console.log(item)
    //     if(this.props.AccountFor===item.accountType||this.props.AccountFor==="All"){
    //         this.state.userLists.push(item);
    //         var List = this.state.userLists;
    //         this.setState({
    //             userLists:List
    //         });
    //     }
    // }
    DeleteUser(uid){
        var temp = this.state.userLists;
        delete temp[uid];
        this.props.DeleteUsers(temp);
        this.setState({
            userLists:temp
        })
    }
    displayNav(){
        if(this.props.NavBar){
            return this.props.NavBar();
        }
    }
    PopulateStudentItems(item,i){
        if(item.accountType==="Student"){
            return(<StuList key={i} Index={i} {...item}/>);
        }
    }
    PopulateCompanyItems(item,i){
        if(item.accountType==="Company"){
            return(<ComList key={i} Index={i} {...item}/>);
        }
    }
    PopulateAllItems(item,i){
        return(<AllList key={i} Index={i} {...item} Delete={this.DeleteUser}/>);
    }
    componentWillMount(){
        var localProps = {
            setUsers:this.setLocalObject
        };
        this.props.getUsers(localProps);
    }
    componentWillReceiveProps(){
        var localProps = {
            setUsers:this.setLocalObject
        };
        this.props.getUsers(localProps);
    }
    renderStudents(){
        return(
            <div>
            {this.displayNav()}
                <div className="container">
                <h1>Students</h1>
                <table className="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Student Name</th>
                            <th>Son of</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(this.state.userLists).map(this.PopulateStudentItems)}
                    </tbody>
                </table> 
            </div>
            </div>
        );
    }
    renderCompany(){
        return(<div>
        {this.displayNav()}
            <div className="container">
            <h1>Companies</h1>
            <table className="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Company Name</th>
                        <th>Address</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(this.state.userLists).map(this.PopulateCompanyItems)}
                </tbody>
            </table> 
        </div>
        </div>
        );
    }
    renderAll(){
        return (
            <div>
                {this.displayNav()}
            <div className="container">
            <h2>All Users</h2>
            <table className="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>AccountType</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(this.state.userLists).map(this.PopulateAllItems)}
                </tbody>
            </table>
            </div>
        </div>
        );
    }
    render(){
        if(this.props.AccountFor==="Student"){
            return this.renderStudents();
        }
        else if(this.props.AccountFor==="Company"){
            return this.renderCompany();
        }
        else if(this.props.AccountFor==="All"){
            return this.renderAll();
        }
        else{
            return null;
        }
    }
}
export default userView;