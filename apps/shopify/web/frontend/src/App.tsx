import { useRoutes } from "@moose-desk/core";
import {
  NavigationMenu,
  useAppBridge,
  useToast,
} from "@shopify/app-bridge-react";
import { Fullscreen } from "@shopify/app-bridge/actions";

import { NavigationLink } from "@shopify/app-bridge-react/components/NavigationMenu/NavigationMenu";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useApi, useShopDomain } from "src/hooks";
import useAuth from "src/hooks/useAuth";
import { useSubdomain } from "src/hooks/useSubdomain";
import { useStore } from "src/providers/StoreProviders";
import { AppRoutes } from "src/routes";
import useFullScreen from "src/store/useFullScreen";

export default function App() {
  const { routes } = useRoutes();
  const app = useAppBridge();
  const fullscreen = Fullscreen.create(app);
  const shop = useShopDomain();
  const { subDomain } = useSubdomain();
  const api = useApi();
  const { show } = useToast();
  const { login, isLoggedIn, user } = useAuth();
  const { storeId } = useStore();
  const fullScreen = useFullScreen((state) => state.fullScreen);
  const { t, i18n } = useTranslation();

  // useGlobalData(isLoggedIn);
  useEffect(() => {
    fullScreen
      ? fullscreen.dispatch(Fullscreen.Action.ENTER)
      : fullscreen.dispatch(Fullscreen.Action.EXIT);
  }, [fullscreen, fullScreen]);

  useEffect(() => {
    login(
      {
        base_token:
          "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFCRkE1QTJFQjY4MDM2REE0QjM4NjFFRDRBODc2MzVDRjk4QUY4NjEiLCJ4NXQiOiJHX3BhTHJhQU50cExPR0h0U29kalhQbUstR0UiLCJ0eXAiOiJhdCtqd3QifQ.eyJzdWIiOiIzYTBiM2M1Zi1jZTY1LWMyNTMtZjhlYy00ODI1MzM0ODM1M2MiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJkZXYubW9vc2VkZXNrQGdtYWlsLmNvbSIsImVtYWlsIjoiZGV2Lm1vb3NlZGVza0BnbWFpbC5jb20iLCJyb2xlIjoiQWRtaW4iLCJ0ZW5hbnRpZCI6IjNhMGIzYzVmLWNkNDUtNzg3Yy1iNzMyLWNhYjEzYzgyYzcxMSIsImdpdmVuX25hbWUiOiJNb29zZURlc2sgRGV2IiwiZmFtaWx5X25hbWUiOiJhZG1pbiIsInBob25lX251bWJlcl92ZXJpZmllZCI6IkZhbHNlIiwiZW1haWxfdmVyaWZpZWQiOiJUcnVlIiwidW5pcXVlX25hbWUiOiJkZXYubW9vc2VkZXNrQGdtYWlsLmNvbSIsInN0b3JlSWQiOiI3MzA0MjYyNDc5OSIsInN1YmRvbWFpbiI6Im1kLWRldi1uYW0tMDEiLCJvaV9wcnN0IjoiTW9vc2VkZXNrX1Bvc3RtYW4iLCJvaV9hdV9pZCI6IjNhMGM2MDY2LTdjNWEtMWI0Mi0zOWI4LWY5MmM2NWIzZThhZiIsImNsaWVudF9pZCI6Ik1vb3NlZGVza19Qb3N0bWFuIiwib2lfdGtuX2lkIjoiM2EwYzYwNjYtN2M2Ni0zZTlkLTdhOTctZmQyMGM1Nzg2MWUwIiwic2NvcGUiOiJvZmZsaW5lX2FjY2VzcyIsImV4cCI6MTY4OTQ5Mzc0NywiaXNzIjoiaHR0cHM6Ly9hdXRoLm1vb3NlZGVzay5uZXQvIiwiaWF0IjoxNjg5MjM0NTQ3fQ.y5G1OiGBobcHgwLTSBuqssowNwflytSJMGtYv_wUAGe1PqBxQt_RtOC-xs20GlC4HCCOwlMmqXec8fh6Zlx3Lt1adnOikMoTLZMSAfO1EG6s1ag_5EXIdAsHdespKwvKiFLNFcbVDLB21jdRHAHoi4aGcvZMkII3aYXACzX80y-XbyIx8sU5xm63DH9M9SXLpbCDz3jqMwugW7sVJjJvseqOBETTLO_2_1OYkYLkT_4nOTkDYKuy7k-OmRMsccjwkSN-kkuhefg_g4NtzPuRaEHlp2q2bRwE_vDzUWLzEMMtXWqH-iBZlnYpycSFS1wmnQhFdh9RHX3VLtz2qRyQLA",
        refresh_token: "RlkNLLkRC-CW4N6NPWOnJlWo0_Or_uw50y5y6mkv45s",
      },
      {
        id: 73042624799,
        name: "md-dev-nam-01",
        email: "dev.moosedesk@gmail.com",
        domain: "md-dev-nam-01.myshopify.com",
        province: null,
        country: "VN",
        address1: null,
        zip: null,
        city: null,
        source: null,
        phone: null,
        latitude: null,
        longitude: null,
        primary_locale: "en",
        address2: null,
        created_at: "2023-03-13T06:42:00-04:00",
        updated_at: "2023-07-10T00:32:57-04:00",
        country_code: "VN",
        country_name: "Vietnam",
        currency: "VND",
        customer_email: "dev.moosedesk@gmail.com",
        timezone: "(GMT-05:00) Eastern Time (US & Canada)",
        iana_timezone: "America/New_York",
        shop_owner: "MooseDesk Dev",
        money_format: "{{amount_no_decimals_with_comma_separator}}₫",
        money_with_currency_format:
          "{{amount_no_decimals_with_comma_separator}} VND",
        weight_unit: "kg",
        province_code: null,
        taxes_included: false,
        auto_configure_tax_inclusivity: null,
        tax_shipping: null,
        county_taxes: true,
        plan_display_name: "Development",
        plan_name: "affiliate",
        has_discounts: false,
        has_gift_cards: false,
        myshopify_domain: "md-dev-nam-01.myshopify.com",
        google_apps_domain: null,
        google_apps_login_enabled: null,
        money_in_emails_format: "{{amount_no_decimals_with_comma_separator}}₫",
        money_with_currency_in_emails_format:
          "{{amount_no_decimals_with_comma_separator}} VND",
        eligible_for_payments: false,
        requires_extra_payments_agreement: false,
        password_enabled: true,
        has_storefront: true,
        finances: true,
        primary_location_id: 79322677535,
        cookie_consent_level: "implicit",
        checkout_api_supported: false,
        multi_location_enabled: true,
        setup_required: false,
        pre_launch_enabled: false,
        enabled_presentment_currencies: ["VND"],
        transactional_sms_disabled: true,
        marketing_sms_consent_enabled_at_checkout: false,
      }
    );
  }, []);

  const navigationLinks = useMemo((): NavigationLink[] => {
    return routes
      .filter((route) => route.showInNavigationMenu ?? false)
      .map((route) => {
        return {
          label: route.title ?? "Page have no title",
          destination: route.path,
        };
      });
  }, [routes]);

  return (
    <>
      <NavigationMenu navigationLinks={navigationLinks} />
      <AppRoutes />
    </>
  );
}
