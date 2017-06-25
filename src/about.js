import React, { Component } from 'react';
import Vivus from 'vivus';
import aboutUs from './assets/aboutUs.svg';
import people from './assets/people.svg';
import present from './assets/present.svg';
import * as _ from "lodash";
import "./about.css";
import Helmet from 'react-helmet';
let isMounted = false;
export default class About extends Component {
    constructor(){
        super();
        //this.scroll = _.throttle(this.scroll.bind(this),100);
        this.state = {scale:[0,0],translateY:[0,0],top:[0,0]}
    }
    el = [];
    scale = [0,0];
    translateY = [0,0];
    heightChunk = 0;
    scaleChunk = 0;
    scrollTop = null;
    componentWillMount(){

    }
    componentDidMount(){
        isMounted = true;
        let top = [];
        top[0] =  window.innerHeight;
        top[1] =  window.innerHeight;
        this.setState({top:top});
        this.heightChunk = window.innerHeight/this.props.steps; 
        this.scaleChunk = 1/this.props.steps; 
        window.addEventListener('scroll', this.scroll.bind(this));
    }
    down = 0;
    up=0;
    total=0;
    scroll(event){
        let isMovingDown = null;
        let scrollTop = event.srcElement.body.scrollTop;
        if(event.srcElement.body.scrollTop <     this.scrollTop){
          isMovingDown = false;
          console.log("isMovingDown: false");
        }else{
          isMovingDown = true; 
          console.log("isMovingDown: true");
        }
        let scale = [this.state.scale[0],this.state.scale[1]];
        let translateY = [this.state.translateY[0],this.state.translateY[1]];
        let top = [this.state.top[0],this.state.top[1]];
        this.total++;
        if(this.scrollTop !== null){
            let moveNum = 1;
            let height = window.innerHeight/2;
            for(let i=0; i < moveNum; i++){
                let topDiv = this.el[i].getBoundingClientRect().top;
                if(topDiv < 0 && moveNum < 2){
                    moveNum++;
                }
	            let isAdd = null;
	            if(topDiv > height){///If object is at top half of screen then shrink agains 
	                isAdd = true; 
                    console.log( "i: " + i  + "top(" + topDiv + ") > height(" + height + "): true ");
	            }else{
	                isAdd = false;
                    console.log("i: " + i  + "top(" + topDiv + ") > height(" + height + "): false");

	            }
	            if(isMovingDown){//If direction of scroll changes then skrink rather than expand or vis vera.
	                if(isAdd){
	                    scale[i] = this.state.scale[i] + this.scaleChunk;
	                }else{
	                    scale[i] = this.state.scale[i] - this.scaleChunk;
	                }
	            }else{
	                if(!isAdd){
	                    scale[i] = this.state.scale[i] + this.scaleChunk;
	                }else{
	                    scale[i] = this.state.scale[i] - this.scaleChunk;
	                }
                }
	            if(isMovingDown){//Change direction of translate if scroll direction changes.
	             //   translateY[0] = this.state.translateY + this.heightChunk;
	             //   translateY[1] = this.state.translateY + this.heightChunk;
                      this.down++
                      top[i] = this.state.top[i] - this.heightChunk;
	            }else{
	             //   translateY[0] = this.state.translateY - this.heightChunk;
	              //  translateY[1] = this.state.translateY - this.heightChunk;
                      top[i] = this.state.top[i] + this.heightChunk;
                      this.up++;
	            }
            }
        }else{
            console.log("Scroll is null")
        }
        console.log("Scroll up " + this.up + "  down " + this.down + " total: " + this.total)
        this.setState({scale:scale, translateY:translateY, top:top});
        this.scrollTop = scrollTop;
    }
    render()
    {
        let  title = null;
        if(!isMounted){
            title = (
                <object ref={() => { 
                    new Vivus("info",{duration:"2000",start:"autostart",file:aboutUs});                   
                }} className="about__title" id="info"></object>
            )
        }else{
            title = (
                <img src={aboutUs} className={"about__title"} alt="about"
                />
            )
        }
        return (
            <section className={"about"}>
        				<Helmet>
									<title>Information about the boutique store</title>
								</Helmet>
                <header>
                    {title}
                </header>
                <p>
                    A small boutique store based in Helensburgh. 
                </p>
                <p>
                   We live by a few simple rules.... 
                </p>
                <article
                ref={(el)=>{this.el[0]= el}} 
		        style={{
                    transform:'scale(' + this.state.scale[0] + ') '  +  ' translateY(' + this.state.translateY[0] + ')',
                    top:this.state.top[0]

		         }}
		         className={"about__entry"}>
		                <img src={people} className={"about__entry__pic"} alt="about"/>
		                <div className={"about__entry__info"} >
		                    <h2>Always ready to help</h2>
		                    <p>mortonprod@gmail.com  </p>
		                    <p>0141 577 2197</p>
		                </div>
	            </article>
	            <article
                    ref={(el)=>{this.el[1]= el}} 
	                style={{
	                    transform:'scale(' + this.state.scale[1] + ') '  +  ' translateY(' + this.state.translateY[1] + ')',
                        top:this.state.top[1]
	                 }} 
	                className={"about__entry"}>
	                <img src={present} className={"about__entry__pic"} alt="about"/>
	                <div className={"about__entry__info"}>
	                    <h2>Discreet delivery and purchase</h2>
	                    <p>No mention of product in bank statements </p>
	                    <p>Inconspicuous packaging</p>
	                </div>
                </article>
            </section>
        );
    }
}

About.defaultProps = {
    time:3000,
    steps:100
}
