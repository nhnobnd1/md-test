import { useEffect } from "react";
import { Location, useLocation } from "react-router-dom";

interface LocationEffectProps {
  onChange?: (location: Location) => void;
}

const LocationEffect = ({ onChange }: LocationEffectProps) => {
  const location = useLocation();

  useEffect(() => {
    onChange && onChange(location);
  }, [location.pathname]);
  return <></>;
};

export default LocationEffect;
