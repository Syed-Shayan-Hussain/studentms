// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
  
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1qL1YWkdsRauqFVzeV7xbVkO2IhYfmjQ",
  authDomain: "student-dbms-9323b.firebaseapp.com",
  projectId: "student-dbms-9323b",
  storageBucket: "student-dbms-9323b.appspot.com",
  messagingSenderId: "620359874402",
  appId: "1:620359874402:web:ae9b79e97bd69985a4de3b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {  getDatabase, ref, set, get, child, update, remove } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js'



// ______________________________________________________SIGNUP____________________________________________________________________
const sname=document.querySelector('#Sign_name')
const semail=document.querySelector('#Sign_email')
const spass=document.querySelector('#Sign_pass')
const srollno=document.querySelector('#Sign_rollno')
const sbutton=document.getElementById('Sign_button')
const db=getDatabase()
function alert1(){
  alert("signup succesfull")
}


function signup(){
  console.log(sname.value)
  console.log(semail.value)
  console.log(spass.value)

  
  set(ref(db, "Students/" + srollno.value),
  {
    St_rollno : srollno.value,
    St_name : sname.value,
    St_email : semail.value,
    St_pass : spass.value,
    })

document.querySelector('#Sform').addEventListener('submit', function(event) {
event.preventDefault();})

  
}
sbutton.addEventListener('click', function insert() {
  document.querySelector('#Sform').addEventListener('submit', function(event) {
event.preventDefault();})
const _db= ref(db)
  get(child(_db, "Students/" + srollno.value)).then((snapshot)=>{
    if (snapshot.exists()){
      alert("Enter new roll no")
      
    }
  else{
    signup() 
    
  
    alert1() 

  }
  document.getElementById("Sform").reset(); 
  })
  
  
   
  

})
// ______________________________________________________LOGIN___________________________________________________________

const lrollno=document.querySelector('#l_rollno')
const login_pass= document.querySelector("#password_l")
const lbutton=document.getElementById('l_btn')
document.querySelector('#l_form').addEventListener('submit', function(event) {
event.preventDefault()})


const scourse=document.querySelector('#stcoursee')
    
  var stroll= 0
const _login=false
 function login(){
  console.log(lrollno.value , login_pass.value)
  
  const lr=lrollno.value
  const lp=login_pass.value
  const l_db= ref(db)
  get(child(l_db, "Students/" + lr )).then((snapshot)=>{
    if (snapshot.exists()){
      if(lp === snapshot.val().St_pass) {
        alert('login Successful')
        window.location.href ='student.html'
        stroll= snapshot.val().St_rollno
        
        localStorage.setItem('rollno',stroll)
        console.log(localStorage.getItem('rollno'))
        
      }
    
      else{
        alert("wrong password")
        
        
      }
    }
  })
 }
 
lbutton.addEventListener('click', function log() {
  
  
  login()

  
  
  

})

