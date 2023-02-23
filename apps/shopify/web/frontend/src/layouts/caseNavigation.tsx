import {
  IconSource,
  NavigationItemProps,
  SubNavigationItem,
} from "@shopify/polaris";
import {
  BehaviorMinor,
  CustomersMinor,
  FraudProtectMinor,
  HomeMinor,
  ProfileMinor,
  SettingsMajor,
  SettingsMinor,
} from "@shopify/polaris-icons";
import AgentRoutePaths from "src/modules/agent/routes/paths";
import CustomersRoutePaths from "src/modules/customers/routes/paths";
import DashboardRoutePaths from "src/modules/dashboard/routes/paths";
import GroupsRoutePaths from "src/modules/groups/routes/paths";
import SettingRoutePaths from "src/modules/setting/routes/paths";
import SettingChannelRoutePaths from "src/modules/settingChannel/routes/paths";

export interface SubNavigation extends SubNavigationItem {
  tabBarNavigation?: SubNavigation[];
  subNavigationItems?: SubNavigation[];
}

export interface NavigationItems
  extends Omit<NavigationItemProps, "subNavigationItems" | "url"> {
  subNavigationItems?: SubNavigation[] & { icon?: IconSource };
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
        label: "Genaral Settings",
        url: SettingChannelRoutePaths.Index,
        icon: () => <SettingsMajor />,
        tabBarNavigation: [
          {
            label: "Channels",
            url: SettingChannelRoutePaths.Index,
          },
          {
            label: "Business Hours",
            url: SettingRoutePaths.GenaralSetting.BusinessHours.Index,
          },
          // {
          //   label: "Security",
          //   url: SettingRoutePaths.AccountSecurity.Security.Index,
          // },
          // {
          //   label: "Access Manager",
          //   url: SettingRoutePaths.AccountSecurity.AccessManager.Index,
          // },
        ],
      },
      {
        label: "People",
        url: AgentRoutePaths.Index,
        icon: () => <ProfileMinor />,
        tabBarNavigation: [
          { label: "Agents", url: AgentRoutePaths.Index },
          { label: "Groups", url: GroupsRoutePaths.Index },
        ],
      },
      {
        label: "Workdesk",
        url: SettingRoutePaths.Workdesk.Tag.Index,
        icon: () => <BehaviorMinor />,
        tabBarNavigation: [
          { label: "Tags", url: SettingRoutePaths.Workdesk.Tag.Index },
        ],
      },
      {
        label: "Account & Security",
        url: SettingRoutePaths.AccountSecurity.Profile.Index,
        icon: () => <FraudProtectMinor />,
        tabBarNavigation: [
          {
            label: "Profile",
            url: SettingRoutePaths.AccountSecurity.Profile.Index,
          },
          {
            label: "Security",
            url: SettingRoutePaths.AccountSecurity.Security.Index,
          },
          {
            label: "Access Manager",
            url: SettingRoutePaths.AccountSecurity.AccessManager.Index,
          },
        ],
      },
    ],
  },
];

export default caseNavigation;
