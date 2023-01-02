import { Spin, SpinProps } from "antd";
import classNames from "classnames";

interface LoadingProps extends SpinProps {
  fullPage?: boolean;
  insteadView?: boolean;
  center?: boolean;
}

export const Loading = ({
  fullPage = false,
  insteadView = false,
  center = false,
  ...props
}: LoadingProps) => {
  return (
    <>
      {fullPage ? (
        <div className="fixed inset-0">
          <Spin className="" {...props}></Spin>
        </div>
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
                  {...props}
                ></Spin>
              </div>
            </>
          ) : (
            <Spin {...props}></Spin>
          )}
        </>
      )}
    </>
  );
};

export default Loading;
