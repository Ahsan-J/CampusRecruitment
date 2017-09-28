import React,{Component} from 'react'
import PostItems from './postItems.js'

class Posts extends Component{
    constructor(props){
        super(props);
        this.PostNow = this.PostNow.bind(this);
        this.PostArea = this.PostArea.bind(this);
        this.PostedItems = this.PostedItems.bind(this);
        this.setLocalPost = this.setLocalPost.bind(this);
        this.ApplyForJob = this.ApplyForJob.bind(this);
        this.DeleteThisPost = this.DeleteThisPost.bind(this);
        this.EditPost = this.EditPost.bind(this);
        this.displayNav = this.displayNav.bind(this);
        this.applicationStatus = this.applicationStatus.bind(this);
        this.state = {
            Posts:[],
            Keys:[],
            status:false
        }
    }
    displayNav(){
        if(this.props.NavBar){
            return this.props.NavBar();
        }
    }
    PostArea(){
        if(this.props.userData.accountType==="Company"){
        return(
            <div className="container">
                <div className="col-lg-8 col-lg-offset-1">
                <form className="form-horizontal" onSubmit={this.PostNow}>
                    <fieldset>
                    <legend>Post a New Job</legend>
                    <div className="form-group">
                        <label htmlFor="jobTitle" className="col-lg-2 control-label lead">Job Title:</label>
                        <div className="col-lg-10">
                            <input ref="jobTitle" type="text" className="form-control" id="jobTitle" placeholder="Title"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="jobDescription" className="col-lg-2 control-label lead">Job Description:</label>
                        <div className="col-lg-10">
                            <textarea ref="jobDescription" placeholder = "Description . . ." className="form-control" rows="3" id="jobDescription"></textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="salary" className="col-lg-2 control-label lead">Salary:</label>
                        <div className="col-lg-10">
                            <input ref="salary" type="number" className="form-control" id="salary"placeholder="0"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="validation" className="col-lg-2 control-label lead">Validation:</label>
                        <div className="col-lg-10">
                            <input ref="validation" type="date" className="form-control" id="validation"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="pull-right">
                            <input type="submit" className="btn btn-success" value="Post Now"/>
                        </div>
                    </div>
                    </fieldset>
                </form>
                </div>
            </div>
        );}
        else{
            return null;
        }
    }
    PostNow(e){
        e.preventDefault();
        var Post = this.state.Posts;
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

        this.props.PostThis(newPost);
        Post.push(newPost);
        this.setState({
            Posts:Post
        });
    }
    ApplyForJob(index){
        var keyIndex = this.state.Keys[index];
        this.props.Apply(keyIndex);
    }
    EditPost(updatedPost,index){
        var keyIndex = this.state.Keys[index];
        this.props.Edit(updatedPost,keyIndex);
    }
    DeleteThisPost(index){
        var temp = {};
        for(var i=0;i<this.state.Posts.length;i++){
            if(i!==index){
                temp[this.state.Keys[i]]=this.state.Posts[i];
            }
        }
        this.props.DeletePost(temp);
    }
    applicationStatus(func,index){
        if(this.state.Posts[index].candidates){
            var list = this.state.Posts[index].candidates;
            for(var i=0;i<list.length;i++){
                if(this.props.userData.uid===list[i]){
                    func();
                }
            }
        }
    }
    PostedItems(item,i){
        if(this.props.userData.accountType==="Student"){
            return(
                <PostItems key={i} Index={i} {...item} status={this.applicationStatus} Apply={this.ApplyForJob} />
            );
        }else if(this.props.userData.accountType==="Company" || this.props.userData.accountType==="Admin"){
            if(this.props.userData.name===item.poster){
                return(
                    <PostItems key={i} Index={i} {...item} PostKey={this.state.Keys[i]} Edit={this.EditPost} Delete={this.DeleteThisPost} />                    
                );
            }else if(this.props.userData.accountType==="Admin"){
                return(
                    <PostItems key={i} Index={i} {...item} PostKey={this.state.Keys[i]} Delete={this.DeleteThisPost} />                    
                );
            }
            else{
                return null;
            }
        }
    }
    setLocalPost(snapshot){
        this.setState({
            Posts:Object.values(snapshot.val()),
            Keys:Object.keys(snapshot.val())
        });
    }
    componentWillMount(){
        var localProps = {
            setPost:this.setLocalPost
        };
        this.props.getPostFromServer(localProps);
    }
    componentWillReceiveProps(){
        var localProps = {
            setPost:this.setLocalPost
        };
        this.props.getPostFromServer(localProps);
    }
    render(){
        return(
            <div>
                {this.displayNav()}
                <div className="container">
                    <h2>Posts</h2>
                    {this.PostArea()}
                        <hr/>
                    {this.state.Posts.map(this.PostedItems)}
                </div>
            </div>
        );
    }
}
export default Posts;