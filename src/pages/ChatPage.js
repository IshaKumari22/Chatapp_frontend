import React,{useEffect,useState,useRef} from "react";

const messagesEndRef=useRef(null);
const scrollToBottom=()=>{
    messagesEndRef.current?.scrollIntoView({behavior:"smooth"});
};

useEffect(()=>{
    const interval=setTimeout(()=>{
        messagesEndRef.current?.scrollIntoView({behavior:"smooth"})
        
    })
})