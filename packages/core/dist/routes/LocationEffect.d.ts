import { Location } from "react-router-dom";
interface LocationEffectProps {
    onChange?: (location: Location) => void;
}
declare const LocationEffect: ({ onChange }: LocationEffectProps) => JSX.Element;
export default LocationEffect;
