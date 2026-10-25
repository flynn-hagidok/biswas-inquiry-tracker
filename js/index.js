// 1. SELECT HTML ELEMENTS

const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const inquiryModal = document.getElementById("inquiryModal");

const inquiryForm = document.getElementById("inquiryForm");
const inquiryTableBody = document.getElementById("inquiryTableBody");
const emptyState = document.getElementById("emptyState");

const searchInput = document.querySelector('input[type="search"]');

const sortSelect = document.querySelector(
    'select:has(option[value="High-Low"])'
);

const statusFilter = document.querySelector(
    'select:has(option[value="In-Progress"])'
);

const modalTitle = inquiryModal.querySelector("h2");

// Modal-এর Original Submit Button
const submitBtn = inquiryForm.querySelector('button[type="submit"]');


// 2. VARIABLES

let inquiries = [];
let editingId = null;


// 3. LOAD LOCALSTORAGE DATA

try {
    const savedData = JSON.parse(
        localStorage.getItem("inquiries") || "[]"
    );

    inquiries = Array.isArray(savedData) ? savedData : [];

} catch (error) {
    console.error("Failed to load inquiries:", error);
    inquiries = [];
}


// 4. SAVE DATA

const saveInquiries = () => {
    localStorage.setItem(
        "inquiries",
        JSON.stringify(inquiries)
    );
};


// 5. SEARCH, SORT AND FILTER

const getFilteredInquiries = () => {

    const searchText = searchInput.value.toLowerCase().trim();
    const selectedStatus = statusFilter.value;
    const selectedSort = sortSelect.value;

    let result = [...inquiries];

    // SEARCH
    result = result.filter((inquiry) => {

        const name = inquiry.name.toLowerCase();
        const service = inquiry.service.toLowerCase();

        return (
            name.includes(searchText) ||
            service.includes(searchText)
        );
    });

    // FILTER
    if (
        selectedStatus !== "All" &&
        selectedStatus !== "select"
    ) {
        result = result.filter((inquiry) => {
            return inquiry.status === selectedStatus;
        });
    }

    // SORT
    if (selectedSort === "Newest") {

        result.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

    } else if (selectedSort === "Oldest") {

        result.sort((a, b) => {
            return new Date(a.createdAt) - new Date(b.createdAt);
        });

    } else if (selectedSort === "High-Low") {

        result.sort((a, b) => {
            return Number(b.budget) - Number(a.budget);
        });

    } else if (selectedSort === "Low-High") {

        result.sort((a, b) => {
            return Number(a.budget) - Number(b.budget);
        });
    }

    return result;
};


// RENDER TABLE

const renderInquiries = () => {

    inquiryTableBody.innerHTML = "";

    const displayedInquiries = getFilteredInquiries();

    if (displayedInquiries.length === 0) {

        emptyState.style.display = "block";

        if (inquiries.length === 0) {

            emptyState.querySelector("h3").textContent =
                "No inquiries found";

            emptyState.querySelector("p").textContent =
                "Add your first inquiry to get started.";

        } else {

            emptyState.querySelector("h3").textContent =
                "No matching inquiries found";

            emptyState.querySelector("p").textContent =
                "Try changing your search or filter.";
        }

        return;
    }

    emptyState.style.display = "none";

    displayedInquiries.forEach((inquiry, index) => {

        const row = document.createElement("tr");

        // ID / Serial Number
        const idCell = document.createElement("td");
        idCell.textContent = index + 1;

        // Client Name
        const nameCell = document.createElement("td");
        nameCell.textContent = inquiry.name;

        // Service
        const serviceCell = document.createElement("td");
        serviceCell.textContent = inquiry.service;

        // Status
        const statusCell = document.createElement("td");
        statusCell.textContent = inquiry.status;

        // Budget
        const budgetCell = document.createElement("td");
        budgetCell.textContent =
            `৳${Number(inquiry.budget).toLocaleString("en-BD")}`;

        // Date
        const dateCell = document.createElement("td");

        dateCell.textContent = new Date(
            inquiry.createdAt
        ).toLocaleDateString("en-BD");

        // Action
        const actionCell = document.createElement("td");

        // Edit Button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";

        editBtn.addEventListener("click", () => {
            editInquiry(inquiry.id);
        });

        // Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", () => {
            deleteInquiry(inquiry.id);
        });

        actionCell.append(editBtn, deleteBtn);

        row.append(
            idCell,
            nameCell,
            serviceCell,
            statusCell,
            budgetCell,
            dateCell,
            actionCell
        );

        inquiryTableBody.appendChild(row);
    });
};

// 7. UPDATE SUMMARY

const updateSummary = () => {

    const total = inquiries.length;

    const pending = inquiries.filter(
        inquiry => inquiry.status === "Pending"
    ).length;

    const progress = inquiries.filter(
        inquiry => inquiry.status === "In-Progress"
    ).length;

    const completed = inquiries.filter(
        inquiry => inquiry.status === "Completed"
    ).length;

    document.getElementById("totalCount").textContent = total;
    document.getElementById("pendingCount").textContent = pending;
    document.getElementById("progressCount").textContent = progress;
    document.getElementById("completedCount").textContent = completed;
};



// 8. EDIT INQUIRY

const editInquiry = (id) => {

    const selectedInquiry = inquiries.find(
        inquiry => inquiry.id === id
    );

    if (!selectedInquiry) {
        alert("Inquiry not found!");
        return;
    }

    editingId = id;

    document.getElementById("name").value = selectedInquiry.name;
    document.getElementById("service").value = selectedInquiry.service;
    document.getElementById("budget").value = selectedInquiry.budget;
    document.getElementById("status").value = selectedInquiry.status;

    modalTitle.textContent = "Edit Inquiry";
    submitBtn.textContent = "Update Inquiry";

    inquiryModal.classList.add("active");
};


// 9. DELETE INQUIRY


const deleteInquiry = (id) => {

    const isConfirmed = confirm(
        "Are you sure you want to delete this inquiry?"
    );

    if (!isConfirmed) return;

    inquiries = inquiries.filter(
        inquiry => inquiry.id !== id
    );

    saveInquiries();
    renderInquiries();
    updateSummary();

    alert("Inquiry deleted successfully!");
};


// 10. MODAL OPEN / CLOSE

openModalBtn.addEventListener("click", () => {

    editingId = null;
    inquiryForm.reset();

    modalTitle.textContent = "Add Inquiry";
    submitBtn.textContent = "Add Inquiry";

    inquiryModal.classList.add("active");
});

closeModalBtn.addEventListener("click", () => {
    inquiryModal.classList.remove("active");
});


// 11. ADD / UPDATE INQUIRY

inquiryForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const service = document.getElementById("service").value;
    const budgetInput = document.getElementById("budget").value;
    const budget = Number(budgetInput);
    const status = document.getElementById("status").value;

    // VALIDATION
    if (!name) {
        alert("Please enter client name!");
        return;
    }

    if (
        budgetInput.trim() === "" ||
        !Number.isFinite(budget) ||
        budget <= 0
    ) {
        alert("Please enter a valid budget!");
        return;
    }

    let message = "";

    if (editingId === null) {

        // ADD
        const newInquiry = {
            id: crypto.randomUUID(),
            name,
            service,
            budget,
            status,
            createdAt: new Date().toISOString()
        };

        inquiries.push(newInquiry);

        message = "Inquiry added successfully!";

    } else {

        // UPDATE
        const selectedInquiry = inquiries.find(
            inquiry => inquiry.id === editingId
        );

        if (!selectedInquiry) {
            alert("Inquiry not found!");
            return;
        }

        selectedInquiry.name = name;
        selectedInquiry.service = service;
        selectedInquiry.budget = budget;
        selectedInquiry.status = status;

        message = "Inquiry updated successfully!";
    }

    saveInquiries();
    renderInquiries();
    updateSummary();

    editingId = null;
    inquiryForm.reset();
    inquiryModal.classList.remove("active");

    alert(message);
});


// 12. SEARCH, SORT, FILTER EVENTS

searchInput.addEventListener("input", renderInquiries);

sortSelect.addEventListener("change", renderInquiries);

statusFilter.addEventListener("change", renderInquiries);


renderInquiries();
updateSummary();