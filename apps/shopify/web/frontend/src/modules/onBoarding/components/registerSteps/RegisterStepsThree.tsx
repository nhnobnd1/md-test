import { useJob } from "@moose-desk/core";
import { GetTourGuideRequest, TourGuideRepository } from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import {
  Button,
  LegacyCard,
  Link,
  Page,
  Text,
  TextContainer,
} from "@shopify/polaris";
import classNames from "classnames";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import StorageManager from "src/core/utilities/StorageManager";
import useAuth from "src/hooks/useAuth";
import { useSubdomain } from "src/hooks/useSubdomain";
import "src/modules/onBoarding/assets/style/components/registerSteps/register-steps-three.scss";
import { useStore } from "src/providers/StoreProviders";
import styles from "./styles.module.scss";
interface RegisterStepsThreeProps {
  previousStep: () => void;
  redirectIndex: () => void;
}

const RegisterStepsThree = ({
  previousStep,
  redirectIndex,
}: RegisterStepsThreeProps) => {
  const { user } = useAuth();
  const { getSubDomain, getDomainStandalone } = useSubdomain();
  const { storeId } = useStore();
  const { show } = useToast();
  const { t, i18n } = useTranslation();

  const TitleCard = () => {
    return (
      <Text variant="headingLg" as="h1">
        {`Your're ready to go!`}
      </Text>
    );
  };
  const { run: updateTourGuide } = useJob(
    (payload: GetTourGuideRequest) => {
      return TourGuideRepository()
        .updateTourGuide(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              console.log("done tour guild", data);
            }
          }),
          catchError((err) => {
            show(t("messages:error.something_went_wrong"), { isError: true });

            return of(err);
          })
        );
    },
    { showLoading: true }
  );

  const redirectLandingPage = useCallback(() => {
    StorageManager.setToken("isAcceptUsing", "accepted");
    updateTourGuide({ subdomain: storeId, isOnboardingComplete: true });
    redirectIndex();
  }, []);
  return (
    <Page>
      <LegacyCard
        title={<TitleCard />}
        // primaryFooterAction={{
        //   content: "Back",
        //   onAction: previousStep,
        //   destructive: true,
        // }}
        sectioned
      >
        <Text variant="heading2xl" as="h4">
          Your helpdesk portal has been setup successfully.
        </Text>
        <div className="mt-4 content-container">
          <div className="mb-4">
            <TextContainer spacing="tight">
              <Text variant="bodyMd" as="p">
                Your Support Portal address:
              </Text>
              <Text fontWeight="bold" variant="bodyMd" as="p">
                <span className="ml-4">
                  {getSubDomain()}
                  {getDomainStandalone()}
                </span>
              </Text>
            </TextContainer>
          </div>
          <div className="mb-4">
            <TextContainer spacing="tight">
              <Text variant="bodyMd" as="p">
                Support email address:
              </Text>
              <Text fontWeight="bold" variant="bodyMd" as="p">
                <span className="ml-4">
                  {getSubDomain()}@email{getDomainStandalone()}
                </span>
              </Text>
            </TextContainer>
          </div>
          <Text variant="bodyMd" as="p">
            Any emails sent to this email address will automatically create new
            ticket in your support portal
          </Text>
        </div>
        <div className={classNames(styles.redirectLandingPage, "mt-4")}>
          <Button onClick={previousStep} destructive>
            Back
          </Button>
          <Link onClick={redirectLandingPage} external>
            Click here to start using your portal
          </Link>
        </div>
      </LegacyCard>
    </Page>
  );
};

export default RegisterStepsThree;
