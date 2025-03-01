import Home from "./Component/Home_page/home";
import Aboutus from "./Component/About_us/aboutus";
import Contactus from "./Component/Contact_us/contact";
import DashboardUser from "./Component/Dashboard/dashUser";
import DashboardAdmin from "./Component/Dashboard/dashAdmin";
import LoginUser from "./Component/login/loginUser";
import LoginAdmin from "./Component/login/loginAdmin"

function App() {
  return (
    <>
      <Home />
      <Aboutus />
      <Contactus />
      <DashboardUser />
      <DashboardAdmin />
      <LoginUser />
    </>
  );
}

export default App;
