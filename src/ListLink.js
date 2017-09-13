import React from "react";
import {Link} from 'react-router-dom'

import "./ListLink.css";

export default function ListLink(props){
    let listComp = props.list.map(function(item,i){
        let link = null;
        if(item === "Home" || item === "home"){
            link = "";
        }else{
            link = item;
        }
        return (
            <li key={i}><Link to={"/" + link} >{item}</Link></li>
        )
    });
    return (    
        <ul className={"listLink"}>
            {listComp}
        </ul>
    )
}
