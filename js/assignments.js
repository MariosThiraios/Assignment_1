let assignments = [];

// Global variables
let assignmentTitle = document.getElementById("assignmentTitle");
let assignmentDescription = document.getElementById("assignmentDescription");
let assignmentOralMark = document.getElementById("assignmentOralMark");
let assignmentTotalMark = document.getElementById("assignmentTotalMark");
let assignmentSubDateTime = document.getElementById("assignmentSubDateTime");

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
function Assignment(name, description, oralMark, totalMark, subDateTime) {
    this.name = name;
    this.description = description;
    this.oralMark = oralMark;
    this.totalMark = totalMark;
    this.subDateTime = subDateTime;
}
/**************************************************************************/

function assignmentToString(assignment) {
    return (`Assingment: ${assignment.name}, Description: ${assignment.description}, Oral Mark: ${assignment.oralMark}, Total Mark: ${assignment.totalMark}, Submition Date Until: ${assignment.subDateTime}`);
}

function submit(event) {
    event.preventDefault();
    let myassignment = new Assignment(assignmentTitle.value, assignmentDescription.value, assignmentOralMark.value, assignmentTotalMark.value, assignmentSubDateTime.value);
    validations()
    assignments.push(myassignment);
    // edit button
    let btnEdit = document.createElement("button");
    btnEdit.textContent = "Edit";
    btnEdit.id = "edit";
    btnEdit.assignmentIndex = assignments.length - 1; // custom atribute
    btnEdit.addEventListener("click", edit);
    createLiElement(myassignment, btnEdit);
    btnReset.click();
}

function reset() {
    btnSubmit.textContent = "Add";
}

function edit() {
    assignmentTitle.value = assignments[this.assignmentIndex].name;
    assignmentDescription.value = assignments[this.assignmentIndex].description;
    assignmentOralMark.value = assignments[this.assignmentIndex].oralMark;
    assignmentTotalMark.value = assignments[this.assignmentIndex].totalMark;
    assignmentSubDateTime.value = assignments[this.assignmentIndex].subDateTime;
    btnSubmit.hidden = true;
    btnUpdate.hidden = false;
    btnUpdate.assignmentIndex = this.assignmentIndex;
}

function update(event) {
    event.preventDefault();
    assignments[this.assignmentIndex] = new Assignment(assignmentTitle.value,assignmentDescription.value, assignmentOralMark.value,  assignmentTotalMark.value, assignmentSubDateTime.value);
    validations();
    ul.innerHTML = "";
    for (let i = 0; i < assignments.length; i++) {
        let btnEdit = document.createElement("button");
        btnEdit.textContent = "Edit";
        btnEdit.id = "edit";
        btnEdit.assignmentIndex = i;
        btnEdit.addEventListener("click", edit);
        createLiElement(assignments[i], btnEdit);
    }
    btnUpdate.hidden = true;
    btnSubmit.hidden = false;
    btnReset.click();
}

function createLiElement(assignment, editButton) {
    let li = document.createElement("li");
    li.id = "liFromJs";
    li.innerText = assignmentToString(assignment);
    li.append(editButton);
    ul.appendChild(li);
}

function validations() {
    if (assignmentTitle.value.length < 5 || assignmentTitle.value.length > 20) {
        assignmentTitle.focus();
        alert("Enter Assignment Title");
        createLiElement() = false;
    }
    if (assignmentDescription.value.length < 5 || assignmentDescription.value.length > 20) {
        assignmentDescription.focus();
        alert("Enter Assignment's Description");
        createLiElement() = false;
    }
    if (assignmentOralMark.value < 0 || assignmentOralMark.value > 100) {
        assignmentOralMark.focus();
        alert("Select Assignment's Oral Mark");
        createLiElement() = false;
    }
    if (assignmentTotalMark.value < 0 || assignmentTotalMark.value > 100) {
        assignmentTotalMark.focus();
        alert("Enter Assignment's Total Mark");
        createLiElement() = false;
    }
    if (assignmentSubDateTime.value == "") {
        assignmentSubDateTime.focus();
        alert("Enter Assignment Submition Date");
        createLiElement() = false;
    } else {
        return true;
    }
}