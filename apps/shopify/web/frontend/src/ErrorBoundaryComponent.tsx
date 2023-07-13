import { useNavigate } from "@moose-desk/core";
import { Button, Image, Text } from "@shopify/polaris";
import { errorPage } from "src/assets";

interface ErrorBoundaryComponentProps {}

function ErrorBoundaryComponent() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-[100vh] flex-col">
      <div className="flex flex-col items-center justify-center">
        <Image
          source={errorPage}
          alt="Nice work on building a Shopify app"
          width={120}
        />
        <div>
          <div className="my-5">
            <Text alignment="center" variant="headingLg" as="h5">
              Something went wrong
            </Text>
          </div>
          <p>Please try again or report an issue to support</p>
        </div>
      </div>
      <div className="flex gap-2 my-5">
        <Button
          primary
          onClick={() => {
            navigate(0);
          }}
        >
          Try again
        </Button>

        <Button
          onClick={() => {
            window.open("mailto:support@moosedesk.com");
          }}
        >
          Issue to support
        </Button>
      </div>
    </div>
  );
}
export default ErrorBoundaryComponent;
