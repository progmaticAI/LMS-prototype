# AI Prompt — APS Centralized Library Management System (Prototype)

Design a **modern, enterprise-grade, high-fidelity UI/UX prototype** for a **Centralized Library Management System** for **APS (Army Public Schools)**.

This system will be used by **14 APS school branches**, each having its own independent library while being centrally managed by APS Headquarters.

The application is a **multi-tenant SaaS platform** where every school has isolated data, but the headquarters can monitor and manage all branches from one central dashboard.

The interface should feel as polished as **Microsoft 365 Admin Center, Linear, Stripe Dashboard, Atlassian Jira, and Notion**, while remaining extremely easy for librarians with minimal technical knowledge.

---

# Design Language

* Modern Enterprise Dashboard
* Clean, minimal interface
* Professional typography
* Soft shadows
* Rounded corners
* Spacious layouts
* Card-based dashboards
* Responsive Design
* Light Mode & Dark Mode
* Military-inspired color palette

  * Army Green
  * Dark Green
  * White
  * Light Gray
  * Gold accents
* Accessibility friendly
* Desktop First
* Tablet Responsive
* Mobile Responsive

---

# System Architecture

This is a **Multi-Tenant System**.

There are only **two user roles**.

## 1. Super Admin (APS Headquarters)

This user manages the complete library ecosystem.

Can:

* View all 14 schools
* Monitor every library
* View every book
* View every transaction
* View every librarian
* Compare library performance
* Generate centralized reports
* Manage school branches
* Manage librarians
* Configure global settings
* View audit logs
* Backup & Restore
* Monitor inventory
* Search globally across all schools

---

## 2. Library Admin (Librarian)

Each school has one or more librarians.

A librarian can only access their own school's library.

Can:

* Add/Edit/Delete Books
* Register Students
* Register Teachers
* Search Members
* Issue Books
* Return Books
* Renew Books
* Reserve Books
* Manage Fines
* Import Books
* Export Reports
* Print Receipts
* Print Barcode Labels
* Generate QR Codes
* Manage Categories
* Manage Shelves
* View Reports
* View Analytics

Cannot access another school's data.

---

# Student & Teacher Management

Students and teachers **do not log into the system**.

There is **no student portal**.

All operations are performed by librarians.

Student records only contain:

* Photo
* Name
* Admission Number
* Class
* Section
* Contact Information
* Parent Contact
* Borrowing History
* Current Borrowed Books
* Fine Status

Teacher records include:

* Name
* Employee ID
* Department
* Contact Information
* Borrowing History
* Current Books

---

# Main Dashboard

Create a visually rich dashboard.

Show KPI cards:

* Total Schools
* Total Books
* Available Books
* Borrowed Books
* Reserved Books
* Overdue Books
* Lost Books
* Registered Students
* Registered Teachers
* Active Borrowings

Charts:

* Monthly Borrowings
* Books by Category
* Branch Comparison
* Most Borrowed Books
* Inventory Status
* Borrowing Trends

Widgets:

* Recent Activities
* Today's Issued Books
* Today's Returns
* Overdue Alerts
* Notifications
* Quick Actions

---

# Modules

## Dashboard

Overview

KPIs

Charts

Notifications

Quick Actions

Recent Activities

---

## Book Management

Book List

Book Details

Book Copies

Add Book

Edit Book

Delete Book

Bulk Import

Barcode

QR Code

Book Images

Availability

Book Status

Lost

Damaged

Archived

---

## Categories

Categories

Subjects

Publishers

Authors

Shelves

Racks

Book Locations

---

## Student Management

Student List

Student Profile

Borrowing History

Current Borrowed Books

Fine History

Register Student

Bulk Import

---

## Teacher Management

Teacher List

Teacher Profile

Borrowing History

Current Borrowed Books

Register Teacher

---

## Circulation

Issue Book

Return Book

Renew Book

Reserve Book

Fine Collection

Lost Book

Damaged Book

Print Receipt

Barcode Scanner

---

## Inventory

Inventory Verification

Shelf Audit

Missing Books

Damaged Books

Book Transfers

Purchase Requests

Stock Reports

---

## Reports

Borrowing Reports

Inventory Reports

Fine Reports

Popular Books

Inactive Books

Overdue Reports

Category Reports

Teacher Reports

Student Reports

Branch Reports

Export PDF

Export Excel

---

## User Management

Librarians

Roles

Permissions

Activity Logs

Password Reset

---

## Branch Management (Super Admin)

School List

Branch Details

Library Information

Branch Statistics

Enable/Disable Branch

Assign Librarian

Storage Usage

Inventory Summary

---

## Settings

School Information

Library Information

Borrowing Rules

Loan Duration

Fine Rules

Barcode Settings

Theme

Language

Backup

Restore

System Configuration

---

# Super Admin Dashboard

Create a command center dashboard showing:

Map of all APS schools

Branch comparison

Books per school

Borrowings per school

Inventory health

Most active libraries

Most active librarians

Monthly statistics

Pending issues

Central notifications

Audit logs

Global search

Quick management actions

---

# Library Dashboard

For individual schools display:

Today's issued books

Today's returns

Recently added books

Popular books

Books nearing due date

Overdue books

Inventory alerts

Quick issue button

Quick return button

Quick add book

Recent activities

Monthly borrowing graph

---

# Book Details Screen

Large Book Cover

Book Information

ISBN

Barcode

QR Code

Author

Publisher

Edition

Publication Year

Language

Category

Shelf

Rack

Availability

Borrowing History

Reservation Queue

Copies Available

Copies Issued

Related Books

---

# Student Profile

Photo

Admission Number

Class

Section

Parent Contact

Borrowing Timeline

Current Books

Fine Status

Issue History

Activity Timeline

---

# Reports Dashboard

Advanced filters

Date Range

School

Category

Class

Teacher

Student

Publisher

Charts

Tables

Heatmaps

Download PDF

Download Excel

---

# Components

Sidebar Navigation

Top Navigation

Global Search

Breadcrumbs

Notification Center

Cards

Charts

Data Tables

Advanced Filters

Modals

Drawers

Confirmation Dialogs

Loading Skeletons

Pagination

Calendar Picker

Barcode Scanner Modal

QR Scanner

File Upload

Import Wizard

Export Wizard

---

# UX Goals

* Designed for librarians with minimal computer knowledge.
* Minimize the number of clicks required for issuing and returning books.
* Prioritize fast search using book title, barcode, ISBN, student name, or admission number.
* Use large buttons and clear workflows.
* Keep interfaces uncluttered and intuitive.
* Ensure responsive layouts for desktop, tablet, and mobile devices.
* Include role-based navigation so users only see features relevant to them.

---

# Prototype Screens

Generate high-fidelity screens for:

1. Login
2. Forgot Password
3. Super Admin Dashboard
4. Library Dashboard
5. Books List
6. Add Book
7. Edit Book
8. Book Details
9. Student List
10. Student Profile
11. Teacher List
12. Teacher Profile
13. Issue Book
14. Return Book
15. Renew Book
16. Inventory Dashboard
17. Reports Dashboard
18. Analytics Dashboard
19. User Management
20. Branch Management
21. Settings
22. Notifications Center
23. Activity Logs
24. Barcode Scanner
25. Mobile Responsive Screens

---

# Expected Outcome

Create a polished, production-ready prototype that demonstrates how a centralized APS Library Management System would operate across **14 Army Public School branches**. The prototype should emphasize ease of use, efficient library workflows, centralized oversight, and a professional enterprise appearance suitable for deployment in a large educational organization.
