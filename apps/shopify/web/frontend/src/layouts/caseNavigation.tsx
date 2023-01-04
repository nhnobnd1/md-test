import { NavigationItemProps, SubNavigationItem } from "@shopify/polaris";
import {
  CustomersMinor,
  HomeMinor,
  SettingsMinor,
} from "@shopify/polaris-icons";
import AgentRoutePaths from "src/modules/agent/routes/paths";
import CustomersRoutePaths from "src/modules/customers/routes/paths";
import DashboardRoutePaths from "src/modules/dashboard/routes/paths";
import SettingRoutePaths from "src/modules/setting/routes/paths";

export interface SubNavigation extends SubNavigationItem {
  tabBarNavigation?: SubNavigation[];
  subNavigationItems?: SubNavigation[];
}

export interface NavigationItems
  extends Omit<NavigationItemProps, "subNavigationItems" | "url"> {
  subNavigationItems?: SubNavigation[];
  tabBarNavigation?: SubNavigation[];
  url: string;
}

const caseNavigation: NavigationItems[] = [
  {
    label: "Home",
    url: DashboardRoutePaths.Index,
    icon: () => <HomeMinor />,
  },
  // {
  //   label: "Tickets",
  //   url: "/tickets",
  //   icon: () => <ReadTimeMinor />,
  // },
  {
    label: "Customers",
    url: CustomersRoutePaths.Index,
    icon: () => <CustomersMinor />,
  },
  // {
  //   label: "Organization",
  //   url: "/organization",
  //   icon: () => <FinancesMinor />,
  // },
  // {
  //   label: "Reporting",
  //   url: "/reporting",
  //   icon: () => <ReportMinor />,
  // },
  {
    label: "Settings",
    url: AgentRoutePaths.Index,
    icon: () => <SettingsMinor />,
    subNavigationItems: [
      // { label: "General Settings", url: "/settings" },
      // { label: "Account Profile", url: "/settings/account-profile" },
      {
        label: "People",
        url: AgentRoutePaths.Index,
        tabBarNavigation: [{ label: "Agents", url: AgentRoutePaths.Index }],
      },
      {
        label: "Workdesk",
        url: SettingRoutePaths.Workdesk.Tag.Index,
        tabBarNavigation: [
          { label: "Tags", url: SettingRoutePaths.Workdesk.Tag.Index },
        ],
      },
      {
        label: "Account & Security",
        url: SettingRoutePaths.AccountSecurity.Index,
        tabBarNavigation: [
          {
            label: "Profile",
            url: SettingRoutePaths.AccountSecurity.Index,
          },
          // {
          //   label: "Security",
          //   url: SettingRoutePaths.AccountSecurity.Index,
          // },
          {
            label: "Access Manager",
            url: SettingRoutePaths.AccountSecurity.AccessManager,
          },
        ],
      },
    ],
  },
];

export default caseNavigation;
