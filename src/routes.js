import EditPage from "./pages/EditPage";
import FormPage from "./pages/FormPage";
import ListPage from "./pages/ListPage";
import LoginPage from "./pages/LoginPage";

const routes = [
    {
        path: '/',
        component: LoginPage
    },
    {
        path: '/list',
        component: ListPage
    },
    {
        path: '/register',
        component: FormPage
    },
    {
        path: '/edit',
        component: EditPage
    },
    {
        path: '/edit/:id',
        component: EditPage
    },
    {
        path: '/*',
        component: "404 Not Found"
    },
]

export default routes