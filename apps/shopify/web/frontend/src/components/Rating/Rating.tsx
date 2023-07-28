import { useCountDown } from "@moose-desk/core";
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
import { FC, useCallback, useEffect } from "react";
import StarsRating from "react-star-rate";

import useRating from "src/store/useRating";
interface RatingProps {}

export const Rating: FC<RatingProps> = () => {
  const ratingState = useRating((state) => state);
  const { show } = useToast();

  const {
    state: countDown,
    initCountdown,
    checkTimerProcess,
    clearCountDown,
  } = useCountDown({
    initValue: 10,
    key: "rating",
  });
  //   console.log({ checkTimerProcess, countDown });
  const handleCancel = () => {
    ratingState.changeComment("");
    ratingState.changeStar(0);
  };
  const handleSubmit = () => {
    if (ratingState.star > 0) {
      show("Thank you for your feedback!");
      ratingState.changeShow(false);
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

  useEffect(() => {
    // initCountdown("rating");
  }, []);
  return (
    <div
      className={`w-[320px] fixed bottom-10 sm:right-10 xs:right-5 z-1000 ${
        ratingState.show ? "block" : "hidden"
      }`}
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
                onAction: () => {
                  handleSubmit();
                },
              }
            : undefined
        }
      >
        <div className="mb-5 flex justify-between">
          <Text variant="headingMd" as="h2">
            MooseDesk
          </Text>
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
        <div className="mb-5">
          <StarsRating
            allowHalf={false}
            value={ratingState.star}
            onChange={(value) => {
              ratingState.changeStar(value as number);
            }}
          />
        </div>
        {ratingState.star === 0 ? (
          <></>
        ) : (
          <div>
            <TextField
              label=""
              value={ratingState.comment}
              onChange={handleChange}
              multiline={4}
              autoComplete="off"
              placeholder="Please tell us what MooseDesk can improve"
            />
          </div>
        )}
        {ratingState.star > 0 && (
          <div className="flex justify-end gap-2 mt-2"></div>
        )}
      </LegacyCard>
    </div>
  );
};
