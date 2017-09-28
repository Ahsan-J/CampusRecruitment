import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import Slider01 from './img/Slider01.jpg'
import Slider02 from './img/Slider02.jpg'
import Slider03 from './img/Slider03.jpg'
import Slider04 from './img/Slider04.jpg'

const AuthRedirect = (val)=>{
  if(val){
    return(<Redirect to ="/" />);
  }
}


const Slider = ()=>{
    return(
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
        {/* <!-- Indicators --> */}
            <ol className="carousel-indicators">
                <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                <li data-target="#myCarousel" data-slide-to="1"></li>
                <li data-target="#myCarousel" data-slide-to="2"></li>
                <li data-target="#myCarousel" data-slide-to="3"></li>
            </ol>
    
        {/* <!-- Wrapper for slides --> */}
        <div className="carousel-inner" role="listbox">
    
          <div className="item active">
            <img src={Slider01} alt="Chania" />
            <div className="carousel-caption">
              <h3>UBIT</h3>
              <p>The #1 Department of Computer Science.</p>
            </div>
          </div>
    
          <div className="item">
            <img src={Slider02} alt="Chania" />
            <div className="carousel-caption">
              <h3>UBIT</h3>
              <p>The MIT of Karachi,Pakistan .</p>
            </div>
          </div>
        
          <div className="item">
            <img src={Slider03} alt="Flower" />
            <div className="carousel-caption">
              <h3>ProBattle</h3>
              <p>The Victory of UBIT in achieving the ProBattle Trophy.</p>
            </div>
          </div>
    
          <div className="item">
            <img src={Slider04} alt="Flower" />
            <div className="carousel-caption">
              <h3>Saylaani Mass Training</h3>
              <p>A place where one can learn Developement Peacefully.</p>
            </div>
          </div>
      
        </div>
    
        {/* <!-- Left and right controls --> */}
        <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
          <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
          <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    );
}


class MainPage extends Component{
    constructor(props){
        super(props);
        this.state = {
          RedirectBool:false
        }
    }
    render(){
        return(
        <div>
          {this.props.NavBar()}
            <div className="container">
                <h2>Welcome to React Campus Recruitement</h2>
                {Slider()}
                {AuthRedirect(this.state.RedirectBool)}
            </div>
        </div>
        );
    }
}

export default MainPage;