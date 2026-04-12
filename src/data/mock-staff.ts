import { Staff, Role, PermissionGroup } from "@/types/staff";

export const PERMISSION_GROUPS: PermissionGroup[] = [
  {
    groupName: "Dashboard & Analytics",
    permissions: [
      { id: "view_dashboard", label: "View Dashboard Overview", description: "Access to the main dashboard statistics and charts." },
      { id: "view_reports", label: "View Advanced Reports", description: "Access to export and view in-depth analytical reports." },
    ]
  },
  {
    groupName: "Inventory & Products",
    permissions: [
      { id: "view_products", label: "View Products", description: "View the list of all products." },
      { id: "manage_products", label: "Manage Products", description: "Add, edit, or delete products and categories." },
      { id: "manage_stock", label: "Manage Stock & Godown", description: "Transfer stock, add opening stock, and handle godown operations." },
    ]
  },
  {
    groupName: "Sales & Orders",
    permissions: [
      { id: "view_sales", label: "View Sales", description: "View the sales records and invoices." },
      { id: "create_sales", label: "Create Sales", description: "Ability to create new sales and POS operations." },
      { id: "manage_returns", label: "Manage Returns", description: "Handle product returns and warranty claims." },
    ]
  },
  {
    groupName: "CRM (Customers & Suppliers)",
    permissions: [
      { id: "manage_customers", label: "Manage Customers", description: "View, add, or edit customer details." },
      { id: "manage_suppliers", label: "Manage Suppliers", description: "View, add, or edit supplier information and ledgers." },
    ]
  },
  {
    groupName: "Accounts & Financials",
    permissions: [
      { id: "manage_expense", label: "Manage Expenses", description: "Add and track daily shop expenses." },
      { id: "view_accounting", label: "View Accounting", description: "Access to day books, ledgers, and trial balance." },
      { id: "manage_investment", label: "Manage Investments", description: "View and add investment records." },
    ]
  },
  {
    groupName: "Settings & Administration",
    permissions: [
      { id: "manage_settings", label: "Manage Shop Settings", description: "Change store info, invoice format, etc." },
      { id: "manage_website", label: "Manage Website Flow", description: "Edit banners, pages, and web policies." },
      { id: "manage_staff", label: "Manage Staff & Roles", description: "Invite new employees and set access permissions." },
    ]
  }
];

export const MOCK_ROLES: Role[] = [
  {
    id: "r1",
    name: "Super Admin",
    description: "Has full access to all modules and system settings.",
    permissions: PERMISSION_GROUPS.flatMap(g => g.permissions.map(p => p.id)),
    isSystem: true,
  },
  {
    id: "r2",
    name: "Shop Manager",
    description: "Can manage products, sales, customers, and expenses.",
    permissions: [
      "view_dashboard", "view_products", "manage_products", "manage_stock",
      "view_sales", "create_sales", "manage_returns", "manage_customers", 
      "manage_suppliers", "manage_expense"
    ],
    isSystem: false,
  },
  {
    id: "r3",
    name: "Salesman",
    description: "Can create sales, view products, and add customers.",
    permissions: [
      "view_products", "create_sales", "manage_customers"
    ],
    isSystem: false,
  },
  {
    id: "r4",
    name: "Accountant",
    description: "Can view and manage accounting, expenses, and ledgers.",
    permissions: [
      "view_dashboard", "view_reports", "manage_expense", "view_accounting"
    ],
    isSystem: false,
  }
];

export const MOCK_STAFF: Staff[] = [
  {
    id: "s1",
    name: "Masud Rana",
    email: "admin@mobileganj.com",
    phone: "01700000000",
    roleId: "r1",
    status: "Active",
    joinedAt: "2024-01-01T10:00:00Z",
  },
  {
    id: "s2",
    name: "Rahim Uddin",
    email: "rahim@mobileganj.com",
    phone: "01811111111",
    roleId: "r2",
    status: "Active",
    joinedAt: "2024-02-15T09:30:00Z",
  },
  {
    id: "s3",
    name: "Karim Hassan",
    email: "karim@mobileganj.com",
    phone: "01922222222",
    roleId: "r3",
    status: "Active",
    joinedAt: "2024-03-20T11:15:00Z",
  },
  {
    id: "s4",
    name: "Anisur Rahman",
    email: "anisur@mobileganj.com",
    phone: "01633333333",
    roleId: "r4",
    status: "Invited",
    joinedAt: "—",
  },
  {
    id: "s5",
    name: "Tanvir Ahmed",
    email: "tanvir@mobileganj.com",
    phone: "01544444444",
    roleId: "r3",
    status: "Suspended",
    joinedAt: "2024-01-10T14:45:00Z",
  }
];
