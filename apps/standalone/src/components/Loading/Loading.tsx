import { Spin, SpinProps } from "antd";

interface LoadingProps extends SpinProps {
  fullPage?: boolean;
}

export const Loading = ({ fullPage = false, ...props }: LoadingProps) => {
  return (
    <>
      {fullPage ? (
        <div className="fixed left-0 top-0 right-0 bottom-0">
          <Spin
            className="w-full h-full flex items-center justify-center"
            {...props}
            size="large"
          ></Spin>
        </div>
      ) : (
        <Spin {...props}></Spin>
      )}
    </>
  );
};

export default Loading;
