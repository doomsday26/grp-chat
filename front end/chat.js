let form = document.getElementById('form')
let message= document.getElementById('message')

window.addEventListener('DOMContentLoaded',getchats)

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

async function getchats(){
   let chats=await axios.get(http+'/chat/',{
    data:localStorage.getItem("usercred")
    })
    console.log(chats);
}
