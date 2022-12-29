import { Button, Form, Input } from "antd";
import { FormikValues } from "formik";
import { useMemo } from "react";
import Images from "src/assets/images";
import "./SignIn.scss";

interface SignInProps {}

export const SignIn = (props: SignInProps) => {
  const initialValues = useMemo(() => {
    return {
      email: "",
      password: "",
    };
  }, []);

  const handleSubmit = (values: FormikValues) => {
    console.log(values);
  };

  return (
    <div className="signIn">
      <div className="card-signin">
        <div className="w-[80%] mx-auto">
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
                <Form.Item name="email" label="Email">
                  <Input />
                </Form.Item>
              </div>
              <Form.Item name="password" label="Password">
                <Input.Password />
              </Form.Item>

              <div className="text-center">
                <Button className="mb-4" type="primary">
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
        </div>
      </div>
    </div>
  );
};

export default SignIn;
