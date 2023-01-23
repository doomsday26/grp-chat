let form = document.getElementById('form')
let message= document.getElementById('message')

window.addEventListener('DOMContentLoaded',getchats)

form.addEventListener('submit',sendmsg)
let http='http://localhost:3000'

//setInterval(getchats,1000)

async function sendmsg(e){
e.preventDefault()
let chats =await axios.post(http+'/chat/',{ msg:message.value},{headers:{  data:localStorage.getItem("usercred")},
})
console.log(chats);
}

async function getchats(){

   let chats=await axios.get(http+'/chat/',{headers:{ data:localStorage.getItem("usercred")}
    })
    console.log(chats);
}
