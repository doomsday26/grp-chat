let form = document.getElementById("form");
let message = document.getElementById("message");
let chatlist = document.getElementById("oldchats");
let newchats = document.getElementById("newchats");
window.addEventListener("DOMContentLoaded", loadGroups);
//form.addEventListener("submit", sendmsg);
let groupId;
let http = "http://localhost:3000/chat";
document.getElementById("newGrp").addEventListener("click", opencreategroup);
document.getElementById("closecreategroup").addEventListener("click", closecreategroup);
document.getElementById("allmembers").addEventListener("click", makeGroupMember);
document.getElementById("grpmembers").addEventListener("click", removemember);
document.getElementById("groupdetails").addEventListener("submit", creategroup);
document.getElementById("groups").addEventListener("click", openGroup);
document.getElementById("Settings").addEventListener("click", openGroupSettings);
document.getElementById("closeSettings").addEventListener("click", () => {
  document.getElementById("groupSettings").style.display = "none";
});
document.getElementById("settingsMembers").addEventListener("click", memberSettings);
document.getElementById("moreUsers").addEventListener("click", addNewUser);
document.getElementById("newMembers").addEventListener("click", removeNewUser);
document.getElementById("submitChangedsettings").addEventListener("click", submitChangedSettings);

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
    //  clearInterval(displaynewchats);

    document.getElementById("groupSettings").style.display = "none";
    if (e.target.className == "groupname") {
      document.getElementById("selectgroup").style.display = "none";
      document.getElementById("chatfunctions").style.display = "block";
      document.getElementsByClassName("groupName")[0].innerText =
        e.target.innerText;
      document.getElementsByClassName("groupName")[0].id = e.target.id;
      console.log(document.getElementsByClassName("groupName")[0]);
      console.log(e.target.id);
      groupId = e.target.id;
      //  await getoldchats(e.target.id);
      //displayoldchats();
      //await displaynewchats();

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
    http + "/" + groupId,
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
    let offset;
    if (arrmsgs.length > 0) {
      offset = arrmsgs[arrmsgs.length - 1].id;
    } else {
      offset = 0;
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

async function openGroupSettings() {
  document.getElementById("groupSettings").style.display = "block";
  document.getElementById("newgroupname").value =
    document.getElementsByClassName("groupName")[0].innerText;
  let id = document.getElementsByClassName("groupName")[0].id;
  await groupusers(id);
  await loadLeftUsers(id);
  await isAdmin(id);
  //load all users
}

async function isAdmin(id) {
  let userData = await axios.get(http + `/isAdmin/${id}`, {
    headers: { data: localStorage.getItem("usercred") },
  });
  console.log(userData);
  document.getElementById("isAdmin").innerText = userData.isAdmin
    ? "you are admin"
    : "you are not admin";
}

async function groupusers(id) {
  let users = await axios.get(http + `/groupUsers/${id}`, {
    headers: { data: localStorage.getItem("usercred") },
  });
  console.log(users);
  let ul = document.getElementById("settingsMembers");
  clearUl(ul);
  users.forEach((user) => {
    let li = document.createElement("li");
    li.className = "settingsMember";
    li.id = user.id;
    li.appendChild(createSpan("settingsMemberName", user.name));
    li.appendChild(
      createSpan(
        "settingsAdmin",
        user.usergroups.isAdmin ? "admin" : "not admin"
      )
    );

    li.appendChild(
      createbtn(
        user.usergroups.isAdmin ? "btn removeAdmin" : "btn makeAdmin",
        user.usergroups.isAdmin ? "remove Admin" : "make admin"
      )
    );

    li.appendChild(createbtn("btn removeFromGroup", "remove"));

    ul.appendChild(li);
  });

  // id: 2
  // name: "h2"
  // usergroups
  // : {id: 1, isAdmin: true,
}

async function memberSettings(e) {
  console.log(document.getElementById("isAdmin").innerText);

  let boolean =
    document.getElementById("isAdmin").innerText === "you are admin"
      ? true
      : false;

  let groupId = document.getElementsByClassName("groupName")[0].id;

  if (e.target.className.includes("removeAdmin")) {
    console.log("removed from admin");
    //check if user is admin or not
    if (boolean) {
      let id = e.target.parentNode.id;
      console.log(id, groupId);
      await axios.post(
        http + `/removeAdmin`,
        { userId: id, groupId: groupId },
        {
          headers: { data: localStorage.getItem("usercred") },
        }
      );
      await openGroupSettings();
    } else {
      alert("you are not admin");
    }
  }
  if (e.target.className.includes("removeFromGroup")) {
    //check if user is admin or not
    console.log("removed from group");
    if (boolean) {
      let id = e.target.parentNode.id;
      await axios.post(
        http + `/removeFromGroup`,
        { userId: id, groupId: groupId },
        {
          headers: { data: localStorage.getItem("usercred") },
        }
      );
      await openGroupSettings();
    } else {
      alert("you are not admin");
    }
  }

  if (e.target.className.includes("makeAdmin")) {
    console.log("made admin");
    //check if user is admin or not
    let id = e.target.parentNode.id;
    console.log(id, groupId);
    if (boolean) {
      let result = await axios.post(
        http + `/makeAdmin`,
        { userId: id, groupId: groupId },
        {
          headers: { data: localStorage.getItem("usercred") },
        }
      );
      console.log(result);
      await openGroupSettings();
    } else {
      alert("you are not admin");
    }
  }
}

async function submitChangedSettings() {
  let boolean =
    document.getElementById("isAdmin").innerText === "you are admin"
      ? true
      : false;
  if (boolean) {
    let arr = [];
    document.querySelectorAll(".newGrpMember").forEach((li) => {
      arr.push(li.id);
    });
    let groupId = document.getElementsByClassName("groupName")[0].id;
    let object = {
      groupId: groupId,
      newGroupName: document.getElementById("newgroupname").value,
      newUsers: arr,
    };
    let result = await axios.post(http + `/changeGroupSettings`, object, {
      headers: { data: localStorage.getItem("usercred") },
    });

    alert(result.msg);
    console.log(object);
    document.getElementById("newgroupname").value = "";
    document.getElementById("groupSettings").style.display = "none";
  } else {
    alert("you are not admin");
  }
}

function addNewUser(e) {
  if (e.target.className == "moreUser") {
    let li = document.createElement("li");
    li.className = "newGrpMember";
    li.id = e.target.id;
    // li.innerText=e.target.innerText
    let span = document.createElement("span");
    span.innerText = e.target.innerText;
    li.appendChild(span);
    let btn = document.createElement("button");
    btn.innerText = "remove";
    btn.classList.add("btn", "removeNewMember");
    li.appendChild(btn);
    document.getElementById("newMembers").appendChild(li);
  }
  e.target.parentNode.removeChild(e.target);
}

function removeNewUser(e) {
  if (e.target.className.includes("removeNewMember")) {
    let li = document.createElement("li");
    li.id = e.target.parentNode.id;
    li.innerText = e.target.parentNode.firstChild.innerText;
    li.classList = ["moreUser"];
    document.getElementById("moreUsers").appendChild(li);
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
  }
}

async function loadLeftUsers(id) {
  let remainingusers = await axios.get(http + `/remainingUsers/${id}`, {
    headers: { data: localStorage.getItem("usercred") },
  });
  let ul = document.getElementById("moreUsers");
  clearUl(ul);
  ul = document.getElementById("newMembers");
  clearUl(ul);

  remainingusers.forEach((user) => {
    let li = document.createElement("li");
    li.innerText = user.name;
    li.id = user.id;
    li.className = "moreUser";
    document.getElementById("moreUsers").appendChild(li);
  });
}
//http://localhost:3000/chat/

//utility fuinctions
function clearUl(ul) {
  while (ul.firstChild) {
    ul.removeChild(ul.lastChild);
  }
}

function createSpan(classanme, inntertext) {
  let span = document.createElement("span");
  span.className = classanme;
  span.innerText = inntertext;
  return span;
}
function createbtn(classname, text) {
  let btn = document.createElement("button");
  btn.innerText = text;
  btn.className = classname;
  return btn;
}
