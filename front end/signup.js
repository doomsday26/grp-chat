let form = document.getElementById('form')
let name= document.getElementById('name')
let password = document.getElementById('password')
let email= document.getElementById('email')
let loginbtn = document.getElementById('login')
let http= 'http://localhost:3000'
form.addEventListener('submit', signup)

window.addEventListener('DOMContentLoaded',(event)=>{
    localStorage.clear()
})

async function signup(e){
e.preventDefault()

if(email.value===''||name.value===''||password.value===''){
    alert('please enter all the values')
}else{

    try {
      let result=  await axios.post( http+'/signup',{name:name.value,password:password.value,email:email.value})
      alert("success: "+ result.success+"  "+ result.message)
      name.value='';
      email.value='';
      password.value=''
      window.location.assign('login.html')

    } catch (error) {
        if(error){
            console.log(error);
            alert(error)
        }
        
    }

}






}