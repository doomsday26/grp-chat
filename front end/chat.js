let form = document.getElementById("form");
let message = document.getElementById("message");
let chatlist = document.getElementById("oldchats");
let newchats = document.getElementById("newchats");
window.addEventListener("DOMContentLoaded", loadGroups);
form.addEventListener("submit", sendmsg);
let groupId;
let http = "http://localhost:3000/chat";
document.getElementById("newGrp").addEventListener("click", opencreategroup);
document
  .getElementById("closecreategroup")
  .addEventListener("click", closecreategroup);
document
  .getElementById("allmembers")
  .addEventListener("click", makeGroupMember);
document.getElementById("grpmembers").addEventListener("click", removemember);
document.getElementById("groupdetails").addEventListener("submit", creategroup);
document.getElementById("groups").addEventListener("click", openGroup);

function showli(username, id, text, ulid) {
  // console.log(ulid);
  
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
  ulid.appendChild(li);
}



async function opencreategroup() {
  document.getElementById("createNewGroup").style.display = "block";
  let allMembers = document.getElementById("allmembers");
  while (allMembers.firstChild) {
    allMembers.removeChild(allMembers.lastChild);
  }

  let grpMembers = document.getElementById("grpmembers");
  while (grpMembers.firstChild) {
    grpMembers.removeChild(grpMembers.lastChild);
  }
  
  await loadAllUsers();
}
async function loadAllUsers() {
  let users = await axios.get(http + "/users", {
    headers: { data: localStorage.getItem("usercred") },
  });
  console.log(users);
  users.forEach((user) => {
    let li = document.createElement("li");
    li.className = user;
    li.id = user.id;
    li.innerText = user.name;
    document.getElementById("allmembers").appendChild(li);
  });
}

function closecreategroup() {
  document.getElementById("createNewGroup").style.display = "none";
}
function makeGroupMember(e) {
  if ((e.target.classanme = "user")) {
    let li = document.createElement("li");
    li.className = "grpmember";
    li.id = e.target.id;
    // li.innerText=e.target.innerText
    let span = document.createElement("span");
    span.innerText = e.target.innerText;
    li.appendChild(span);
    let btn = document.createElement("button");
    btn.innerText = "REMOVE";
    btn.classList.add("btn", "removemember");
    li.appendChild(btn);
    document.getElementById("grpmembers").appendChild(li);
  }
  e.target.parentNode.removeChild(e.target);
}
function removemember(e) {
  if (e.target.className.includes("removemember")) {
    let li = document.createElement("li");
    li.id = e.target.parentNode.id;
    li.innerText = e.target.parentNode.firstChild.innerText;
    li.classList = ["user"];
    document.getElementById("allmembers").appendChild(li);
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
  }
}

async function creategroup(e) {
  e.preventDefault();
  
  try {
    let groupname = document.getElementById("groupname").value;

    let userIds = [];
    let arr = document.getElementsByClassName("grpmember");
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      userIds.push(+element.id);
    }
    let groupinfo = {
      groupname: groupname,
      groupmemberIds: userIds,
    };
    axios.post(
      http + "/creategrp",
      { groupinfo: groupinfo },
      { headers: { data: localStorage.getItem("usercred") } }
      );
      // create group
      let li = document.createElement("li");
      li.innerText = groupname;
      li.id = document.getElementsByClassName("groupname").length + 1;
      li.className = "groupname";
      document.getElementById("groups").appendChild(li);
      closecreategroup();
  } catch (error) {
    console.log(error);
  }
}

async function getoldchats(id) {
  let chatmessages = await axios.get(http + `/groupchats/${id}`, {
    headers: { data: localStorage.getItem("usercred") },
  });
  console.log("old messages of this group>>>>", chatmessages);
  let chatdata = JSON.stringify(chatmessages);
  localStorage.setItem("chatdata", chatdata);
}

async function openGroup(e) {
  try {
clearInterval(displaynewchats)

    if (e.target.className == "groupname") {
      document.getElementById("selectgroup").style.display = "none";
      document.getElementById("chatfunctions").style.display = "block";
      document.getElementById("groupName").innerText = e.target.innerText;
      console.log(e.target.id);
      groupId=e.target.id
      await getoldchats(e.target.id);
     displayoldchats();
    await  displaynewchats()

    //setInterval(displaynewchats,1000)
    }
  } catch (error) {
    console.log(error);
  }
}

async function loadGroups() {
  try {
    let groups = document.getElementById("groups");
    while (groups.firstChild) {
      groups.removeChild(groups.lastChild);
    }
    
    let usergroups = await axios.get(http + "/getGroups", {
      headers: { data: localStorage.getItem("usercred") },
    });
    console.log(usergroups);
    usergroups.forEach((usergrp) => {
      let li = document.createElement("li");
      li.id = usergrp.id;
      li.className = "groupname";
      li.innerText = usergrp.name;
      groups.appendChild(li);
    });
  } catch (error) {
    console.log(error);
  }
}

async function sendmsg(e) {
  e.preventDefault();
  let chatmsg = await axios.post(
    http + "/"+groupId ,
    { msg: message.value },
    { headers: { data: localStorage.getItem("usercred") } }
  );
  console.log(chatmsg);
  message.value = "";
  
  // await displaynewchats();
  
  var element = document.getElementById("chatmsgs");
  element.scrollTop = element.scrollHeight;
}
async function displaynewchats() {
  try {
  let chatmessages = localStorage.getItem("chatdata");
  chatmessages = JSON.parse(chatmessages);
  let arrmsgs = chatmessages.msgs;
  console.log(chatmessages);
  let offset
if(arrmsgs.length>0){
 offset = arrmsgs[arrmsgs.length - 1].id;
}else{
  offset=0
}
 

  let newchatmessages = await axios.get(http + `/${offset}/${groupId}`, {
    headers: { data: localStorage.getItem("usercred") },
  });

  console.log(newchatmessages);
  
  //remove previous
  //remove previous childs
  while (newchats.firstChild) {
    newchats.removeChild(newchats.lastChild);
  }

  newchatmessages.msgs.forEach((chat) => {
    showli(chat.user.name, chat.id, chat.text, newchats);
  });

  var element = document.getElementById("chatmsgs");
  element.scrollTop = element.scrollHeight;
} catch (error) {
  console.log(error);
}


}
function displayoldchats() {
  let chatmessages = localStorage.getItem("chatdata");
  chatmessages = JSON.parse(chatmessages);
  //remove previous childs
  while (chatlist.firstChild) {
    chatlist.removeChild(chatlist.lastChild);
  }
  
  console.log(chatmessages);
  chatmessages.msgs.forEach((chat) => {
    showli(chat.user.name, chat.id, chat.text, chatlist);
  });
}


  