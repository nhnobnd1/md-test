import { Outlet } from "@moose-desk/core";

interface BlankLayoutProps {}

const BlankLayout = (props: BlankLayoutProps) => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default BlankLayout;
