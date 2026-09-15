/* ============================================================
   Interactive Student Profile Controller
   ============================================================ */

/* -------------------- DOM SELECTION -------------------- */
/* getElementById() used for required elements */
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

/* querySelector() usage (required at least one) */
const activeProfileCard = document.querySelector(".profile-card");

/* -------------------- INITIAL STATE SNAPSHOT -------------------- */
/* Captured once at load so resetProfile() can restore it exactly. */
const initialState = {
  name: "Maria Santos",
  program: "BS Information Technology",
  year: "3rd Year",
  status: "active",
  studentId: profileCard ? profileCard.dataset.studentId : "2026-001",
};

/* ============================================================
   REQUIRED FUNCTIONS
   ============================================================ */

/**
 * isValidStudentName(name)
 * Returns true when the trimmed name has at least 2 characters.
 */
function isValidStudentName(name) {
  if (typeof name !== "string") return false;
  return name.trim().length >= 2;
}

/**
 * formatStudentStatus(status)
 * Returns "Active" for "active" and "Inactive" for "inactive".
 */
function formatStudentStatus(status) {
  if (status === "active") return "Active";
  if (status === "inactive") return "Inactive";
  return "";
}

/**
 * setStatus(status)
 * Updates the profile status text, data-status attribute,
 * and active/inactive CSS classes on the profile card.
 */
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

/**
 * updateProfile()
 * Validates the form, then updates the profile card
 * using the current control values.
 */
function updateProfile() {
  if (!nameInput || !formMessage) return;

  const nameValue = nameInput.value;

  if (!isValidStudentName(nameValue)) {
    formMessage.textContent = "Student name is required";
    return;
  }

  // Clear any previous message on a successful validation
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

/**
 * toggleDetails()
 * Shows or hides the details panel using classList.toggle().
 */
function toggleDetails() {
  if (!detailsPanel) return;
  detailsPanel.classList.toggle("hidden");
}

/**
 * toggleTheme()
 * Toggles the "dark-theme" class on document.body.
 */
function toggleTheme() {
  if (!document.body) return;
  document.body.classList.toggle("dark-theme");
}

/**
 * resetProfile()
 * Restores the exact initial profile data, status, controls,
 * message, details visibility, and theme.
 */
function resetProfile() {
  // Restore profile card text content
  if (profileName) profileName.textContent = initialState.name;
  if (profileProgram) profileProgram.textContent = initialState.program;
  if (profileYear) profileYear.textContent = initialState.year;

  // Restore status (text, dataset, classes)
  setStatus(initialState.status);

  // Restore student ID display from dataset
  if (studentIdDisplay && profileCard) {
    studentIdDisplay.textContent = "Student ID: " + profileCard.dataset.studentId;
  }

  // Restore form controls
  if (nameInput) nameInput.value = initialState.name;
  if (programInput) programInput.value = initialState.program;
  if (yearInput) yearInput.value = initialState.year;
  if (statusInput) statusInput.value = initialState.status;

  // Clear validation/success message
  if (formMessage) formMessage.textContent = "";

  // Ensure details panel is visible
  if (detailsPanel) detailsPanel.classList.remove("hidden");

  // Remove dark theme
  if (document.body) document.body.classList.remove("dark-theme");
}

/* ============================================================
   INITIALIZATION
   ============================================================ */

function initializeApp() {
  // Show initial student ID from the data attribute (defensive read)
  if (studentIdDisplay && profileCard && profileCard.dataset.studentId) {
    studentIdDisplay.textContent = "Student ID: " + profileCard.dataset.studentId;
  }

  // Sync controls with the initial profile values
  if (nameInput) nameInput.value = initialState.name;
  if (programInput) programInput.value = initialState.program;
  if (yearInput) yearInput.value = initialState.year;
  if (statusInput) statusInput.value = initialState.status;

  // Wire up event listeners (only if elements exist)
  if (updateBtn) updateBtn.addEventListener("click", updateProfile);
  if (toggleDetailsBtn) toggleDetailsBtn.addEventListener("click", toggleDetails);
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
  if (resetBtn) resetBtn.addEventListener("click", resetProfile);
}

initializeApp();