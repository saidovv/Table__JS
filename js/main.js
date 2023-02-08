let tbody = document.querySelector(".tbody");
let addForm = document.querySelector(".addForm");
let editForm = document.querySelector(".editForm");
let idx = null;
let users = [];

// modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// MODAL 

addForm.onsubmit = (event) => {
  event.preventDefault();
  const target = event.target;

  let user = {
    id: new Date().getTime(),
    firstName: target["firstName"].value,
    lastName: target["lastName"].value,
    age: target["age"].value,
    phone: target["phone"].value,
  };
 
  users.push(user);

  addForm.reset();
  render();
};

editForm.onsubmit = (event) => {
  event.preventDefault();
  const target = event.target;

  users = users.map((user) => {
    if (user.id === idx) {
      user.firstName = target["firstName"].value;
      user.lastName = target["lastName"].value;
      user.age = target["age"].value;
      user.phone = target["phone"].value;
    }
    return user;
  });
  modal.style.display = "none";

  render();
};

function deleteUser(id) {
  users = users.filter((user) => user.id !== id);
  render();
}


// SORT

function sortTable(field) {
  return (a, b) => a[field] > b[field] ? 1 : -1;
}

function render() {
  tbody.innerHTML = "";
  users.sort(sortTable('firstName'));

  users.forEach((user, index) => {
    let tr = document.createElement("tr");
    tr.appendChild(genTd(index + 1));
    tr.appendChild(genTd(user.firstName));
    tr.appendChild(genTd(user.lastName));
    tr.appendChild(genTd(user.age));
    tr.appendChild(genTd(user.phone));
    
    let td = document.createElement("td");
    let btnEdit = document.createElement("button");
    btnEdit.innerHTML = "edit";
    
    btnEdit.onclick = () => {
      idx = user.id;
      editForm["firstName"].value = user.firstName;
      editForm["lastName"].value = user.lastName;
      editForm["age"].value = user.age;
      editForm["phone"].value = user.phone;
      modal.style.display = "block";
    };

    td.appendChild(btnEdit);
    tr.appendChild(td);
    let tdDel = document.createElement("td");
    let btnDel = document.createElement("button");
    btnDel.innerHTML = "delete";

    btnDel.onclick = () => deleteUser(user.id);

    tdDel.appendChild(btnDel);
    tr.appendChild(tdDel);
    tbody.appendChild(tr);
  });
}


// td

function genTd(value) {
  let td = document.createElement("td");
  td.innerHTML = value;

  return td;
}

render();
