import { Security } from "@moose-beta/profile/components/Security";
import { useNavigate } from "@moose-desk/core";
import { Button, SkeletonBodyText, Tabs } from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import MDAvatar from "src/components/MDAvatar/MDAvatar";
import styles from "./style.module.scss";

interface IProps {
  layout: "profile" | "customer" | "agent";
  basicInformation: {
    _id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  loading?: boolean;
}
const Setting = ({ layout, basicInformation, loading = false }: IProps) => {
  const navigate = useNavigate();
  const [selectedTabs, setSelectedTabs] = useState(0);
  const handleTabChange = useCallback((selectedTabIndex) => {
    setSelectedTabs(selectedTabIndex);
    if (layout === "profile") {
      navigate(`/setting-account?tab=${profileTab[selectedTabIndex]?.id}`);
    }
  }, []);

  const handleRedirectCreateTicket = () => {
    if (layout === "profile") navigate("/ticket/new");
  };
  const renderName = () => {
    if (basicInformation.firstName || basicInformation.lastName) {
      return `${basicInformation.firstName} ${basicInformation.lastName}`;
    }
    return basicInformation.email;
  };
  const customerTab = [
    {
      id: "tickets",
      value: <></>,
      content: "Tickets",
      panelID: "tickets",
    },
  ];
  const profileTab = [
    // {
    //   id: "tickets",
    //   value: <Tickets agentId={basicInformation?._id || ""} />,
    //   content: "Tickets",
    //   panelID: "tickets",
    // },
    {
      id: "setting",
      content: "Security Settings",
      value: <Security />,
      panelID: "setting",
    },
  ];
  const tabs = layout === "profile" ? profileTab : customerTab;
  return (
    <div>
      <div className={styles.myProfile}>
        <div className={styles.profile}>
          <MDAvatar
            firstName={basicInformation.firstName}
            lastName={basicInformation.lastName}
            email={basicInformation.email}
          />

          <div className={styles.name}>
            {loading ? <SkeletonBodyText lines={1} /> : renderName()}
          </div>
        </div>
        {layout === "profile" && (
          <div className={styles.buttonCreate}>
            <Button primary onClick={handleRedirectCreateTicket}>
              New Ticket
            </Button>
          </div>
        )}
      </div>
      <Tabs
        tabs={layout === "profile" ? profileTab : tabs}
        selected={selectedTabs}
        onSelect={handleTabChange}
      >
        <div className={styles.tabContentWrap}>{tabs[selectedTabs]?.value}</div>
      </Tabs>
    </div>
  );
};
export default React.memo(Setting);
