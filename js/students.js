let students = [];

// Global variables
let studentsFirstName = document.getElementById("studentsFirstName");
let studentsLasteName = document.getElementById("studentsLasteName");
let studentsDateOfBirth = document.getElementById("studentsDateOfBirth");
let tuitionFees = document.getElementById("tuitionFees");
let studentsMail = document.getElementById("studentsMail");

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
function Student(name, lastName, dateOfBirth, tuitionFees, email) {
    this.name = name;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.tuitionFees = tuitionFees;
    this.email = email;
}
/**************************************************************************/
function studentToString(student) {
    return (`Name: ${student.name}, Last Name: ${student.lastName} Date of Birth: ${student.dateOfBirth}, Tuition Fees: ${student.tuitionFees}, Email: ${student.email}`);
}

function submit(event) {
    event.preventDefault();
    let myStudent = new Student(studentsFirstName.value, studentsLasteName.value, studentsDateOfBirth.value, tuitionFees.value, studentsMail.value);
    validations()
    students.push(myStudent);
    // edit button
    let btnEdit = document.createElement("button");
    btnEdit.textContent = "Edit";
    btnEdit.id = "edit";
    btnEdit.studentIndex = students.length - 1; // custom atribute
    btnEdit.addEventListener("click", edit);
    createLiElement(myStudent, btnEdit);
    btnReset.click();
}

function reset() {
    btnSubmit.textContent = "Add";
}

function edit() {
    studentsFirstName.value = students[this.studentIndex].name;
    studentsLasteName.value = students[this.studentIndex].lastName;
    studentsDateOfBirth.value = students[this.studentIndex].dateOfBirth;
    tuitionFees.value = students[this.studentIndex].phoneNumber;
    studentsMail.value = students[this.studentIndex].email;
    btnSubmit.hidden = true;
    btnUpdate.hidden = false;
    btnUpdate.studentIndex = this.studentIndex;
}

function update(event) {
    event.preventDefault();
    students[this.studentIndex] = new Student(studentsFirstName.value, studentsLasteName.value, studentsDateOfBirth.value, tuitionFees.value, studentsMail.value);
    validations();
    ul.innerHTML = "";
    for (let i = 0; i < students.length; i++) {
        let btnEdit = document.createElement("button");
        btnEdit.textContent = "Edit";
        btnEdit.id = "edit";
        btnEdit.studentIndex = i;
        btnEdit.addEventListener("click", edit);
        createLiElement(students[i], btnEdit);
    }
    btnUpdate.hidden = true;
    btnSubmit.hidden = false;
    btnReset.click();
}

function createLiElement(student, editButton) {
    let li = document.createElement("li");
    li.id = "liFromJs";
    li.innerText = studentToString(student);
    li.append(editButton);
    ul.appendChild(li);

}

function validations() {
    if (studentsFirstName.value.length < 5 || studentsFirstName.value.length > 20) {
        studentsFirstName.focus();
        alert("Enter Student's Name");
        createLiElement() = false;
    }
    if (studentsLasteName.value.length < 5 || studentsLasteName.value.length > 20) {
        studentsLasteName.focus();
        alert("Enter Student's Last Name");
        createLiElement() = false;
    }
    if (studentsDateOfBirth.value == "") {
        studentsDateOfBirth.focus();
        alert("Select Date of Birth");
        createLiElement() = false;
    }
    if (tuitionFees.value < 0 || tuitionFees.value > 10000 ) {
        tuitionFees.focus();
        alert("Enter Tuition Fees");
        createLiElement() = false;
    }
    if (studentsMail.value.length < 5 || studentsMail.value.length > 20) {
        studentsMail.focus();
        alert("Enter an email");
        createLiElement() = false;
    } else {
        return true;
    }
}