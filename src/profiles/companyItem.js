import React,{Component} from 'react';

class companyItem extends Component{
    render(){
        return(
            <tr>
                <td>{this.props.Index+1}</td>
                <td>{this.props.name}</td>
                <td>{this.props.address}</td>
                <td>{this.props.email}</td>
            </tr>
        );
    }
}
export default companyItem;