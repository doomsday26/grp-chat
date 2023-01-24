let email= document.getElementById('email')
let password= document.getElementById('password')
let form = document.getElementById('form')

window.addEventListener('DOMContentLoaded',()=>{
    localStorage.clear()
})

let http= 'http://localhost:3000'
form.addEventListener('submit',login)

async function login(e){
if(email.value===''||password.value===''){
    alert('please fill all the values')
}else{
    e.preventDefault()
try {
    
let result= await axios.post(http+'/login/',{
    email:email.value,
    password:password.value
})

console.log(result);
localStorage.setItem("usercred",result.key)
email.value=''
password.value=''
alert('you have logged in successfully')
await getchats()
window.location.assign('chat.html')
} catch (err) {
    console.log(err);
    alert(err.message)
}
}

}

async function getchats() {
    let chatmessages = await axios.get(http + "/chat/", {
      headers: { data: localStorage.getItem("usercred") },
    });
  let chatdata= JSON.stringify(chatmessages) 
  localStorage.setItem('chatdata',chatdata)
  
  }