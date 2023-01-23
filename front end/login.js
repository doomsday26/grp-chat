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

} catch (err) {
    console.log(err);
    alert(err.message)
}
}

}