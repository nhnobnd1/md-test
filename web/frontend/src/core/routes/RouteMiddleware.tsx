import { isValidElement, ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IRoute } from "src/core/models/routes";
import RouteRenderer from "src/core/routes/RouteRenderer";
import RouterHandler from "src/core/routes/RouterHandler";

interface RouteMiddlwareProps {
  route: IRoute;
}

const RouteMiddleware = ({ route }: RouteMiddlwareProps) => {
  const navigate = useNavigate();
  const [middlwareResult, setMiddlewareResult] = useState<
    boolean | ReactElement
  >();

  useEffect(() => {
    (async () => {
      setMiddlewareResult(
        await RouterHandler.canPassMiddleware(route, navigate)
      );
    })();
  }, [navigate, route]);

  return middlwareResult !== undefined ? (
    isValidElement(middlwareResult) ? (
      middlwareResult
    ) : middlwareResult ? (
      <RouteRenderer route={route} />
    ) : null
  ) : null;
};

export default RouteMiddleware;
