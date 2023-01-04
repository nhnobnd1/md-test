import Images from "src/assets/images";
import { ErrorPage } from "src/components/ErrorPage";

export default function NotFound() {
  return <ErrorPage title="404" image={Images.NotFound} />;
}
