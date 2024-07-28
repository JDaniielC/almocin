import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HistoryIcon from "@mui/icons-material/History";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import AssignmentIcon from "@mui/icons-material/Assignment";

const baseListItem = [
    { text: "Boas vindas", icon: DashboardIcon },
    { text: "Cardápio", icon: ShoppingCartIcon },
    { text: "Usuário", icon: PeopleIcon },
];

export const listItemAdmin = [
    ...baseListItem,
    { text: "Estatísticas", icon: BarChartIcon },
    { text: "Categoria", icon: AssignmentIcon },
];

export const listItemUser = [
    ...baseListItem,
    { text: "Histórico", icon: HistoryIcon },
];