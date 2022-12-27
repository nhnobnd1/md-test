import { LoadingOutlined } from "@ant-design/icons";
import { Spin, SpinProps } from "antd";

interface LoadingProps extends SpinProps {
  fullPage?: boolean;
}

export const Loading = ({ fullPage = false, ...props }: LoadingProps) => {
  return (
    <>
      {fullPage ? (
        <div className="flex items-center content-center w-screen h-screen">
          <Spin
            {...props}
            indicator={<LoadingOutlined style={{ fontSize: 48 }} />}
          ></Spin>
        </div>
      ) : (
        <Spin {...props}></Spin>
      )}
    </>
  );
};

export default Loading;
