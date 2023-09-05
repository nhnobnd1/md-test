import ProfileRoutePaths from "@moose-beta/profile/routes/paths";
import { NavigationItemProps, SubNavigationItem } from "@shopify/polaris";
import {
  BehaviorMinor,
  CustomersMinor,
  FraudProtectMinor,
  HomeMinor,
  ProfileMinor,
  ReadTimeMinor,
  ReportMinor,
  SettingsMajor,
  SettingsMinor,
} from "@shopify/polaris-icons";
import AgentRoutePaths from "src/modules/agent/routes/paths";
import CustomersRoutePaths from "src/modules/customers/routes/paths";
import DashboardRoutePaths from "src/modules/dashboard/routes/paths";
import GroupsRoutePaths from "src/modules/groups/routes/paths";
import ProfileBetaRoutePaths from "src/modules/profileBeta/routes/paths";
import ReportRoutePaths from "src/modules/report/routes/paths";
import SettingRoutePaths from "src/modules/setting/routes/paths";
import SettingChannelRoutePaths from "src/modules/settingChannel/routes/paths";
import TicketRoutePaths from "src/modules/ticket/routes/paths";

export interface SubNavigation extends SubNavigationItem {
  tabBarNavigation?: SubNavigation[];
  subNavigationItems?: SubNavigation[];
}

export interface NavigationItems
  extends Omit<NavigationItemProps, "subNavigationItems" | "url"> {
  subNavigationItems?: any[];
  tabBarNavigation?: SubNavigation[];
  url: string;
}

export const getCaseNavigation = (badge = ""): NavigationItems[] => {
  return [
    {
      label: "Dashboard",
      url: DashboardRoutePaths.Index,
      icon: () => <HomeMinor />,
    },
    {
      label: "Tickets",
      url: TicketRoutePaths.Index,
      icon: () => <ReadTimeMinor />,
      badge: badge === "0" ? undefined : badge,
    },
    {
      label: "Customers",
      url: CustomersRoutePaths.Index,
      icon: () => <CustomersMinor />,
    },

    {
      label: "Reporting",
      url: ReportRoutePaths.Overview,
      icon: () => <ReportMinor />,
      subNavigationItems: [
        {
          label: "Overview",
          url: ReportRoutePaths.Overview,
        },
        {
          label: "By Agent",
          url: ReportRoutePaths.ByAgent,
        },
        {
          label: "By Tags",
          url: ReportRoutePaths.ByTags,
        },
      ],
    },
    {
      label: "Settings",
      url: AgentRoutePaths.Index,
      icon: () => <SettingsMinor />,
      subNavigationItems: [
        {
          label: "General Settings",
          url: SettingChannelRoutePaths.Index,
          icon: () => <SettingsMajor />,
          tabBarNavigation: [
            {
              label: "Channels",
              url: SettingChannelRoutePaths.Index,
              tabBarNavigation: [
                { label: "hello", url: SettingChannelRoutePaths.Widgets.Index },
              ],
            },
            {
              label: "Business Hours",
              url: SettingRoutePaths.GenaralSetting.BusinessHours.Index,
            },
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
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
          url: `${ProfileBetaRoutePaths.Index}?tab=settings`,
          icon: () => <FraudProtectMinor />,
          tabBarNavigation: [
            {
              label: "Setting Account",
              url: `${ProfileBetaRoutePaths.Index}?tab=settings`,
>>>>>>> 2989c34a (feat:done profile beta version in embedded)
=======
          url: `${ProfileRoutePaths.Index}?tab=settings`,
          icon: () => <FraudProtectMinor />,
          tabBarNavigation: [
            {
              label: "Setting Account",
              url: `${ProfileRoutePaths.Index}?tab=settings`,
>>>>>>> 3d619f24 (save: begta)
            },
            {
              label: "Access Manager",
              url: SettingRoutePaths.AccountSecurity.AccessManager.Index,
            },
            // {
            //   label: "Setting Account Beta",
            //   url: `${ProfileRoutePaths.Index}?tab=tickets`,
            // },
          ],
        },
      ],
    },
  ];
};
