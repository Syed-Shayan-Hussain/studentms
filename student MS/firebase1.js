// Import the functions you need from the SDKs you need
import {   initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
  
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


const db= getDatabase()

import { onChildAdded, onValue ,getDatabase, push,ref, set, get, child, update, remove } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js'
const logout=document.querySelector('#logout')
const logout1=document.querySelector('#logout1')
const srollno=localStorage.getItem('rollno')
const stname=document.querySelector('#stname')
const stroll=document.querySelector('#stroll')
const stname1=document.querySelector('#stname1')
const stroll1=document.querySelector('#stroll1')
const scourse=document.querySelector('#scourse')
var name = ""
const _db = ref(db)
console.log(srollno )
get(child(_db, "Students/" + srollno)).then((snapshot)=>{
    if (snapshot.exists()){
        name=snapshot.val().St_name
        console.log(name)
        stname.textContent = snapshot.val().St_name
        stroll.textContent = snapshot.val().St_rollno
        stname1.textContent = snapshot.val().St_name
        stroll1.textContent = snapshot.val().St_rollno
      }})


logout.addEventListener('click',function log_out(){
  localStorage.removeItem('rollno')
  window.location.href = 'index.html'
})
logout1.addEventListener('click',function log_out1(){
  localStorage.removeItem('rollno')
  window.location.href = 'index.html'
})

var t_body=document.querySelector('#t-body')
function getdata(){
  const dbref=ref(db)
  get(child(dbref,"Courses")).then((snapshot)=>
  {
      var course = []
      snapshot.forEach(childsnapshot =>{
          course.push(childsnapshot.val());
      })
      additems_table(course)
  })
}
function Additem(courseno,course_name,duration){
  
  let trow=document.createElement("tr")
  
  let td1=document.createElement("td")
  let td2=document.createElement("td")
  let td3=document.createElement("td")
  
  
  td1.innerHTML= courseno   
  td2.innerHTML= course_name
  td3.innerHTML= duration + ' Month/Months'
  td1.classList.add('bg-gray-200', 'border' ,'border-gray-400' , 'p-2', 'rounded-sm')
  td2.classList.add('bg-gray-200', 'border' ,'border-gray-400' , 'p-2', 'rounded-sm')
  td3.classList.add('bg-gray-200', 'border' ,'border-gray-400' , 'p-2', 'rounded-sm')
  
  td1.setAttribute('colspan','1')
  td2.setAttribute('colspan','2')
  td3.setAttribute('colspan','2')
  
  
  
  

  trow.appendChild(td1)
  trow.appendChild(td2)
  trow.appendChild(td3)
  
  t_body.appendChild(trow)
  

}
function additems_table(courses){
  
  
  courses.forEach(element => {
      Additem(element.couse_no,element.course_name,element.duration)
      
  });
}

getdata()
const course=document.querySelector('#course')

const cbtn=document.querySelector('#adbtn')
var c_name= ""
var c_no = ""
var c_duration =""
var c_marks =""



function Enroll(cn,c_n,cd,cm){

  set(ref(db, "Students/" + srollno + "/En_courses/" + c_n),
  { 
    En_course_name : cn,
    En_course_no : c_n,
    course_duration : cd,
    course_marks : cm

  
    
    })
    alert('course Enrolled successfully')
    location.reload()

}
function getcourse(){
  const cdb=ref(db)
  get(child(cdb,"Courses/"+ course.value)).then((snapshot)=>{
    if (snapshot.exists()){
      c_name = snapshot.val().course_name
      c_no = snapshot.val().couse_no
      c_duration= snapshot.val().duration
      
    Enroll(c_name,c_no,c_duration,c_marks)

    }
  })
  
  }

cbtn.addEventListener('click',function ins(){
  if( noc < 5){
  getcourse()
  course.value=""
  }
  else{
    
    alert("You Cannot enroll yourself in more than 5 courses")
    course.value=""
  }

}
)

var ct_body=document.querySelector('#ct-body')

function getcdata(){
  const dbref=ref(db)
  
  get(child(dbref,"Students/" + srollno + "/En_courses")).then((snapshot)=>
  {
      var Ecourse = []
      snapshot.forEach(childsnapshot =>{
          Ecourse.push(childsnapshot.val());
      })
      
      Eadditems_table(Ecourse)
  })
}
function EAdditem(courseno,course_name,marks){
  
  let trow=document.createElement("tr")
  let td1=document.createElement("td")  
  let td2=document.createElement("td")
  let td3=document.createElement("td")
  console.log(courseno,course_name,marks)
  
  td1.innerHTML= courseno   
  td2.innerHTML= course_name
  td3.innerHTML= marks
  td1.classList.add('bg-gray-200', 'border' ,'border-gray-400' , 'p-2', 'rounded-sm')
  td2.classList.add('bg-gray-200', 'border' ,'border-gray-400' , 'p-2', 'rounded-sm')
  td3.classList.add('bg-gray-200', 'border' ,'border-gray-400' , 'p-2', 'rounded-sm')
  
  td1.setAttribute('colspan','1')
  td2.setAttribute('colspan','2')
  td3.setAttribute('colspan','1')
  
  
  trow.appendChild(td1)
  trow.appendChild(td2)
  trow.appendChild(td3)
  
  ct_body.appendChild(trow)
  

}
var noc=0
function Eadditems_table(Ecourses){
  
  noc=0
  Ecourses.forEach(element => {
      ++noc
      
      
      EAdditem(element.En_course_no,element.En_course_name,element.course_marks)
      
  }
 
  
  );
  document.getElementById('scourse').textContent = noc
  document.getElementById('stcourse').textContent = noc
}
getcdata()




    const uname=document.querySelector('#up_name')
    const uemail=document.querySelector('#up_email')
    const urollno=document.querySelector('#up_rollno')
    const upass=document.querySelector('#up_pass')
    
    const ubutton=document.getElementById('up_button')
    
    
    function update1(){
      console.log(uname.value)
      console.log(uemail.value)
      console.log(upass.value)
      
      
      update(ref(db, "Students/" + srollno),
      {
        
        St_name : uname.value,
        St_email : uemail.value,
        St_pass : upass.value,
        })
        alert("Updated Successfully")
        document.querySelector("#modal_u").classList.add("hidden")
    document.querySelector('#uform').addEventListener('submit', function(event) {
    event.preventDefault();})
    
      
    }
    function up_data(){
    const u_db= ref(db)
    console.log('roll no', srollno )
      get(child(u_db, "Students/" + srollno )).then((snapshot)=>{
      
      urollno.value = srollno
      uname.value = snapshot.val().St_name
      uemail.value = snapshot.val().St_email
      upass.value  =snapshot.val().St_pass}
      
      
      
     
        
          
        )
       
    }
   
    
 
    
    up_data(srollno)
    ubutton.addEventListener('click', function insert() {
      document.querySelector('#uform').addEventListener('submit', function(event) {
    event.preventDefault();})
    
        update1()   
      
        
    
      })

const comp=document.querySelector('#complain')
const comp_btn=document.querySelector('#c_btn')



comp_btn.addEventListener("click",function complain(){
  
  
    
    push(ref(db, "Complains/"),
  {
    
    comp_name : name,
    complain : comp.value,

    })
    comp.value=""

  }
)

const msg=document.querySelector('#msg')
const msg_btn=document.querySelector('#msgbtn')



msg_btn.addEventListener("click",function messages(){
  
  
    
    push(ref(db, "Messages/"),
  {
    
    msg_name : name,
    msg : msg.value,

    })
    msg.value=""
    

  }
)
const modal5=document.querySelector('#modal5')
function getmsg(){
        const dbref=ref(db)
        get(child(dbref,"Messages")).then((snapshot)=>
        {
            var course = []
            snapshot.forEach(childsnapshot =>{
                course.push(childsnapshot.val());
            })
            g_additems_table(course)
        })
      }
function g_Additem(name,msg){
        
        let p=document.createElement("p")
        
        
        
        
        p.innerHTML= name + " : " + msg  
        
        modal5.appendChild(p)
        p.classList.add('bg-blue-500','text-white','rounded-lg','p-2','w-1/2','mb-2')
        
      
      }
function g_additems_table(courses){
        
        
        courses.forEach(element => {
            g_Additem(element.msg_name,element.msg)
            
        });
      }
      
getmsg()



onValue(ref(db, 'Messages/'), (snapshot) => {
    var dbRef=ref(db)
    var len = Object.keys(snapshot.val()).length
    var lastMessage = Object.keys(snapshot.val())[len-1]
    get(child(dbRef, "Messages/" + lastMessage)).then((snapshot) => {
    g_Additem(snapshot.val().msg_name, snapshot.val().msg)
    })
    setTimeout(function() {
      modal5.scrollTop = modal5.scrollHeight;
    }, 20)
    
})
setTimeout(function() {
  modal5.scrollTop = modal5.scrollHeight;
}, 20)

   



    

  
  
    
  

  
  




