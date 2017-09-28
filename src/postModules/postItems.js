import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class PostItems extends Component{
    constructor(props){
        super(props);
        this.ApplyNow = this.ApplyNow.bind(this);
        this.EditPost = this.EditPost.bind(this);
        this.EditNow = this.EditNow.bind(this);
        this.DeletePost = this.DeletePost.bind(this);
        this.renderApply = this.renderApply.bind(this);
        this.renderDelete = this.renderDelete.bind(this);
        this.renderViewCandidate = this.renderViewCandidate.bind(this);
        this.renderEditButton = this.renderEditButton.bind(this);
        this.renderStatus = this.renderStatus.bind(this);
        this.setStatus = this.setStatus.bind(this);

        this.state = {
            Editable:false,
            status:false
        }
    }
    ApplyNow(){
        this.props.Apply(this.props.Index);
    }
    EditPost(){
        this.setState({Editable:true});
    }
    DeletePost(){
        this.props.Delete(this.props.Index);
    }
    renderApply(){
        if(this.props.Apply){
            return(
                <button className="btn btn-primary" disabled={this.state.status} onClick={this.ApplyNow}>Apply Now</button>
            );
        }
    }
    EditNow(e){
        e.preventDefault();
        var Title = this.refs.jobTitle.value;
        var Description = this.refs.jobDescription.value;
        var Salary = this.refs.salary.value;
        var validatingDate = this.refs.validation.value;
        var vDate = new Date(validatingDate);

        var dd = vDate.getDate();
        var mm = vDate.getMonth()+1;
        var yyyy = vDate.getFullYear();

        var valid = dd+"-"+mm+"-"+yyyy;

        var today = new Date();
        dd = today.getDate();
        mm = today.getMonth()+1;
        yyyy = today.getFullYear();
        var currentDate =dd+"-"+mm+"-"+yyyy;

        var newPost = {
            jobTitle:Title,
            jobDescription:Description,
            poster:this.props.userData.name,
            salary:Salary,
            postDate: currentDate,
            validation:valid
        };

        this.props.Edit(newPost,this.props.Index);
        this.setState({Editable:false})
    }
    renderEditForm(){
        return(
            <div className="container">
                <div className="col-lg-8 col-lg-offset-1">
                <form className="form-horizontal" onSubmit={this.EditNow}>
                    <fieldset>
                    <legend>Edit Job</legend>
                    <div className="form-group">
                        <label htmlFor="jobTitle" className="col-lg-2 control-label lead">Job Title:</label>
                        <div className="col-lg-10">
                            <input ref="jobTitle" type="text" className="form-control" id="jobTitle" placeholder={this.props.jobTitle}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="jobDescription" className="col-lg-2 control-label lead">Job Description:</label>
                        <div className="col-lg-10">
                            <textarea ref="jobDescription" className="form-control" rows="3" id="jobDescription" placeholder={this.props.jobDescription}></textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="salary" className="col-lg-2 control-label lead">Salary:</label>
                        <div className="col-lg-10">
                            <input ref="salary" type="number" className="form-control" id="salary"placeholder={this.props.salary}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="validation" className="col-lg-2 control-label lead">Validation:</label>
                        <div className="col-lg-10">
                            <input ref="validation" type="date" className="form-control" id="validation" placeholder={this.props.postDate}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="pull-right">
                            <input type="submit" className="btn btn-success" value="Save"/>
                        </div>
                    </div>
                    </fieldset>
                </form>
                </div>
            </div>
        );
    }
    renderEditButton(){
        if(this.props.Edit){
            return(
                <button className="btn btn-primary" onClick={this.EditPost}>Edit</button>
            );
        }
    }
    renderDelete(){
        if(this.props.Delete){
            return(
                <button className="btn btn-danger" onClick={this.DeletePost}>Delete</button>
            );
        }
    }
    renderViewCandidate(){
        if(this.props.PostKey){
            return(
                <Link to={'/applicants/'+this.props.PostKey} className = "btn btn-default" onClick={this.ViewCandidates}>View Applicants</Link>
            );
        }
    }
    setStatus(){
        this.setState({
            status:true
        })
    }
    renderStatus(){
        if(this.state.status){
            return(
                <div>
                    <p className="success"> You have Applied to this Post</p>
                </div>
            );
        }
    }
    componentWillMount(){
        if(this.props.status){
            this.props.status(this.setStatus,this.props.Index);
        }
    }
    render(){
        if(this.state.Editable){
            return this.renderEditForm();
        }
        else{
        return (
            <div>
                <h3> {this.props.jobTitle} </h3>
                    <p><span className="lead">Job Description : </span>{this.props.jobDescription}</p>
                    <p><span className="lead">Company Name : </span>{this.props.poster}</p>
                    <p><span className="lead">Job Salary : </span>{this.props.salary}</p>
                    <p><span className="lead">Posted at : </span>{this.props.postDate}</p>
                    <p><span className="lead">valid till at : </span>{this.props.validation}</p>
                    {this.renderViewCandidate()}
                    {this.renderStatus()}
                    <div className="pull-right">
                        {this.renderApply()}
                        {this.renderEditButton()}
                        {this.renderDelete()}
                    </div>
                <br/>
                <hr/>
            </div>);
        }
    }
} 
export default PostItems;