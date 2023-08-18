import { useNavigate, useSearchParams } from "@moose-desk/core";
import { Tabs, TabsProps } from "antd";
import { ButtonAdd } from "src/components/UI/Button/ButtonAdd";
import MDAvatar from "src/components/UI/MDAvatar/MDAvatar";
import { Security } from "src/modules/BetaVersion/profile/component/Security";
import { Tickets } from "src/modules/BetaVersion/profile/component/Tickets";
import styles from "./style.module.scss";

export default function Setting() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab");
  const onChange = (key: string) => {
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
  const handleRedirectCreateTicket = () => {
    navigate("/ticket/new");
  };
  return (
    <div>
      <div className={styles.myProfile}>
        <div className={styles.profile}>
          <MDAvatar firstName="Vuong" />
          <div className={styles.name}>Vuong Balloon</div>
        </div>
        <div className={styles.buttonCreate}>
          <ButtonAdd type="primary" onClick={handleRedirectCreateTicket}>
            New Ticket
          </ButtonAdd>
        </div>
      </div>
      <Tabs
        activeKey={currentTab || "ticket"}
        items={items}
        onChange={onChange}
      />
    </div>
  );
}
