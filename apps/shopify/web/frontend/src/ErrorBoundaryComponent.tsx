import { useNavigate } from "@moose-desk/core";
import { Button, Image, Text } from "@shopify/polaris";
import { useEffect, useState } from "react";
import { errorPage } from "src/assets";

interface ErrorBoundaryComponentProps {}

function ErrorBoundaryComponent() {
  const navigate = useNavigate();
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  useEffect(() => {
    const checkLocalStorage = () => {
      try {
        const testKey = "testLocalStoragePermission";
        const testValue = "testValue";

        localStorage.setItem(testKey, testValue);
        const storedValue = localStorage.getItem(testKey);

        if (storedValue !== testValue) {
          throw new Error("Lỗi khi đọc giá trị từ localStorage.");
        }

        localStorage.removeItem(testKey);
        return true;
      } catch (error) {
        return false;
      }
    };

    const permission = checkLocalStorage();
    setHasPermission(permission);
  }, []);
  return (
    <div className="flex justify-center items-center h-[100vh] flex-col">
      <div className="flex flex-col items-center justify-center">
        <Image
          source={errorPage}
          alt="Nice work on building a Shopify app"
          width={120}
        />
        {hasPermission ? (
          <div>
            <div className="my-5">
              <Text alignment="center" variant="headingLg" as="h5">
                Something went wrong
              </Text>
            </div>
            <p>Please try again or report an issue to support</p>
          </div>
        ) : (
          <div className="my-5">
            <Text variant="headingLg" as="h5" alignment="center">
              You are using a private (incognito) browsing window
            </Text>
            <p className="text-center">{`Please open a new tab and turn off the 'Block third-party cookies' option, then reload the app`}</p>
            <p className="text-center">{`If you still encounter errors, please contact our support for assistance`}</p>
          </div>
        )}
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
