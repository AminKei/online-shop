import { BrowserRouter, useRoutes } from "react-router-dom";
import { Layout } from "antd";
import { Suspense } from "react";
import MobileOnly from "./components/base-componets/mobile-only/MobileOnly";
import AppHeader from "./components/layout/header/Header";
import Navbar from "./components/layout/navbar/Navbar";
import Loading from "./components/base-componets/loading/Loading";
import { routes } from "./config/routes/routes";

const { Content } = Layout;

function AppRoutes() {
  return useRoutes(routes);
}

function App() {
  return (
    <BrowserRouter>
      <MobileOnly>
        <Layout style={{ minHeight: "100vh", fontFamily: "Yekan" }}>
          <AppHeader />

          <Content
            style={{ padding: "20px", marginTop: "-2vh", background: "#fff" }}
          >
            <Suspense fallback={<Loading />}>
              <AppRoutes />
            </Suspense>
          </Content>
        </Layout>

        <Navbar />
      </MobileOnly>
    </BrowserRouter>
  );
}

export default App;
