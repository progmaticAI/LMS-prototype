import { createBrowserRouter, Navigate } from "react-router";

import { Landing } from "./components/Landing";

// HQ Application
import { HQShell } from "./components/hq/HQShell";
import { HQDashboard } from "./components/hq/HQDashboard";
import { HQSchools } from "./components/hq/HQSchools";
import { HQSchoolDetail } from "./components/hq/HQSchoolDetail";
import { HQLibraries } from "./components/hq/HQLibraries";
import { HQLibrarians } from "./components/hq/HQLibrarians";
import { HQBooksOverview } from "./components/hq/HQBooksOverview";
import { HQInventory } from "./components/hq/HQInventory";
import { HQAnalytics } from "./components/hq/HQAnalytics";
import { HQBranchComparison } from "./components/hq/HQBranchComparison";
import { HQReports } from "./components/hq/HQReports";
import { HQUsers } from "./components/hq/HQUsers";
import { HQPermissions } from "./components/hq/HQPermissions";
import { HQNotifications } from "./components/hq/HQNotifications";
import { HQAuditLogs } from "./components/hq/HQAuditLogs";
import { HQSettings } from "./components/hq/HQSettings";

// Library Application
import { LibShell } from "./components/lib/LibShell";
import { LibDashboard } from "./components/lib/LibDashboard";
import { CatalogPage } from "./components/lib/CatalogPage";
import { BookDetailPage } from "./components/lib/BookDetailPage";
import { MembersPage } from "./components/lib/MembersPage";
import { MemberDetailPage } from "./components/lib/MemberDetailPage";
import { CirculationPage } from "./components/lib/CirculationPage";
import { ReservationsPage } from "./components/lib/ReservationsPage";
import { InventoryPage } from "./components/lib/InventoryPage";
import { LibReportsPage } from "./components/lib/LibReportsPage";
import { LibSettingsPage } from "./components/lib/LibSettingsPage";
import { HelpPage } from "./components/lib/HelpPage";

export const router = createBrowserRouter([
  // Landing
  { path: "/", Component: Landing },

  // Friendly redirect
  { path: "/library", element: <Navigate to="/lib" replace /> },

  // ─── HQ Application ─────────────────────────────────────────────────────────
  {
    path: "/hq",
    Component: HQShell,
    children: [
      { index: true, Component: HQDashboard },
      { path: "schools", Component: HQSchools },
      { path: "schools/:id", Component: HQSchoolDetail },
      { path: "libraries", Component: HQLibraries },
      { path: "librarians", Component: HQLibrarians },
      { path: "books", Component: HQBooksOverview },
      { path: "inventory", Component: HQInventory },
      { path: "analytics", Component: HQAnalytics },
      { path: "comparison", Component: HQBranchComparison },
      { path: "reports", Component: HQReports },
      { path: "users", Component: HQUsers },
      { path: "permissions", Component: HQPermissions },
      { path: "notifications", Component: HQNotifications },
      { path: "audit", Component: HQAuditLogs },
      { path: "settings", Component: HQSettings },
    ],
  },

  // ─── Library Application ─────────────────────────────────────────────────────
  {
    path: "/lib",
    Component: LibShell,
    children: [
      { index: true, Component: LibDashboard },
      { path: "catalog", Component: CatalogPage },
      { path: "catalog/:id", Component: BookDetailPage },
      { path: "members", Component: MembersPage },
      { path: "members/:id", Component: MemberDetailPage },
      { path: "circulation", Component: CirculationPage },
      { path: "reservations", Component: ReservationsPage },
      { path: "inventory", Component: InventoryPage },
      { path: "reports", Component: LibReportsPage },
      { path: "settings", Component: LibSettingsPage },
      { path: "help", Component: HelpPage },
    ],
  },
]);
