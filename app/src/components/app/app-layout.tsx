import Footer from "@/page/Home/components/footer";
import Header from "@/page/Home/components/header";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="relative">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
