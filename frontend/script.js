let complaints = [];
let nextId = 1;
let selectedComplaintId = null;

const complaintForm = document.querySelector("#complaintForm");
const complaintIdField = document.querySelector("#complaintId");
const residentNameInput = document.querySelector("#residentName");
const roomNumberInput = document.querySelector("#roomNumber");
const contactInfoInput = document.querySelector("#contactInfo");
const categoryInput = document.querySelector("#category");
const priorityInput = document.querySelector("#priority");
const descriptionInput = document.querySelector("#description");
const additionalInfoInput = document.querySelector("#additionalInfo");
const submitButton = document.querySelector("#submitButton");
const formMessage = document.querySelector("#formMessage");

const complaintList = document.querySelector("#complaintList");
const complaintCount = document.querySelector("#complaintCount");
const searchInput = document.querySelector("#searchInput");
const categoryFilter = document.querySelector("#categoryFilter");
const statusFilter = document.querySelector("#statusFilter");

const detailsPanel = document.querySelector("#detailsPanel");
const detailsBody = document.querySelector("#detailsBody");
const detailsMessage = document.querySelector("#detailsMessage");
const closeDetails = document.querySelector("#closeDetails");
const statusSelect = document.querySelector("#statusSelect");
const updateStatusButton = document.querySelector("#updateStatusButton");
const editButton = document.querySelector("#editButton");
const deleteButton = document.querySelector("#deleteButton");

function saveState() {
  localStorage.setItem(
    "residentCareState",
    JSON.stringify({ complaints, nextId }),
  );
}

function loadState() {
  const savedText = localStorage.getItem("residentCareState");
  if (!savedText) {
    return;
  }
  const saved = JSON.parse(savedText);
  complaints = saved.complaints || [];
  nextId = saved.nextId || 1;
}

function findComplaint(id) {
  return complaints.find(function (item) {
    return item.id === id;
  });
}

function statusPillClass(status) {
  const map = {
    Open: "pill-open",
    "In Progress": "pill-in-progress",
    Resolved: "pill-resolved",
    Cancelled: "pill-cancelled",
  };
  return map[status] || "pill-open";
}

function showMessage(target, text, type) {
  target.textContent = text;
  target.classList.remove("error", "success");
  if (type) {
    target.classList.add(type);
  }
}

function getFilteredComplaints() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;
  const status = statusFilter.value;

  return complaints.filter(function (item) {
    const matchesSearch =
      !searchTerm ||
      item.residentName.toLowerCase().includes(searchTerm) ||
      item.roomNumber.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm);

    const matchesCategory = !category || item.category === category;
    const matchesStatus = !status || item.status === status;

    return matchesSearch && matchesCategory && matchesStatus;
  });
}

function renderComplaintList() {
  const filtered = getFilteredComplaints();
  complaintList.innerHTML = "";
  complaintCount.textContent = `${complaints.length} complaint${complaints.length === 1 ? "" : "s"}`;

  if (filtered.length === 0) {
    const emptyDiv = document.createElement("div");
    emptyDiv.className = "empty-state";
    emptyDiv.textContent = "No complaints match your search/filter.";
    complaintList.append(emptyDiv);
    return;
  }

  for (const item of filtered) {
    const card = document.createElement("div");
    card.className = "complaint-card";
    card.dataset.complaintId = item.id;

    card.innerHTML = `
      <div>
        <h3>${item.category} - ${item.roomNumber}</h3>
        <p class="complaint-meta">${item.residentName} &middot; ${item.priority} priority &middot; ${item.date}</p>
      </div>
      <span class="pill ${statusPillClass(item.status)}">${item.status}</span>
    `;

    complaintList.append(card);
  }
}

function renderDetails(id) {
  const item = findComplaint(id);
  if (!item) {
    return;
  }

  selectedComplaintId = id;
  detailsPanel.hidden = false;
  showMessage(detailsMessage, "", null);

  detailsBody.innerHTML = `
    <p><strong>Resident:</strong> ${item.residentName}</p>
    <p><strong>Room/Flat:</strong> ${item.roomNumber}</p>
    <p><strong>Contact:</strong> ${item.contactInfo}</p>
    <p><strong>Category:</strong> ${item.category}</p>
    <p><strong>Priority:</strong> ${item.priority}</p>
    <p><strong>Date:</strong> ${item.date}</p>
    <p><strong>Description:</strong> ${item.description}</p>
    <p><strong>Additional Info:</strong> ${item.additionalInfo || "None"}</p>
    <p><strong>Status:</strong> <span class="pill ${statusPillClass(item.status)}">${item.status}</span></p>
  `;

  statusSelect.value = item.status;
  detailsPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetForm() {
  complaintForm.reset();
  complaintIdField.value = "";
  submitButton.textContent = "Submit Complaint";
}

function fillFormForEdit(item) {
  complaintIdField.value = item.id;
  residentNameInput.value = item.residentName;
  roomNumberInput.value = item.roomNumber;
  contactInfoInput.value = item.contactInfo;
  categoryInput.value = item.category;
  priorityInput.value = item.priority;
  descriptionInput.value = item.description;
  additionalInfoInput.value = item.additionalInfo || "";
  submitButton.textContent = "Update Complaint";
  complaintForm.scrollIntoView({ behavior: "smooth", block: "start" });
}

complaintForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const residentName = residentNameInput.value.trim();
  const roomNumber = roomNumberInput.value.trim();
  const contactInfo = contactInfoInput.value.trim();
  const category = categoryInput.value;
  const priority = priorityInput.value;
  const description = descriptionInput.value.trim();
  const additionalInfo = additionalInfoInput.value.trim();

  if (
    !residentName ||
    !roomNumber ||
    !contactInfo ||
    !category ||
    !priority ||
    !description
  ) {
    showMessage(formMessage, "Please fill in all required fields.", "error");
    return;
  }

  const editingId = complaintIdField.value
    ? Number(complaintIdField.value)
    : null;

  if (editingId) {
    const item = findComplaint(editingId);
    if (!item) {
      showMessage(formMessage, "Complaint no longer exists.", "error");
      return;
    }
    item.residentName = residentName;
    item.roomNumber = roomNumber;
    item.contactInfo = contactInfo;
    item.category = category;
    item.priority = priority;
    item.description = description;
    item.additionalInfo = additionalInfo;

    showMessage(formMessage, "Complaint updated successfully.", "success");
  } else {
    const newComplaint = {
      id: nextId,
      residentName,
      roomNumber,
      contactInfo,
      category,
      priority,
      description,
      additionalInfo,
      date: new Date().toISOString().slice(0, 10),
      status: "Open",
    };
    complaints.push(newComplaint);
    nextId += 1;

    showMessage(formMessage, "Complaint submitted successfully.", "success");
  }

  resetForm();
  saveState();
  renderComplaintList();
});

complaintList.addEventListener("click", function (event) {
  const card = event.target.closest("[data-complaint-id]");
  if (!card) {
    return;
  }
  renderDetails(Number(card.dataset.complaintId));
});

searchInput.addEventListener("input", renderComplaintList);
categoryFilter.addEventListener("change", renderComplaintList);
statusFilter.addEventListener("change", renderComplaintList);

closeDetails.addEventListener("click", function () {
  detailsPanel.hidden = true;
  selectedComplaintId = null;
});

updateStatusButton.addEventListener("click", function () {
  const item = findComplaint(selectedComplaintId);
  if (!item) {
    return;
  }
  item.status = statusSelect.value;
  saveState();
  renderComplaintList();
  renderDetails(item.id);
  showMessage(detailsMessage, "Status updated.", "success");
});

editButton.addEventListener("click", function () {
  const item = findComplaint(selectedComplaintId);
  if (!item) {
    return;
  }
  fillFormForEdit(item);
});

deleteButton.addEventListener("click", function () {
  const item = findComplaint(selectedComplaintId);
  if (!item) {
    return;
  }
  const confirmed = confirm(
    `Delete complaint from ${item.residentName} (${item.roomNumber})?`,
  );
  if (!confirmed) {
    return;
  }
  complaints = complaints.filter(function (c) {
    return c.id !== item.id;
  });
  detailsPanel.hidden = true;
  selectedComplaintId = null;
  saveState();
  renderComplaintList();
});

loadState();
renderComplaintList();
