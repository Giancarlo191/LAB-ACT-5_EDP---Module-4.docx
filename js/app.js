const profileCard = document.getElementById("profileCard");
const profileName = document.getElementById("profileName");
const profileProgram = document.getElementById("profileProgram");
const profileYear = document.getElementById("profileYear");
const profileStatus = document.getElementById("profileStatus");
const detailsPanel = document.getElementById("detailsPanel");
const studentIdDisplay = document.getElementById("studentIdDisplay");
const formMessage = document.getElementById("formMessage");

const nameInput = document.getElementById("nameInput");
const programInput = document.getElementById("programInput");
const yearInput = document.getElementById("yearInput");
const statusInput = document.getElementById("statusInput");

const updateBtn = document.getElementById("updateBtn");
const toggleDetailsBtn = document.getElementById("toggleDetailsBtn");
const themeBtn = document.getElementById("themeBtn");
const resetBtn = document.getElementById("resetBtn");

const activeProfileCard = document.querySelector(".profile-card");

const initialState = {
  name: "Maria Santos",
  program: "BS Information Technology",
  year: "3rd Year",
  status: "active",
  studentId: profileCard ? profileCard.dataset.studentId : "2026-001",
};

function isValidStudentName(name) {
  if (typeof name !== "string") return false;
  return name.trim().length >= 2;
}

function formatStudentStatus(status) {
  if (status === "active") return "Active";
  if (status === "inactive") return "Inactive";
  return "";
}

function setStatus(status) {
  if (!profileCard || !profileStatus) return;
  if (status !== "active" && status !== "inactive") return;

  profileCard.dataset.status = status;
  profileStatus.textContent = formatStudentStatus(status);

  if (status === "active") {
    profileCard.classList.add("active");
    profileCard.classList.remove("inactive");
  } else {
    profileCard.classList.add("inactive");
    profileCard.classList.remove("active");
  }
}

function updateProfile() {
  if (!nameInput || !formMessage) return;

  const nameValue = nameInput.value;

  if (!isValidStudentName(nameValue)) {
    formMessage.textContent = "Student name is required";
    return;
  }

  formMessage.textContent = "";

  if (profileName) {
    profileName.textContent = nameValue.trim();
  }

  if (profileProgram && programInput) {
    profileProgram.textContent = programInput.value;
  }

  if (profileYear && yearInput) {
    profileYear.textContent = yearInput.value;
  }

  if (statusInput) {
    setStatus(statusInput.value);
  }
}

function toggleDetails() {
  if (!detailsPanel) return;
  detailsPanel.classList.toggle("hidden");
}

function toggleTheme() {
  if (!document.body) return;
  document.body.classList.toggle("dark-theme");
}

function resetProfile() {

  if (profileName) profileName.textContent = initialState.name;
  if (profileProgram) profileProgram.textContent = initialState.program;
  if (profileYear) profileYear.textContent = initialState.year;

  
  setStatus(initialState.status);

  
  if (studentIdDisplay && profileCard) {
    studentIdDisplay.textContent = "Student ID: " + profileCard.dataset.studentId;
  }

  if (nameInput) nameInput.value = initialState.name;
  if (programInput) programInput.value = initialState.program;
  if (yearInput) yearInput.value = initialState.year;
  if (statusInput) statusInput.value = initialState.status;

  if (formMessage) formMessage.textContent = "";

  if (detailsPanel) detailsPanel.classList.remove("hidden");

  if (document.body) document.body.classList.remove("dark-theme");
}

function initializeApp() {
 
  if (studentIdDisplay && profileCard && profileCard.dataset.studentId) {
    studentIdDisplay.textContent = "Student ID: " + profileCard.dataset.studentId;
  }

  if (nameInput) nameInput.value = initialState.name;
  if (programInput) programInput.value = initialState.program;
  if (yearInput) yearInput.value = initialState.year;
  if (statusInput) statusInput.value = initialState.status;

  if (updateBtn) updateBtn.addEventListener("click", updateProfile);
  if (toggleDetailsBtn) toggleDetailsBtn.addEventListener("click", toggleDetails);
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
  if (resetBtn) resetBtn.addEventListener("click", resetProfile);
}

initializeApp();
