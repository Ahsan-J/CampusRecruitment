import React,{Component} from 'react';

class About extends Component{
    render(){
        return(
            <div className = "container">
                <h1>Campus Recruitement Application</h1>
                <br/><hr/>
                <h3>What is Campus Recruitement?</h3>
                <p className="lead muted">
                    A college campus recruitment system that enables Studets and Companies to Connect and 
                    enables a mutual Mining of the Best Oppurtinites and Selects the best among each of them
                </p>
                <br/>
                <h3>Who Can Sign in?</h3>
                <p className="lead muted">
                    From Student to Company Professionals can Sign in to create a Mutual Interest that Might suits
                    their Business and Future Benefits
                </p>
                <br/>
                <h3>Why Signing In?</h3>
                <p className="lead muted">
                    Many Student hunts down Job Vacancies but they face many Problems regarding the best opportunities.
                    Some finds it and some not , they have to struggle a lot even though they may be more highly qualified
                    on the Other Hand , Companies Want best employee to expand their business but the upcoming CV doesn't 
                    gaurantee a Genius Mind fit for the Job. Companies can visit and Mine out the Best Candidates they see fit.
                    this Platform connects both Company and Student to connect and establish such relation that may benefit 
                    them both
                </p>
                <br/>
            </div>
        );
    }
}

export default About;