let form = document.getElementById('form')
let message= document.getElementById('message')


form.addEventListener('submit',sendmsg)
let http='http://localhost:3000'
async function sendmsg(e){
e.preventDefault()
let chats =await axios.post(http+'/chat/',{
    data:localStorage.getItem("usercred"),
    msg:message.value
})
console.log(chats);
}