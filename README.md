# Biswas IT Firm — Project Inquiry Tracker

A responsive and interactive **Project Inquiry Tracker** built using HTML, CSS, and Vanilla JavaScript.

This application helps manage client project inquiries by allowing users to add, view, edit, delete, search, filter, and sort project requests.

All inquiry data is stored in the browser's **localStorage**, allowing information to persist after page refreshes without requiring a backend or database.

## 🚀 Live Demo

**Live Website: 

## ✨ Features

- **Add Inquiry:** Create new project inquiries with client name, service, budget, and status.
- **View Inquiries:** Display all saved inquiries in a dynamic table.
- **Edit Inquiry:** Update existing inquiry information.
- **Delete Inquiry:** Remove inquiries with a confirmation message.
- **Search:** Search inquiries by client name or service.
- **Status Filter:** Filter inquiries by Pending, In Progress, or Completed.
- **Sort Inquiries:** Sort by newest, oldest, highest budget, or lowest budget.
- **Dashboard Summary:** Display total, pending, in-progress, and completed inquiry counts.
- **Form Validation:** Validate required fields and budget values.
- **localStorage:** Save inquiry data in the browser.
- **Responsive Design:** Support desktop, tablet, and mobile devices.
- **Interactive Modal:** Use a modal form for adding and editing inquiries.

## 🛠️ Technologies Used

- **HTML5** — Website structure and forms.
- **CSS3** — Styling, layouts, and responsive design.
- **JavaScript (ES6+)** — CRUD operations and interactive functionality.
- **localStorage API** — Browser-based data persistence.

No frontend framework, backend server, or external database is required.

## 📁 Project Structure

```text
biswas-inquiry-tracker/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   └── index.js
│
└── README.md
```

## ⚙️ Installation and Setup

**Step 1: Clone the repository**

```bash
git clone YOUR_REPOSITORY_URL
```

**Step 2: Navigate to the project folder**

```bash
cd biswas-inquiry-tracker
```

**Step 3: Open the project**

Open `index.html` in your browser.

Alternatively, use the Live Server extension in Visual Studio Code.

No package installation is required.

## 🔄 CRUD Operations

The application implements four CRUD operations using JavaScript arrays and localStorage.

### 1. Create — Add Inquiry

Users can create a new inquiry by completing the form.

Each inquiry contains:

- Unique ID
- Client Name
- Service
- Budget
- Status
- Creation Date

```javascript
const newInquiry = {
    id: crypto.randomUUID(),
    name,
    service,
    budget,
    status,
    createdAt: new Date().toISOString()
};

inquiries.push(newInquiry);

saveInquiries();
```

The `push()` method adds the new inquiry to the array, and `saveInquiries()` stores the updated data in localStorage.

### 2. Read — Display Inquiries

Saved inquiries are loaded from localStorage and displayed dynamically in an HTML table.

```javascript
const savedData = JSON.parse(
    localStorage.getItem("inquiries") || "[]"
);
```

The `renderInquiries()` function creates table rows using JavaScript DOM methods.

### 3. Update — Edit Inquiry

Users can edit an existing inquiry.

The application identifies the selected inquiry using its unique ID.

```javascript
const selectedInquiry = inquiries.find(
    inquiry => inquiry.id === editingId
);

selectedInquiry.name = name;
selectedInquiry.service = service;
selectedInquiry.budget = budget;
selectedInquiry.status = status;
```

After updating the inquiry, the changes are saved to localStorage and displayed in the table.

### 4. Delete — Remove Inquiry

Users can delete an inquiry after confirming the action.

```javascript
const isConfirmed = confirm(
    "Are you sure you want to delete this inquiry?"
);

if (!isConfirmed) return;

inquiries = inquiries.filter(
    inquiry => inquiry.id !== id
);

saveInquiries();
```

The `filter()` method creates a new array without the selected inquiry.

## 💾 localStorage Implementation

The application uses the browser's localStorage API to store inquiry data.

**Save Data:**

```javascript
const saveInquiries = () => {
    localStorage.setItem(
        "inquiries",
        JSON.stringify(inquiries)
    );
};
```

**Load Data:**

```javascript
const savedData = JSON.parse(
    localStorage.getItem("inquiries") || "[]"
);
```

- `JSON.stringify()` converts JavaScript data into a JSON string.
- `localStorage.setItem()` saves data in the browser.
- `localStorage.getItem()` retrieves saved data.
- `JSON.parse()` converts the stored JSON string into JavaScript data.

Data remains available after refreshing the page unless the browser's stored data is cleared.

## 🔍 Search, Filter, and Sort

### Search

Users can search inquiries by client name or service.

Search is case-insensitive and updates results as the user types.

### Filter

Users can filter inquiries by:

- All Status
- Pending
- In Progress
- Completed

### Sort

Users can sort inquiries by:

- Newest First
- Oldest First
- Budget: High to Low
- Budget: Low to High

Search, filter, and sort can work together to display matching inquiries.

## 📊 Dashboard Summary

The dashboard displays four summary cards:

| Card | Description |
|---|---|
| Total | Total number of inquiries |
| Pending | Number of pending inquiries |
| In Progress | Number of ongoing inquiries |
| Completed | Number of completed inquiries |

The summary automatically updates when inquiries are added, edited, or deleted.

## 📱 Responsive Design

The website is designed to work across different screen sizes.

- **Desktop:** Full dashboard and inquiry table.
- **Tablet:** Responsive summary cards and layout.
- **Mobile:** Single-column summary cards and a horizontally scrollable inquiry table.

CSS Flexbox, Grid, and Media Queries are used for responsive layouts.

## 🧪 How to Test

1. Add a new inquiry using the Add Inquiry button.
2. Verify that the inquiry appears in the table.
3. Edit an existing inquiry and save the changes.
4. Delete an inquiry using the Delete button.
5. Search for an inquiry by client name or service.
6. Filter inquiries by status.
7. Sort inquiries by date or budget.
8. Refresh the page and verify that saved data remains available.
9. Test the layout on desktop and mobile screen sizes.

## 📚 What I Learned

Through this project, I practiced:

- JavaScript CRUD operations.
- DOM manipulation.
- Event handling.
- Form validation.
- JavaScript array methods such as `push()`, `find()`, `filter()`, `sort()`, and `forEach()`.
- Working with objects and arrays.
- Browser localStorage.
- Dynamic table rendering.
- Search, filtering, and sorting logic.
- Responsive web design.
- Organizing JavaScript functionality into reusable functions.

## 🔮 Future Improvements

- Add user authentication.
- Connect a backend API.
- Store inquiries in a database.
- Add pagination.
- Export inquiry data as CSV.
- Add custom notification messages.
- Improve accessibility and keyboard navigation.

## 👨‍💻 Developer

**Developer:** Fleming Hagidok  
**Project:** Biswas IT Firm — Project Inquiry Tracker  
**Technologies:** HTML, CSS, JavaScript

## 📄 License

This project was created for educational and learning purposes.