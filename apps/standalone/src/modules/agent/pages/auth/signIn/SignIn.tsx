import { useAuthContext, useJob, useLoading } from "@moose-desk/core";
import { AccountRepository, SignInAccountAgentRequest } from "@moose-desk/repo";
import { Button, Form, Input } from "antd";
import { useMemo } from "react";
import { map } from "rxjs";
import Images from "src/assets/images";
import { Loading } from "src/components/Loading";
import useNotification from "src/hooks/useNotification";
import "./SignIn.scss";

interface SignInProps {}

export const SignIn = (props: SignInProps) => {
  const { login } = useAuthContext();
  const notification = useNotification();
  const { startLoading } = useLoading();
  startLoading();
  const initialValues = useMemo(() => {
    return {
      email: "",
      password: "",
    };
  }, []);

  const { run: signInApi, processing: loadingSignIn } = useJob(
    (payload: SignInAccountAgentRequest) => {
      return AccountRepository.agentSignIn(payload).pipe(
        map(({ data }) => {
          notification.success("Login successfully");
          login({
            base_token: data.data.accessToken,
            refresh_token: data.data.refreshToken,
          });
        })
      );
    }
  );

  const handleSubmit = (values: { email: string; password: string }) => {
    signInApi({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <div className="signIn">
      <div className="card-signin">
        <div className="w-[80%] h-full mx-auto">
          <Loading inherit spinning={false}>
            <div className="card-signin__image">
              <img src={Images.Logo.LogoMooseDesk} alt="" />
            </div>
            <div className="card-signin__form">
              <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                initialValues={initialValues}
                onFinish={handleSubmit}
              >
                <div>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: "Please input your email" },
                      { type: "email", message: "Email is invalid" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: "Please input your password" },
                    {
                      pattern:
                        /^(?=.*[a-z])(?=.*?[A-Z])(?=.*[@$!%*#?&])[a-zA-Z@$!%*#?&\d]{8,32}$/g,
                      message:
                        "Password must be have 8 characters long with Capital letter, lowercase letter, wild cards",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <div className="text-center">
                  <Button className="mb-4" type="primary" htmlType="submit">
                    Login
                  </Button>
                  <div className="link">Forgot Password?</div>
                </div>
                <div className="mt-5 w-[80%] mx-auto text-center">
                  Want to get started with MooseDesk? Create a{" "}
                  <span className="link">free account</span> here.
                </div>
              </Form>
            </div>
          </Loading>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
