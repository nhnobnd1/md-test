import { Banner as BannerPolaris, Text } from "@shopify/polaris";
import { BannerState } from "src/hooks/useBanner";
import "./Banner.scss";

interface BannerProps {
  banner: BannerState;
  onDismiss: () => void;
}

export const Banner = ({ banner, onDismiss }: BannerProps) => {
  return (
    <BannerPolaris
      title={banner.title}
      status={banner.status}
      onDismiss={() => onDismiss()}
    >
      {Array.isArray(banner.message) ? (
        <>
          {banner.message.map((item, index) => (
            <Text
              variant="bodyMd"
              key={`${item}-${index}`}
              as="p"
              color="subdued"
            >
              {item}
            </Text>
          ))}
        </>
      ) : (
        <Text variant="bodyMd" as="p" color="subdued">
          {banner.message}
        </Text>
      )}
    </BannerPolaris>
  );
};

export default Banner;
