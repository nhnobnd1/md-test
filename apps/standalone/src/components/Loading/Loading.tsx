import { Spin, SpinProps } from "antd";
import classNames from "classnames";
import { Loader } from "src/components/Loader/Loader";
import SmallLoader from "src/components/Loader/SmallLoader";
import "./Loading.scss";

interface LoadingProps extends SpinProps {
  fullPage?: boolean;
  insteadView?: boolean;
  center?: boolean;
  children?: any;
}

export const Loading = ({
  fullPage = false,
  insteadView = false,
  center = false,
  children,
  ...props
}: LoadingProps) => {
  return (
    <div className="LoadingPage">
      {fullPage ? (
        <Spin
          className="LoadingPage__full-page"
          indicator={<Loader />}
          {...props}
        >
          {children}
        </Spin>
      ) : (
        <>
          {insteadView ? (
            <>
              <div
                className={classNames([
                  "w-full h-full flex justify-center",
                  { "items-center": center },
                ])}
              >
                <Spin
                  className={classNames({ "pt-[30%]": !center })}
                  indicator={<SmallLoader />}
                  {...props}
                >
                  {children}
                </Spin>
              </div>
            </>
          ) : (
            <Spin indicator={<SmallLoader />} {...props}>
              {children}
            </Spin>
          )}
        </>
      )}
    </div>
  );
};

export default Loading;
