import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";

export const MenuItems = [
  {
    id: 1,
    icon: <HomeOutlinedIcon />,
    text: "Home",
    link: "/",
  },
  {
    id: 2,
    icon: <DashboardCustomizeOutlinedIcon />,
    text: "Dashboard",
    link: "/admin-dashboard",
  },
  {
    id: 3,
    icon: <GroupsOutlinedIcon />,
    text: "Users",
    link: "/admin-users",
  },
  {
    id: 4,
    icon: <ShoppingBagOutlinedIcon />,
    text: "Products",
    link: "/admin-products",
  },
  {
    id: 5,
    icon: <ShoppingCartOutlinedIcon />,
    text: "Orders",
    link: "/admin-orders",
  },
  {
    id: 6,
    icon: <AssessmentOutlinedIcon />,
    text: "Report",
    link: "/admin-report",
  },
];
