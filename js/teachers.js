let teachers = [];

// Global variables
let teacherName = document.getElementById("teacherName");
let teacherLastName = document.getElementById("teacherLastName");
let subject = document.getElementById("subject");

let btnSubmit = document.getElementById("submit");
btnSubmit.addEventListener("click", submit);

let btnReset = document.getElementById("reset");
btnReset.addEventListener("click", reset);

let btnUpdate = document.getElementById("update");
btnUpdate.addEventListener("click", update);

let ul = document.createElement("ul");
ul.className = "ulFromJs";
document.body.append(ul);

/**************************************************************************/
// constractor
function Teacher(name, lastName, subject,) {
    this.name = name;
    this.lastName = lastName;
    this.subject = subject;
}
/**************************************************************************/

function teacherToString(teacher) {
    return (` Name: ${teacher.name}, Last Name: ${teacher.lastName}, Subject: ${teacher.subject}`);
}

function submit(event) {
    event.preventDefault();
    let myteacher = new Teacher(teacherName.value, teacherLastName.value, subject.value);
    validations()
    teachers.push(myteacher);
    // edit button
    let btnEdit = document.createElement("button");
    btnEdit.textContent = "Edit";
    btnEdit.id = "edit";
    btnEdit.teacherIndex = teachers.length - 1; // custom atribute
    btnEdit.addEventListener("click", edit);
    createLiElement(myteacher, btnEdit);
    btnReset.click();
}

function reset() {
    btnSubmit.textContent = "Add";
}

function edit() {
    teacherName.value = teachers[this.teacherIndex].name;
    teacherLastName.value = teachers[this.teacherIndex].lastName;
    subject.value = teachers[this.teacherIndex].subject;
    btnSubmit.hidden = true;
    btnUpdate.hidden = false;
    btnUpdate.teacherIndex = this.teacherIndex;
}

function update(event) {
    event.preventDefault();
    teachers[this.teacherIndex] = new Teacher(teacherName.value, teacherLastName.value, subject.value);
    validations();
    ul.innerHTML = "";
    for (let i = 0; i < teachers.length; i++) {
        let btnEdit = document.createElement("button");
        btnEdit.textContent = "Edit";
        btnEdit.id = "edit";
        btnEdit.teacherIndex = i;
        btnEdit.addEventListener("click", edit);
        createLiElement(teachers[i], btnEdit);
    }
    btnUpdate.hidden = true;
    btnSubmit.hidden = false;
    btnReset.click();
}

function createLiElement(teacher, editButton) {
    let li = document.createElement("li");
    li.id = "liFromJs";
    li.innerText = teacherToString(teacher);
    li.append(editButton);
    ul.appendChild(li);
}

function validations() {
    if (teacherName.value.length < 5 || teacherName.value.length > 20) {
        teacherName.focus();
        alert("Enter Teacher's Name");
        createLiElement() = false;
    }
    if (teacherLastName.value.length < 5 || teacherLastName.value.length > 20) {
        teacherLastName.focus();
        alert("Enter Teacher's Last Name");
        createLiElement() = false;
    }
    if (subject.value == "") {
        subject.focus();
        alert("Select a Subject");
        createLiElement() = false;
    } else {
        return true;
    }
}