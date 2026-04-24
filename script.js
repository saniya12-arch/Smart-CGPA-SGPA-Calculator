function login() {
  let name = document.getElementById("name").value;
  let password = document.getElementById("password").value;

  let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

  if (name === "" || password === "") {
    alert("Enter all details");
    return;
  }

  if (!pattern.test(password)) {
    alert("Password must contain uppercase, lowercase and number");
    return;
  }

  document.getElementById("studentName").innerText = "👤 " + name;

  document.getElementById("loginPage").style.display = "none";
  document.getElementById("mainPage").style.display = "block";
}

// ADD SUBJECT
function addSubject() {
  let table = document.getElementById("subjectTable");

  let row = table.insertRow();

  row.insertCell(0).innerHTML = "Subject";
  row.insertCell(1).innerHTML = '<input class="marks">';
  row.insertCell(2).innerHTML = '<input class="credits">';
}

// AUTO LOAD 5 SUBJECTS
window.onload = function() {
  for (let i = 0; i < 5; i++) addSubject();
};

// GRADE POINT
function getGradePoint(marks) {
  if (marks >= 90) return 10;
  else if (marks >= 80) return 9;
  else if (marks >= 70) return 8;
  else if (marks >= 60) return 7;
  else if (marks >= 50) return 6;
  else return 0;
}

// SGPA
function calculateSGPA() {
  let marks = document.getElementsByClassName("marks");
  let credits = document.getElementsByClassName("credits");

  let totalPoints = 0;
  let totalCredits = 0;

  for (let i = 0; i < marks.length; i++) {
    let m = Number(marks[i].value);
    let c = Number(credits[i].value);

    if (!m || !c) continue;

    let gp = getGradePoint(m);

    totalPoints += gp * c;
    totalCredits += c;
  }

  if (totalCredits === 0) {
    document.getElementById("sgpaResult").innerText = "Enter valid data";
    return;
  }

  let sgpa = (totalPoints / totalCredits).toFixed(2);
  document.getElementById("sgpaResult").innerText = "SGPA: " + sgpa;
}

// CGPA
function calculateCGPA() {
  let prevCgpa = Number(document.getElementById("prevCgpa").value);
  let prevSem = Number(document.getElementById("prevSem").value);

  let sgpaText = document.getElementById("sgpaResult").innerText;

  if (!sgpaText) {
    alert("Calculate SGPA first");
    return;
  }

  let sgpa = Number(sgpaText.replace("SGPA: ", ""));

  let cgpa = ((prevCgpa * prevSem) + sgpa) / (prevSem + 1);

  document.getElementById("cgpaResult").innerText =
    "CGPA: " + cgpa.toFixed(2);
}

// PDF
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let name = document.getElementById("studentName").innerText;
  let usn = document.getElementById("usn").value;
  let dept = document.getElementById("dept").value;
  let degree = document.getElementById("degree").value;
  let sgpa = document.getElementById("sgpaResult").innerText;
  let cgpa = document.getElementById("cgpaResult").innerText;

  doc.text("Student Result", 20, 20);
  doc.text(name, 20, 40);
  doc.text("USN: " + usn, 20, 50);
  doc.text("Dept: " + dept, 20, 60);
  doc.text("Degree: " + degree, 20, 70);
  doc.text(sgpa, 20, 90);
  doc.text(cgpa, 20, 100);

  doc.save("Result.pdf");
}
