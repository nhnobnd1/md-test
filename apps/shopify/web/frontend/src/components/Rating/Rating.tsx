import { useCountDown } from "@moose-desk/core";
import { MerchantRating } from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import {
  Button,
  Icon,
  LegacyCard,
  Text,
  TextField,
  Tooltip,
} from "@shopify/polaris";
import { CancelMinor } from "@shopify/polaris-icons";
import { FC, useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import StarsRating from "react-star-rate";
import Form from "src/components/Form";
import IconUI from "src/components/UI/Icon";
import { getMerchantRatingApi, postMerchantRatingApi } from "src/helper/api";
import * as Yup from "yup";

import { FormikProps } from "formik";
import FormItem from "src/components/Form/Item";
import useRating from "src/store/useRating";
interface RatingProps {}

export const Rating: FC<RatingProps> = () => {
  const ratingState = useRating((state) => state);
  const formRef = useRef<FormikProps<any>>(null);

  const { show } = useToast();
  const { t } = useTranslation();

  const {
    state: countDown,
    initCountdown,
    checkTimerProcess,
    clearCountDown,
  } = useCountDown({
    initValue: 10,
    key: "rating",
  });
  const { data: dataMerchantRating } = useQuery({
    queryKey: ["getMerchantRatingApi"],
    queryFn: () => getMerchantRatingApi(),
    retry: 3,
    onSuccess: (data) => {
      if (data.star && data.comment) {
        ratingState.changeStar(data.star as number);
        ratingState.changeComment(data.comment as string);
      }

      initCountdown("rating");
    },

    onError: () => {
      show(t("messages:error.something_went_wrong"), { isError: true });
    },
  });
  const postMerchant = useMutation({
    mutationFn: (payload: MerchantRating) => postMerchantRatingApi(payload),
    onSuccess: () => {
      show("Thank you for your feedback!");
    },
    onError: () => {
      show(t("messages:error.something_went_wrong"), { isError: true });
    },
    onSettled: () => {
      ratingState.changeShow(false);
    },
  });
  //   console.log({ checkTimerProcess, countDown });
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
  const handleChange = useCallback(
    (newValue: string) => ratingState.changeComment(newValue),
    []
  );

  useEffect(() => {
    if (countDown === 0) {
      ratingState.changeShow(true);
      clearCountDown("rating");
    }
  }, [countDown]);

  const validateForm = Yup.object().shape({
    comment: Yup.string().required("Please tell us what MooseDesk can improve"),
  });

  return (
    <div
      className={`w-[320px] fixed bottom-10 sm:right-10 xs:right-5 z-1000 ${
        ratingState.show ? "block" : "hidden"
      }`}
    >
      <Form
        innerRef={formRef}
        initialValues={{ comment: ratingState.comment }}
        onSubmit={handleSubmit}
        validationSchema={validateForm}
        enableReinitialize
      >
        <LegacyCard
          sectioned
          secondaryFooterActions={
            ratingState.star > 0
              ? [
                  {
                    content: "Cancel",
                    destructive: true,
                    onAction: () => {
                      handleCancel();
                    },
                  },
                ]
              : []
          }
          primaryFooterAction={
            ratingState.star > 0
              ? {
                  content: "Submit",
                  onAction: async () => {
                    const validate = await formRef.current?.handleSubmit();
                    if (validate) {
                      handleSubmit(formRef.current?.values);
                    }
                  },
                }
              : undefined
          }
        >
          <div className="mb-5 flex justify-between">
            <div className="flex gap-2 items-center">
              <span>
                <IconUI name="mooseRate" />
              </span>
              {ratingState.star === 0 ? (
                <Text variant="headingMd" as="h2">
                  MooseDesk
                </Text>
              ) : (
                <StarsRating
                  disabled={true}
                  allowHalf={false}
                  value={ratingState.star}
                  onChange={(value) => {
                    ratingState.changeStar(value as number);
                  }}
                  classNamePrefix="text-3xl"
                />
              )}
            </div>
            <Tooltip content="Close" preferredPosition="above">
              <Button
                onClick={() => {
                  ratingState.changeShow(false);
                }}
                size="large"
                plain
                icon={<Icon source={CancelMinor} color="base" />}
              />
            </Tooltip>
          </div>
          {ratingState.star === 0 ? (
            <div className={"flex flex-col mb-5"}>
              <span>Rate your experience with MooseDesk.</span>
              <span>Let us hear your voice!</span>
            </div>
          ) : (
            <></>
          )}
          {ratingState.star === 0 ? (
            <div className="mb-5">
              <StarsRating
                allowHalf={false}
                value={ratingState.star}
                onChange={(value) => {
                  ratingState.changeStar(value as number);
                }}
                classNamePrefix="text-3xl"
              />
            </div>
          ) : (
            <></>
          )}
          {ratingState.star === 0 ? (
            <></>
          ) : (
            <FormItem name="comment">
              <TextField
                label=""
                value={ratingState.comment}
                onChange={handleChange}
                multiline={4}
                autoComplete="off"
                placeholder="Please tell us what MooseDesk can improve"
              />
            </FormItem>
          )}
          {ratingState.star > 0 && (
            <div className="flex justify-end gap-2 mt-2"></div>
          )}
        </LegacyCard>
      </Form>
    </div>
  );
};
