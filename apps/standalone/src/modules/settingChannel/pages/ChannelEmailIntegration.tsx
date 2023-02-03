import { useSearchParams } from "@moose-desk/core";
import { useEffect } from "react";

interface ChannelEmailIntegrationProps {}

const ChannelEmailIntegration = (props: ChannelEmailIntegrationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    for (const [key, value] of searchParams) {
      console.log({ key, value }); // {key: 'term', value: 'pizza'} {key: 'location', value: 'Bangalore'}
    }
  }, [searchParams]);

  return <>Integration</>;
};

export default ChannelEmailIntegration;
