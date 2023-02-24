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
import { getDatabase, ref, set, get, child, update, remove } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js'
const db= getDatabase()

const lrollno=document.querySelector('#l_rollno')
const login_pass= document.querySelector("#password_l")
const lbutton=document.getElementById('l_btn')
const modal = document.querySelector('#modal')
const panel = document.querySelector('#panel')
const stname=document.querySelector('#stname')
const stroll=document.querySelector('#stroll')
const stname1=document.querySelector('#stname1')
const stroll1=document.querySelector('#stroll1')
var t_body=document.querySelector('#t_body')
var sno = 0

document.querySelector('#l_form').addEventListener('submit', function(event) {
event.preventDefault()})



    
var lr=lrollno.value
var lp=login_pass.value


 function login(){
  console.log(lrollno.value , login_pass.value)
  lr=lrollno.value
  lp=login_pass.value
  
  
  const l_db= ref(db)
  get(child(l_db, "Admins/" + lr )).then((snapshot)=>{
    if (snapshot.exists()){
      
      if(lp === snapshot.val().A_pass) {
        alert('login Successful')
        // window.location.href ='student.html'
        // stroll= snapshot.val().St_rollno
        
        modal.classList.add('hidden')
        panel.classList.remove('hidden')
        stname.textContent = snapshot.val().A_name
        stroll.textContent = snapshot.val().A_rollno
        stname1.textContent = snapshot.val().A_name
        stroll1.textContent = snapshot.val().A_rollno
        // localStorage.setItem('rollno',stroll)
        // console.log(localStorage.getItem('rollno'))

        up_data(lr)
      }
    
      else{
        alert("wrong password")
        
        
      }
    }
  })
 }
 
lbutton.addEventListener('click', function log() {
  login()
  // document.getElementById("l_form").reset();
  login_pass.value="" 
  getdata()
  l_rollno.value=""
})
const logbtn=document.querySelector('#logout')
const logbtn1=document.querySelector('#logout1')
function logout(){
  modal.classList.remove('hidden')
  panel.classList.remove('hidden')
  t_body.innerHTML=""
}
logbtn.addEventListener('click',logout)
logbtn1.addEventListener('click',logout)

function getdata(){
    const dbref=ref(db)
    get(child(dbref,"Students")).then((snapshot)=>
    {
        var student = []
        snapshot.forEach(childsnapshot =>{
            student.push(childsnapshot.val());
        })
        additems_table(student)
    })
}
function Additem(name,rollno,email){
    
    let trow=document.createElement("tr")
    
    let td1=document.createElement("td")
    let td2=document.createElement("td")
    let td3=document.createElement("td")
    let td4=document.createElement("td")
    
    td1.innerHTML= ++sno
    td2.innerHTML= name    
    td3.innerHTML= rollno
    td4.innerHTML= email
    td1.classList.add('bg-gray-200', 'border' ,'border-gray-400' , 'p-2', 'rounded-sm')
    td2.classList.add('bg-gray-200', 'border' ,'border-gray-400' , 'p-2', 'rounded-sm')
    td3.classList.add('bg-gray-200', 'border' ,'border-gray-400' , 'p-2', 'rounded-sm')
    td4.classList.add('bg-gray-200', 'border' ,'border-gray-400' , 'p-2', 'rounded-sm')
    td1.setAttribute('colspan','1')
    td2.setAttribute('colspan','2')
    td3.setAttribute('colspan','1')
    td4.setAttribute('colspan','2')
    
    
    

    trow.appendChild(td1)
    trow.appendChild(td2)
    trow.appendChild(td3)
    trow.appendChild(td4)
    t_body.appendChild(trow)
    

}
function additems_table(Students){
    sno=0
    
    Students.forEach(element => {
        Additem(element.St_name,element.St_rollno,element.St_email)
        
    });
}
// let btn=document.getElementById('btn')
// btn.addEventListener('click',function add(){
//     let td1=document.createElement("td")
//     let td2=document.createElement("td")
//     let td3=document.createElement("td")
//     let td4=document.createElement("td")
//     let trow=document.createElement("tr")
//     let t_body=document.getElementById('t_body')
//     td1.innerHTML= 1
//     td2.innerHTML= "shayan"   
//     td3.innerHTML= 123
//     td4.innerHTML= 123456

//     trow.appendChild(td1)
//     trow.appendChild(td2)
//     trow.appendChild(td3)
//     trow.appendChild(td4)
//     t_body.appendChild(trow)


// })

const sname=document.querySelector('#Sign_name')
const semail=document.querySelector('#Sign_email')
const spass=document.querySelector('#Sign_pass')
const srollno=document.querySelector('#Sign_rollno')
const sbutton=document.getElementById('Sign_button')
function alert1(){
  alert("signup succesfull")
}


function signup(){
  console.log(sname.value)
  console.log(semail.value)
  console.log(spass.value)

  
  set(ref(db, "Admins/" + srollno.value),
  {
    A_rollno : srollno.value,
    A_name : sname.value,
    A_email : semail.value,
    A_pass : spass.value,
    })

document.querySelector('#Sform').addEventListener('submit', function(event) {
event.preventDefault();})

  
}

sbutton.addEventListener('click', function insert() {
  document.querySelector('#Sform').addEventListener('submit', function(event) {
event.preventDefault();})
const _db= ref(db)
  get(child(_db, "Admins/" + srollno.value)).then((snapshot)=>{
    if (snapshot.exists()){
      alert("Enter new Admin no")
      
    }
  else{
    signup() 
    
  
    alert1() 

  }
  document.getElementById("Sform").reset(); 
  })



})
const delbtn=document.querySelector('#delbtn')
const del=document.querySelector('#del')

function recdelete() {
  const db_del = ref(db)
  remove(child(db_del, "Students/"+ del.value )).then(()=>
  alert ("Student removed Successfully"))
  
}
delbtn.addEventListener('click',recdelete)

const rembtn=document.querySelector('#rembtn')
const rem=document.querySelector('#rem')

function cdelete() {
  const db_rem = ref(db)
  remove(child(db_rem, "Courses/"+ rem.value )).then(()=>
  alert ("Student removed Successfully"))
  
}

rembtn.addEventListener('click',cdelete)

const courseno=document.querySelector("#courseno")
const c_name=document.querySelector("#coursename")
const c_time=document.querySelector("#coursetime")
function addcourse(){
  

  
  
  set(ref(db, "Courses/" + courseno.value),
  {
    couse_no :courseno.value,
    course_name : c_name.value,
    duration : c_time.value,
    
    })


  
}

const addc_btn=document.querySelector("#addc_btn")
addc_btn.addEventListener('click', 
function insert() {

const _db= ref(db)
  get(child(_db, "Courses/" + courseno.value)).then((snapshot)=>{
    if (snapshot.exists()){
      alert("Enter new course no")
      
    }
  else{
    addcourse() 
    
  
    alert("course added successfully")
    
  }
  document.getElementById("#cform").reset(); 
  })



})

const stmark=document.querySelector('#mark')
const markbtn=document.querySelector('#markbtn')
const mod3=document.querySelector('#modal3')
const modal3=document.querySelector('#mod3')
const cross3=document.querySelector('#cross3')
const marks_btn=document.querySelector('#marksbtn')
cross3.addEventListener('click', function close(){
  modal3.classList.toggle('hidden')
})
function addmarks(R_no,c_no,marks){
  console.log(R_no,c_no,marks)
  update(ref(db,"Students/"+R_no + "/En_courses/" + c_no),
  {
    course_marks : marks
  }
  )
}

marks_btn.addEventListener('click',function en_marks(){
  const rollnumber=stmark.value
  mod3.querySelectorAll('input').forEach((input)=>{
    const label_2=input.previousElementSibling
    const label_1=label_2.previousElementSibling
    const eachmarks=input.value
    console.log(eachmarks)
    addmarks(rollnumber,label_1.textContent,eachmarks)
    input.value=""
    stmark.value=""
    

  })
  alert('Marks Added Successfully')
  modal3.classList.toggle('hidden')
})

function stgetdata(){
  const dbref=ref(db)
  get(child(dbref,"Students/"+stmark.value+"/En_courses/")).then((snapshot)=>
  {
      var Course_st = []
      snapshot.forEach(childsnapshot =>{
          Course_st.push(childsnapshot.val());
      })
      console.log(Course_st)
      stadditems_table(Course_st)
  })
}
function stAdditem(no,name,marks){
  
  var label1=document.createElement('label')
  var label2=document.createElement('label')
  var input=document.createElement('input')
  
  input.type='number'

  
  label1.innerHTML= no 
  label2.innerHTML=name
  input.value= marks   
  label1.classList.add('block','text-gray-800','mb-2','inline','px-2','hidden') 
  label2.classList.add('block','text-gray-800','mb-2','inline','px-2') 
  input.classList.add('bg-gray-200','border','border-gray-400','w-full','block','mt-2','p-2','rounded-lg')
  
  mod3.appendChild(label1)
  mod3.appendChild(label2)
  
  mod3.appendChild(input)
  mod3.appendChild(document.createElement('br'))

}
function stadditems_table(Encourses){
  mod3.innerHTML=""
  
  Encourses.forEach(element => {
      stAdditem(element.En_course_no,element.En_course_name,element.course_marks)
      
  });
}


markbtn.addEventListener('click', function mod(){
    stgetdata()
    modal3.classList.toggle('hidden')
    

    
    
    })

    const s_name=document.querySelector('#Signname')
    const s_email=document.querySelector('#Signemail')
    const s_pass=document.querySelector('#Signpass')
    const s_rollno=document.querySelector('#Signrollno')
    const s_button=document.getElementById('Signbutton')
    const sdb=ref(db)
    
    
    
    function sign_up(){
      console.log(s_name.value)
      console.log(s_email.value)
      console.log(s_pass.value)
    
      
      set(ref(db, "Students/" + s_rollno.value),
      {
        St_rollno : s_rollno.value,
        St_name : s_name.value,
        St_email : s_email.value,
        St_pass : s_pass.value,
        })
    
    
    
      
    }
    s_button.addEventListener('click', function insert() {
    
    const _db= ref(db)
      get(child(_db, "Students/" + s_rollno.value)).then((snapshot)=>{
        if (snapshot.exists()){
          alert("Enter new roll no")
          
        }
      else{
        sign_up() 
        
      
        alert1() 
    
      }
      document.getElementById("form4").reset(); 
      modal4.classList.toggle('hidden')
      })
      
      
       
      
    
    })
    const tt_body=document.querySelector('#t-body')
  function gettdata(){
      const dbref=ref(db)
      get(child(dbref,"Courses")).then((snapshot)=>
      {
          var course = []
          snapshot.forEach(childsnapshot =>{
              course.push(childsnapshot.val());
          })
          t_additems_table(course)
      })
    }
    function t_Additem(courseno,course_name,duration){
      
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
      
      tt_body.appendChild(trow)
      
    
    }
    function t_additems_table(courses){
      
      
      courses.forEach(element => {
          t_Additem(element.couse_no,element.course_name,element.duration)
          
      });
    }
    
    gettdata()

    const uname=document.querySelector('#up_name')
    const uemail=document.querySelector('#up_email')
    const urollno=document.querySelector('#up_rollno')
    const upass=document.querySelector('#up_pass')
    
    const ubutton=document.getElementById('up_button')
    
    
    function update1(){
      console.log(uname.value)
      console.log(uemail.value)
      console.log(upass.value)
      
      
      update(ref(db, "Admins/" + urollno.value),
      {
        
        A_name : uname.value,
        A_email : uemail.value,
        A_pass : upass.value,
        })
        alert("Updated Successfully")
        document.querySelector("#modal_u").classList.add("hidden")
    document.querySelector('#uform').addEventListener('submit', function(event) {
    event.preventDefault();})
    
      
    }
    function up_data(lu){
    const _db= ref(db)
    console.log('roll no', lu)
      get(child(_db, "Admins/" + lu)).then((snapshot)=>{
      
      urollno.value = lu
      uname.value = snapshot.val().A_name
      uemail.value = snapshot.val().A_email
      upass.value  =snapshot.val().A_pass}
      
      
      
     
        
          
        )
       
    }
   
    
 
    
 
ubutton.addEventListener('click', function insert() {
document.querySelector('#uform').addEventListener('submit', function(event) {
    event.preventDefault();})
    
        update1()   
      
        
  })
// document.getElementById("#uform").reset(); 
const modal5=document.querySelector('#modal5')
function getcomp(){
        const dbref=ref(db)
        get(child(dbref,"Complains")).then((snapshot)=>
        {
            var course = []
            snapshot.forEach(childsnapshot =>{
                course.push(childsnapshot.val());
            })
            c_additems_table(course)
        })
      }
      function c_Additem(name,complain){
        
        let p=document.createElement("p")
        
        
        
        
        p.innerHTML= name + " : " + complain  
        
        modal5.appendChild(p)
      
      }
      function c_additems_table(courses){
        
        
        courses.forEach(element => {
            c_Additem(element.comp_name,element.complain)
            
        });
      }
      
      getcomp()
      
    
    
    
    
    




