import React,{Component} from 'react';

class studentItem extends Component{
    render(){
        return(
            <tr>
                <td>{this.props.Index+1}</td>
                <td>{this.props.name}</td>
                <td>{this.props.fatherName}</td>
                <td>{this.props.email}</td>
            </tr>
        );
    }
}
export default studentItem;