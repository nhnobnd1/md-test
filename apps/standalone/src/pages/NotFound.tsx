import Images from "src/assets/images";
import { ErrorPage } from "src/components/ErrorPage";

export default function NotFound() {
  return <ErrorPage image={Images.Logo.NotFound} />;
}
