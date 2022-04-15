let courses = [];

// Global variables
let courseTitle = document.getElementById("courseTitle");
let courseLvl = document.getElementById("courseLvl");
let courseType = document.getElementById("courseType");
let courseStartDate = document.getElementById("courseStartDate");
let courseEndDate = document.getElementById("courseEndDate");

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
function Course(title, lvl, type, startDate, endDate) {
    this.title = title;
    this.lvl = lvl;
    this.type = type;
    this.startDate = startDate;
    this.endDate = endDate;
}
/**************************************************************************/

function courseToString(course) {
    return (`Course: ${course.title}, Level: ${course.lvl}, Type: ${course.type}, Starts at: ${course.startDate}, Ends at: ${course.endDate}`);
}

function submit(event) {
    event.preventDefault()
    let myCourse = new Course(courseTitle.value, courseLvl.value, courseType.value, courseStartDate.value, courseEndDate.value);
    validations();
    courses.push(myCourse);
    // edit button
    let btnEdit = document.createElement("button");
    btnEdit.textContent = "Edit";
    btnEdit.id = "edit";
    btnEdit.courseIndex = courses.length - 1; // custom atribute
    btnEdit.addEventListener("click", edit);
    createLiElement(myCourse, btnEdit);
    btnReset.click();
}

function reset() {
    btnSubmit.textContent = "Add";
}

function edit() {
    courseTitle.value = courses[this.courseIndex].title;
    courseLvl.value = courses[this.courseIndex].lvl;
    courseType.value = courses[this.courseIndex].type;
    courseStartDate.value = courses[this.courseIndex].startDate;
    courseEndDate.value = courses[this.courseIndex].endDate;
    btnSubmit.hidden = true;
    btnUpdate.hidden = false;
    btnUpdate.courseIndex = this.courseIndex;
}

function update(event) {
    event.preventDefault();
    courses[this.courseIndex] = new Course(courseTitle.value, courseLvl.value, courseType.value, courseStartDate.value, courseEndDate.value);
    validations();
    ul.innerHTML = "";
    for (let i = 0; i < courses.length; i++) {
        let btnEdit = document.createElement("button");
        btnEdit.textContent = "Edit";
        btnEdit.id = "edit";
        btnEdit.courseIndex = i;
        btnEdit.addEventListener("click", edit);
        createLiElement(courses[i], btnEdit);
    }
    btnUpdate.hidden = true;
    btnSubmit.hidden = false;
    btnReset.click();
}

function createLiElement(course, editButton) {
    let li = document.createElement("li");
    li.id = "liFromJs";
    li.innerText = courseToString(course);
    li.append(editButton);
    ul.appendChild(li);
}

function validations() {
    if (courseTitle.value.length < 5 || courseTitle.value.length > 20) {
        courseTitle.focus();
        alert("Enter Course Name");
        createLiElement() = false;
    }
    if (courseLvl.value == "") {
        courseLvl.focus();
        alert("Select Course lvl");
        createLiElement() = false;
    }
    if (courseType.value == "") {
        courseType.focus();
        alert("Select Course Type");
        createLiElement() = false;
    }
    if (courseStartDate.value == "") {
        courseStartDate.focus();
        alert("Select Course Start Date");
        createLiElement() = false;
    }
    if (courseEndDate.value == "") {
        courseEndDate.focus();
        alert("Select Course End Date");
        createLiElement() = false;
    } else {
        return true;
    }
}