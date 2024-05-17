import {
    CircleUserRound,
    LayoutDashboard,
    NotebookPen,
    Settings,
    ShieldAlert,
    User,
    Wrench,
    UserPlus,
    ListChecks,
    CircleArrowRight,
    Pencil,
    UsersRound,
    Plus,
    GanttChart,
    
  } from "lucide-react";

export const BACKEND_URL = 'http://localhost:3000'

export const menuList = [
    {
      group: "General",
      items: [
        {
          link: "/admin/dashboard",
          icon: <LayoutDashboard />,
          text: "Dashboard",
        },
        {
          link: "",
          icon: <User />,
          text: "Employee",
          subItems: [
              { link: "/admin/employee/add", icon: <UserPlus />, text: "Add" },
              { link: "/admin/employee/overview", icon: <UsersRound />, text: "Manage" }
            ],
        },
        { 
          link: "",
          icon: <ListChecks />,
          text: "Inventory",
          subItems: [
              { link: "/admin/inventory/overview", icon: <GanttChart />, text: "Overview" },
              { link: "/admin/inventory/add", icon: <Plus />, text: "Add" },
              { link: "/admin/inventory/assign", icon: <CircleArrowRight />, text: "Assign" },
              { link: "/admin/inventory/update", icon: <Pencil />, text: "Update" }
            ],
        }, 
        { 
          link: "/admin/approval",
          icon: <NotebookPen />,
          text: "Approval",
        },
        {
          link: "",
          icon: <Wrench />,
          text: "Asset",
          subItems: [
              { link: "/admin/asset/overview", icon: <UserPlus />, text: "Add" },
              { link: "/admin/asset/add", icon: <UsersRound />, text: "Manage" }
            ],
        },
        {
          link: "",
          icon: <ShieldAlert />,
          text: "Defective Return",
          subItems: [
              { link: "/admin/defective/overview", icon: <UserPlus />, text: "Return  Item" },
              { link: "/admin/defective/return", icon: <UsersRound />, text: "Defective" }
            ],
        },
      ],
    },
    {
      group: "Settings",
      items: [
        {
          link: "/admin/settings/general",
          icon: <Settings />,
          text: "General Settings",
        },
        {
          link: "/admin/settings/profile",
          icon: <CircleUserRound />,
          text: "Profile",
        },
      ],
    },
  ];