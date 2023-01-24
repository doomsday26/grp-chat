let form = document.getElementById("form");
let message = document.getElementById("message");
let chatlist = document.getElementById("chats");

window.addEventListener("DOMContentLoaded", displaychats);
form.addEventListener("submit", sendmsg);

let http = "http://localhost:3000";

//setInterval(getchats,1000)

async function sendmsg(e) {
  e.preventDefault();
  let chatmsg = await axios.post(
    http + "/chat/",
    { msg: message.value },
    { headers: { data: localStorage.getItem("usercred") } }
  );
  console.log(chatmsg);
  message.value = "";

  await displaynewchats();
}

async function displaynewchats() {
  let chatmessages = localStorage.getItem("chatdata");
  chatmessages = JSON.parse(chatmessages);
  let arrmsgs = chatmessages.msgs;
  console.log(chatmessages);
  let offset = arrmsgs[arrmsgs.length - 1].id;

  let newchatmessages = await axios.get(http + `/chat/${offset}`, {
    headers: { data: localStorage.getItem("usercred") },
  });
  console.log(newchatmessages);
  newchatmessages.msgs.forEach((chat) => {
    showli(chat.user.name, chat.id, chat.text);
  });
}

function displaychats() {
  let chatmessages = localStorage.getItem("chatdata");
  chatmessages = JSON.parse(chatmessages);
  //remove previous childs
  while (chatlist.firstChild) {
    chatlist.removeChild(chatlist.lastChild);
  }
  chatmessages.msgs.forEach((chat) => {
    showli(chat.user.name, chat.id, chat.text);
  });
}


//setInterval(displaynewchats,1000)

function showli(username, id, text) {
  let li = document.createElement("li");
  li.className = "chat";
  li.id = id;
  //creating name span
  let namespan = document.createElement("span");
  namespan.className = "username";
  namespan.innerText = username + " ";
  li.appendChild(namespan);

  if (text !== "just logged in") {
    let divispan = document.createElement("span");
    divispan.innerText = " : ";
    li.appendChild(divispan);
  }

  //msg span
  let msgspan = document.createElement("span");
  msgspan.innerText = text;
  msgspan.className = "chatmsg";
  li.appendChild(msgspan);
  chatlist.appendChild(li);
}
