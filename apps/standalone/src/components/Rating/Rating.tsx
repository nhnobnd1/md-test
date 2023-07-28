import { useCountDown } from "@moose-desk/core";
import { Card, Input, Space, Typography } from "antd";
import { FC, useEffect } from "react";
import StarsRating from "react-star-rate";
import { MDButton } from "src/components/UI/Button/MDButton";
import Icon from "src/components/UI/Icon";
import useMessage from "src/hooks/useMessage";
import useRating from "src/store/useRating";
interface RatingProps {}

export const Rating: FC<RatingProps> = () => {
  const ratingState = useRating((state) => state);
  const message = useMessage();
  const {
    state: countDown,
    initCountdown,
    checkTimerProcess,
    clearCountDown,
  } = useCountDown({
    initValue: 10,
    key: "rating",
  });
  // console.log({ checkTimerProcess, countDown });
  const handleCancel = () => {
    ratingState.changeComment("");
    ratingState.changeStar(0);
  };
  const handleSubmit = () => {
    if (ratingState.star > 0) {
      message.success("Thank you for your feedback!");
      ratingState.changeShow(false);
    }
  };
  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    ratingState.changeComment(e.target.value);
  };

  useEffect(() => {
    if (countDown === 0) {
      ratingState.changeShow(true);
      clearCountDown("rating");
    }
  }, [countDown]);

  useEffect(() => {
    // initCountdown("rating");
  }, []);
  return (
    <div
      className={`fixed bottom-10 sm:right-10 xs:right-5 z-100 ${
        ratingState.show ? "block" : "hidden"
      }`}
    >
      <Card
        className="w-[320px]"
        title={<span>Moosedesk</span>}
        extra={
          <MDButton
            onClick={() => {
              ratingState.changeShow(false);
            }}
            type="text"
            icon={<Icon name="close" />}
          ></MDButton>
        }
      >
        <Space direction="vertical" className="w-full">
          {ratingState.star === 0 ? (
            <div className={"flex flex-col"}>
              <Typography.Text>
                Rate your experience with MooseDesk.
              </Typography.Text>
              <Typography.Text>Let us hear your voice!</Typography.Text>
            </div>
          ) : (
            <></>
          )}
          <StarsRating
            allowHalf={false}
            value={ratingState.star}
            onChange={(value) => {
              ratingState.changeStar(value as number);
            }}
          />
          {ratingState.star === 0 ? (
            <></>
          ) : (
            <div className={``}>
              <Input.TextArea
                className="w-full"
                placeholder="Please tell us what MooseDesk can improve"
                onChange={handleChangeTextArea}
              />
            </div>
          )}
          {ratingState.star > 0 && (
            <div className="flex justify-end gap-2 mt-2">
              <MDButton onClick={handleCancel}>Cancel</MDButton>
              <MDButton type="primary" onClick={handleSubmit}>
                Submit
              </MDButton>
            </div>
          )}
        </Space>
      </Card>
    </div>
  );
};
