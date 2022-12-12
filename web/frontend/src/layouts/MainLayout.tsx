import { Frame } from "@shopify/polaris";
import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import MainLayoutTopBar from "src/layouts/components/MainLayoutTopBar";

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="Md-Layout">
      <Frame topBar={<MainLayoutTopBar />}>
        <Outlet />
      </Frame>
    </div>
  );
};

export default MainLayout;
