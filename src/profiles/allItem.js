import React,{Component} from 'react';

class companyItem extends Component{
    constructor(props){
        super(props);
        this.deleteAction=this.deleteAction.bind(this);
    }
    deleteAction(){
        this.props.Delete(this.props.uid);
    }
    render(){
        return(
            <tr>
                <td>{this.props.Index+1}</td>
                <td>{this.props.name}</td>
                <td>{this.props.email}</td>
                <td>{this.props.accountType}</td>
                <td>
                <button className="btn btn-danger" onClick={this.deleteAction}>Delete User</button>
                </td>
            </tr>
        );
    }
}
export default companyItem;