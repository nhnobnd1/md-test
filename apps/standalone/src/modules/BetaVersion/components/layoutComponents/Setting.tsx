import { ListTicketCustomer } from "@moose-beta/components/layoutComponents/component/CustomerTicket/ListTicketCustomer";
import { Security } from "@moose-beta/components/layoutComponents/component/Security";
import { Tickets } from "@moose-beta/components/layoutComponents/component/Tickets";
import { useNavigate, useSearchParams } from "@moose-desk/core";
import { Tabs, TabsProps } from "antd";
import React from "react";
import { ButtonAdd } from "src/components/UI/Button/ButtonAdd";
import MDAvatar from "src/components/UI/MDAvatar/MDAvatar";
import styles from "./style.module.scss";

interface IProps {
  layout: "profile" | "customer";
  basicInformation: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
}
const Setting = ({ layout, basicInformation }: IProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab");
  const onChange = (key: string) => {
    if (layout === "customer") return;
    navigate(`/setting-account?tab=${key}`);
  };
  const items: TabsProps["items"] = [
    {
      key: "ticket",
      label: "Tickets",
      children: <Tickets />,
    },
    {
      key: "setting",
      label: "Security Settings",
      children: <Security />,
    },
  ];
  const customerItems: TabsProps["items"] = [
    {
      key: "list_ticket",
      label: "List Ticket",
      children: <ListTicketCustomer />,
    },
  ];
  const handleRedirectCreateTicket = () => {
    if (layout === "customer") return;
    navigate("/ticket/new");
  };
  const initTab = layout === "customer" ? "list_ticket" : "ticket";
  const renderName = () => {
    if (basicInformation.firstName || basicInformation.lastName) {
      return `${basicInformation.firstName} ${basicInformation.lastName}`;
    }
    return basicInformation.email;
  };
  return (
    <div>
      <div className={styles.myProfile}>
        <div className={styles.profile}>
          <MDAvatar
            firstName={basicInformation.firstName}
            lastName={basicInformation.lastName}
            email={basicInformation.email}
          />
          <div className={styles.name}>{renderName()}</div>
        </div>
        {layout === "profile" && (
          <div className={styles.buttonCreate}>
            <ButtonAdd type="primary" onClick={handleRedirectCreateTicket}>
              New Ticket
            </ButtonAdd>
          </div>
        )}
      </div>
      <Tabs
        activeKey={currentTab || initTab}
        items={layout === "customer" ? customerItems : items}
        onChange={onChange}
      />
    </div>
  );
};
export default React.memo(Setting);
