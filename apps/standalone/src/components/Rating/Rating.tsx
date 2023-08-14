import { useCountDown, useUser } from "@moose-desk/core";
import { MerchantRating } from "@moose-desk/repo";
import { Card, Input, Space, Typography } from "antd";
import { FC, useEffect } from "react";
import { Form } from "src/components/UI/Form";

import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import StarsRating from "react-star-rate";
import { MDButton } from "src/components/UI/Button/MDButton";
import Icon from "src/components/UI/Icon";
import { getMerchantRatingApi, postMerchantRatingApi } from "src/helper/api";
import useMessage from "src/hooks/useMessage";
import useRating from "src/store/useRating";
interface RatingProps {}

export const Rating: FC<RatingProps> = () => {
  const ratingState = useRating((state) => state);
  const message = useMessage();
  const { t } = useTranslation();
  const user = useUser();
  const {
    state: countDown,
    initCountdown,
    clearCountDown,
  } = useCountDown({
    initValue: 10,
    key: "rating",
  });

  const {
    data: dataMerchantRating,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["getMerchantRatingApi"],
    queryFn: () => getMerchantRatingApi(),
    retry: 3,
    onSuccess: (data) => {
      ratingState.changeFetching(true);

      if (data.star) {
        return;
      }
      initCountdown("rating");
    },
    enabled: !ratingState.isFetch && !!user,

    onError: () => {
      message.error(t("messages:error.something_went_wrong"));
    },
  });

  const postMerchant = useMutation({
    mutationFn: (payload: MerchantRating) => postMerchantRatingApi(payload),
    onSuccess: () => {
      message.success("Thank you for your feedback!");
    },
    onError: () => {
      message.error(t("messages:error.something_went_wrong"));
    },
    onSettled: () => {
      ratingState.changeShow(false);
    },
  });

  const handleCancel = () => {
    ratingState.changeComment("");
    ratingState.changeStar(0);
  };
  const handleSubmit = (values: any) => {
    if (ratingState.star > 0) {
      postMerchant.mutate({
        star: ratingState.star,
        comment: values.comment,
      });
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
  return (
    <div
      className={`fixed bottom-10 sm:right-10 xs:right-5 z-100 ${
        ratingState.show ? "block" : "hidden"
      }`}
      style={{ zIndex: 100 }}
    >
      <Card className="w-[320px]">
        {isFetching ? (
          <></>
        ) : (
          <Form initialValues={{ comment: "" }} onFinish={handleSubmit}>
            <Space direction="vertical" className="w-full">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span>
                    <Icon name="mooseRate" />
                  </span>
                  {ratingState.star === 0 ? (
                    <h1 className="p-0 m-0">MooseDesk</h1>
                  ) : (
                    <StarsRating
                      allowHalf={false}
                      value={ratingState.star}
                      onChange={(value) => {
                        ratingState.changeStar(value as number);
                      }}
                      classNamePrefix="text-2xl"
                    />
                  )}
                </div>
                <MDButton
                  onClick={() => {
                    ratingState.changeShow(false);
                  }}
                  type="text"
                  icon={<Icon name="close" />}
                ></MDButton>
              </div>
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
              {ratingState.star === 0 ? (
                <StarsRating
                  allowHalf={false}
                  value={ratingState.star}
                  onChange={(value) => {
                    ratingState.changeStar(value as number);
                  }}
                  classNamePrefix="text-3xl"
                />
              ) : (
                <></>
              )}
              {ratingState.star === 0 ? (
                <></>
              ) : (
                <div className={`pt-3`}>
                  <Form.Item name="comment">
                    <Input.TextArea
                      className="w-full"
                      placeholder="Please tell us what MooseDesk can improve"
                      onChange={handleChangeTextArea}
                    />
                  </Form.Item>
                </div>
              )}
              {ratingState.star > 0 && (
                <div className="flex justify-end gap-2 ">
                  <MDButton onClick={handleCancel}>Cancel</MDButton>
                  <MDButton
                    type="primary"
                    // onClick={handleSubmit}
                    htmlType="submit"
                  >
                    Submit
                  </MDButton>
                </div>
              )}
            </Space>
          </Form>
        )}
      </Card>
    </div>
  );
};
