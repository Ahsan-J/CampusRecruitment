import React,{Component} from 'react';

class candidateLists extends Component{
    constructor(props){
        super(props);
        this.getCandidates = this.getCandidates.bind(this);
        this.populateData = this.populateData.bind(this);
        this.state = {
            AppliedCandidates:[]
        }
    }
    getCandidates(snapshot){
        var Data = this.state.AppliedCandidates;
        Data.push(snapshot.val());
        this.setState({
            AppliedCandidates:Data
        })
    }
    componentDidMount(){
        this.props.View(this.getCandidates,this.props.params.postKey);
    }
    populateData(item,index){
        return(
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.fatherName}</td>
                <td>{item.email}</td>
            </tr>
        );
    }
    render(){
        return(<div>
            {this.props.NavBar()}
            <div className="container">
                <h1>Candidates</h1>
                <table className="table table-striped table-hover ">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Father Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.AppliedCandidates.map(this.populateData)}
                    </tbody>
                </table> 
            </div>
        </div>);
    }
}
export default candidateLists;