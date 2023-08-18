import useGlobalData from "@moose-desk/core/hooks/useGlobalData";
import { Form } from "antd";
import Icon from "src/components/UI/Icon";
import { MDInput } from "src/components/UI/Input";
import MDAvatar from "src/components/UI/MDAvatar/MDAvatar";
import { useSubdomain } from "src/hooks/useSubdomain";
import InputPhoneBeta from "src/modules/BetaVersion/profile/component/InputPhoneBeta/InputPhoneBeta";
import { regexPhoneValidate } from "src/regex";
import styles from "./style.module.scss";

export default function Information() {
  const { subDomain } = useSubdomain();
  const { timezone } = useGlobalData(false, subDomain || "");
  const handleChange = () => {};
  return (
    <div className={styles.contentWrap}>
      <div className={styles.blockContent}>
        <div>
          {/* <MDAvatar
            size="large"
            // firstName="Vuong"
            // lastName="Cu"
            // source={
            //   "https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg"
            // }
          /> */}
        </div>
        <div className={styles.avatarWrap}>
          <div>
            {/* <Upload
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={() => {
                return false;
              }}
              onChange={handleChange}
            >
              <Image
                src={
                  "https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg"
                }
                className={styles.avatar}
                alt="avatar"
                style={{ width: "100%" }}
              />
            </Upload> */}
            <div className={styles.edit}>
              <Icon name="edit" />
            </div>
            <MDAvatar
              size="large"
              firstName="Vuong"
              // firstName="Vuong"
              // lastName="Cu"
              // source={
              //   "https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg"
              // }
            />
          </div>
        </div>
        <div className={styles.formInfo}>
          <Form>
            <div className={styles.formItem}>
              <Form.Item
                label="First name"
                name="firstName"
                rules={[
                  { required: true, message: "First name is required!" },
                  {
                    max: 255,
                    message: "First name up to 255 characters",
                  },
                  {
                    pattern: /[^\s]/,
                    message: "First name is required!",
                  },
                ]}
              >
                <MDInput size="small" placeholder="First Name" />
              </Form.Item>
            </div>
            <div className={styles.formItem}>
              <Form.Item
                label="Last name"
                name="lastName"
                rules={[
                  { required: true, message: "Last name is required!" },
                  {
                    max: 255,
                    message: "Last name up to 255 characters",
                  },
                  {
                    pattern: /[^\s]/,
                    message: "Last name is required!",
                  },
                ]}
              >
                <MDInput size="small" placeholder="Last Name" />
              </Form.Item>
            </div>
            <div className={styles.formItem}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "You must enter your email!" },
                  { type: "email", message: "Email is invalid!" },
                ]}
              >
                <MDInput disabled={true} placeholder="Enter email" />
              </Form.Item>
            </div>

            <Form.Item
              label="Phone"
              name="phoneNumber"
              rules={[
                {
                  pattern: regexPhoneValidate,
                  message: "The input phone number is not valid",
                },
              ]}
            >
              <InputPhoneBeta placeholder="Enter phone number" />
            </Form.Item>
          </Form>
        </div>
        <div className={styles.moreInfo}>
          <span className={styles.label}>Role:</span>
          <span className={styles.result}>System admin</span>
        </div>
      </div>
      <div className={styles.blockContent}>
        <div className={styles.moreInfo}>
          <span className={styles.label}>Group:</span>
          <span className={styles.result}>Admin</span>
        </div>
        <div className={styles.moreInfo}>
          <span className={styles.label}>Timezone:</span>
          <span className={styles.result}>{timezone}</span>
        </div>
      </div>
    </div>
  );
}
