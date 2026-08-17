const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", function (request, response) {
  response.send("ResidentCare Complaint API is running");
});

const VALID_CATEGORIES = [
  "Electricity",
  "Plumbing",
  "Water Supply",
  "Internet",
  "Housekeeping",
  "Maintenance",
  "Other",
];

const VALID_PRIORITIES = ["Low", "Medium", "High", "Urgent"];
const VALID_STATUSES = ["Open", "In Progress", "Resolved", "Cancelled"];

let complaints = [];
let nextComplaintId = 1;

function findComplaint(complaintId) {
  return complaints.find(function (item) {
    return item.id === Number(complaintId);
  });
}

app.post("/api/complaints", function (request, response) {
  const {
    residentName,
    roomNumber,
    contactInfo,
    category,
    priority,
    description,
    additionalInfo,
  } = request.body;

  if (!residentName || !roomNumber || !contactInfo || !category || !priority || !description) {
    return response.status(400).json({ message: "Please provide all required complaint fields." });
  }

  if (!VALID_CATEGORIES.includes(category)) {
    return response.status(400).json({ message: "Invalid complaint category." });
  }

  if (!VALID_PRIORITIES.includes(priority)) {
    return response.status(400).json({ message: "Invalid priority level." });
  }

  const newComplaint = {
    id: nextComplaintId,
    residentName,
    roomNumber,
    contactInfo,
    category,
    priority,
    description,
    additionalInfo: additionalInfo || "",
    date: new Date().toISOString().slice(0, 10),
    status: "Open",
  };

  complaints.push(newComplaint);
  nextComplaintId += 1;

  response.status(201).json({
    message: "Complaint submitted successfully.",
    complaint: newComplaint,
  });
});


app.get("/api/complaints", function (request, response) {
  const { search, category, status } = request.query;
  let result = complaints;

  if (category) {
    result = result.filter(function (item) {
      return item.category === category;
    });
  }

  if (status) {
    result = result.filter(function (item) {
      return item.status === status;
    });
  }

  if (search) {
    const term = search.toLowerCase();
    result = result.filter(function (item) {
      return (
        item.residentName.toLowerCase().includes(term) ||
        item.roomNumber.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term)
      );
    });
  }

  response.json(result);
});


app.get("/api/complaints/:id", function (request, response) {
  const complaint = findComplaint(request.params.id);

  if (!complaint) {
    return response.status(404).json({ message: "Complaint not found." });
  }

  response.json(complaint);
});


app.put("/api/complaints/:id", function (request, response) {
  const complaint = findComplaint(request.params.id);

  if (!complaint) {
    return response.status(404).json({ message: "Complaint not found." });
  }

  const {
    residentName,
    roomNumber,
    contactInfo,
    category,
    priority,
    description,
    additionalInfo,
  } = request.body;

  if (category && !VALID_CATEGORIES.includes(category)) {
    return response.status(400).json({ message: "Invalid complaint category." });
  }

  if (priority && !VALID_PRIORITIES.includes(priority)) {
    return response.status(400).json({ message: "Invalid priority level." });
  }

  if (residentName) complaint.residentName = residentName;
  if (roomNumber) complaint.roomNumber = roomNumber;
  if (contactInfo) complaint.contactInfo = contactInfo;
  if (category) complaint.category = category;
  if (priority) complaint.priority = priority;
  if (description) complaint.description = description;
  if (additionalInfo !== undefined) complaint.additionalInfo = additionalInfo;

  response.json({ message: "Complaint updated successfully.", complaint });
});


app.patch("/api/complaints/:id/status", function (request, response) {
  const complaint = findComplaint(request.params.id);

  if (!complaint) {
    return response.status(404).json({ message: "Complaint not found." });
  }

  const { status } = request.body;

  if (!status || !VALID_STATUSES.includes(status)) {
    return response.status(400).json({ message: "Invalid status value." });
  }

  complaint.status = status;

  response.json({ message: "Status updated successfully.", complaint });
});


app.delete("/api/complaints/:id", function (request, response) {
  const complaintId = Number(request.params.id);
  const complaintIndex = complaints.findIndex(function (item) {
    return item.id === complaintId;
  });

  if (complaintIndex === -1) {
    return response.status(404).json({ message: "Complaint not found." });
  }

  const deletedComplaint = complaints.splice(complaintIndex, 1)[0];
  response.json({ message: "Complaint deleted successfully.", complaint: deletedComplaint });
});


app.use(function (request, response) {
  response.status(404).json({ message: "Route not found." });
});

app.listen(PORT, function () {
  console.log(`ResidentCare Complaint API is running at http://localhost:${PORT}`);
});
