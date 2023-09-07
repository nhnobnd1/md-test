import { Tickets } from "@moose-beta/components/layoutComponents/component/Tickets";
import { ListTicketCustomer } from "@moose-beta/customerBeta/components/CustomerTicket/ListTicketCustomer";
import { Security } from "@moose-beta/profile/components/Security";
import { useSearchParams } from "@moose-desk/core";
import { Tabs, TabsProps } from "antd";
import React from "react";
import { Header } from "src/components/UI/Header";
import MDAvatar from "src/components/UI/MDAvatar/MDAvatar";
import MDSkeleton from "src/components/UI/Skeleton/MDSkeleton";
import styles from "./style.module.scss";

interface IProps {
  layout: "profile" | "customer" | "agent";
  basicInformation: {
    _id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    avatar?: string | null;
  };
  loading?: boolean;
}
const Setting = ({ layout, basicInformation, loading = false }: IProps) => {
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab");
  const items: TabsProps["items"] = [
    {
      key: layout === "profile" ? "settings" : "ticket",
      label: layout === "profile" ? "Security Settings" : "Tickets",
      children:
        layout === "profile" ? (
          <Security />
        ) : layout === "agent" ? (
          <Tickets />
        ) : (
          <ListTicketCustomer />
        ),
    },
  ];
  const renderName = () => {
    if (basicInformation.firstName || basicInformation.lastName) {
      return `${basicInformation.firstName} ${basicInformation.lastName}`;
    }
    return basicInformation.email;
  };
  return (
    <div>
      <div className={styles.myProfile} id="md_my_profile">
        <div className={styles.profile}>
          {layout !== "profile" && <Header back />}
          <MDAvatar
            firstName={basicInformation.firstName}
            lastName={basicInformation.lastName}
            email={basicInformation.email}
            skeleton={loading}
            source={basicInformation?.avatar}
          />

          <div className={styles.name}>
            {loading ? <MDSkeleton lines={1} width={100} /> : renderName()}
          </div>
        </div>
      </div>
      <Tabs activeKey={currentTab || "ticket"} items={items} />
    </div>
  );
};
export default React.memo(Setting);
