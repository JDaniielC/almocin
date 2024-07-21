import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CategoryPage from "./app/admin/pages/categoryPage";
import UserPage from "./app/admin/pages/userPage";
import MenuPage from "./app/admin/pages/menuPage";
import AdminPage from "./app/admin/pages/adminPage";
import StatsPage from "./app/admin/pages/statsPage";
import RegisterPage from "./app/login/pages/registerPage";
import LoginPage from "./app/login/pages/loginPage";
import HomePage from "./app/home/pages/homePage";
import ItemMenuPage from "./app/itemMenu/pages/itemMenuPage";
import OrderPage from "./app/order/pages/orderPage";
import CartPage from "./app/cart/pages/cartPage";
import HistoryPage from "./app/history/pages/historyPage";

const router = createBrowserRouter([
  {
    path: "*",
    Component: LoginPage,
  },{
    path:"order",
    Component:OrderPage,
  },
  {
    path: "/home",
    Component: HomePage,
  },
  {
    path: "/cadastro",
    Component: RegisterPage,
  },
  {
    path:"/cart",
    Component: CartPage
  },
  {
    path:"/history",
    Component: HistoryPage
  },
  {
    path: '/adm',
    children: [
      {
        path: '',
        Component: AdminPage
      },
      {
        path: 'cardapio',
        Component: MenuPage
      },
      {
        path: 'usuarios',
        Component: UserPage
      },
      {
        path: 'categorias',
        Component: CategoryPage
      },
      {
        path: 'estatisticas',
        Component: StatsPage
      }
    ]
  },
  {
    path: "/menu",
    Component: ItemMenuPage
  }
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
