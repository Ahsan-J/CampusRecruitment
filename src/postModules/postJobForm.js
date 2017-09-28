import React,{Component} from 'react'

class JobForm extends Component{
    constructor(props){
        super(props);
    }
    PostNow(e){
        e.preventDefault();
    }
    render(){
        return(
            <div className="container">
                <h1>Post A new Job </h1>
                <br/>
                <div className="col-lg-8 col-lg-offset-1">
                <form className="form-horizontal" onSubmit={this.PostNow}>
                    <fieldset >
                    <legend>Job Details</legend>
                    <div className="form-group">
                        <label htmlFor="jobTitle" className="col-lg-2 control-label">Job Title : </label>
                        <div className="col-lg-10">
                            <input ref="jobTitle" type="text" className="form-control" id="jobTitle" placeholder="Title"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="jobDescription" className="col-lg-2 control-label">Job Description : </label>
                        <div className="col-lg-10">
                            <textarea ref="jobDescription" placeholder = "Description . . ." className="form-control" rows="3" id="jobDescription"></textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="salary" className="col-lg-2 control-label">Salary : </label>
                        <div className="col-lg-10">
                            <input ref="salary" type="number" className="form-control" id="salary"placeholder="0"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-lg-offset-2">
                            <input type="submit" className="btn btn-success" value="Post"/>
                        </div>
                    </div>
                    </fieldset>
                </form>
                </div>
            </div>
        );
    }
}
export default JobForm;