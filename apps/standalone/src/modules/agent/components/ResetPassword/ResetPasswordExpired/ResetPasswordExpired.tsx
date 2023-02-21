import { WarningOutlined } from "@ant-design/icons";
import { useNavigate } from "@moose-desk/core";
import DashboardRoutePaths from "src/modules/dashboard/routes/paths";
import "./ResetPasswordExpired.scss";

interface ResetPasswordExpiredProps {}

const ResetPasswordExpired = (props: ResetPasswordExpiredProps) => {
  const navigate = useNavigate();
  return (
    <div className="ResetPasswordExpired">
      <div className="card-ResetPasswordExpired">
        <div className="w-[80%] h-full mx-auto">
          <div className="pt-[40px] w-full h-full">
            <div className="flex justify-center items-center mb-[40px]">
              <WarningOutlined style={{ fontSize: 120 }} />
            </div>
            <div className="mb-6">
              The reset password link has expired. If you still want to reset
              your password. Please start over again.
            </div>
            <div className="mb-4 text-center">
              <span
                className="link font-semibold"
                onClick={() => navigate(DashboardRoutePaths.Index)}
              >
                Return to home page
              </span>
            </div>
            <div>
              Want to get started with MooseDesk? Create a{" "}
              <span className="link">free account</span> here.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordExpired;
