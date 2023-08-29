import { formatTimeDDMMYY } from "@moose-desk/core/helper/format";
import Link from "antd/es/typography/Link";
import classNames from "classnames";
import { memo, useMemo } from "react";
import styles from "./styles.module.scss";

interface IProps {
  // onBack: () => void;
  dataOrder: any;
}
export const DetailOrderCustomer = memo(({ dataOrder }: IProps) => {
  const unit = dataOrder?.currency;
  const countShippingPrice = () => {
    return (
      (dataOrder?.current_total_price || 0) -
      (dataOrder?.current_subtotal_price || 0) -
      (dataOrder?.current_total_tax || 0)
    );
  };
  const countPrice = (item: any) => {
    return item?.quantity * Number(item?.price);
  };
  const memoDataSource = useMemo(() => {
    const listRefundsItem = dataOrder?.refunds;
    const listRefunds: any = [];

    listRefundsItem?.forEach((items: any) => {
      items?.refund_line_items.forEach((item: any) => {
        listRefunds.push({ ...item, note: items?.note });
      });
    });
    const convertListRefundsItem = listRefunds?.map((item: any) => {
      return {
        quantity: item?.quantity,
        name: item?.line_item?.name,
        sku: item?.line_item?.sku,
        price: item?.line_item?.price,
        note: item?.note,
        isRefund: true,
        currency: unit,
      };
    });
    const listPaymentItemUnfulfilled = dataOrder?.line_items?.map(
      (item: any) => {
        return {
          quantity: item?.fulfillable_quantity || 0,
          name: item?.name,
          sku: item?.sku,
          price: item?.price,
          currency: unit,
        };
      }
    );
    const listPaymentItemFulfilled =
      dataOrder?.fulfillments[0]?.line_items?.map((item: any) => {
        return {
          quantity: item?.quantity || 0,
          name: item?.name,
          sku: item?.sku,
          price: item?.price,
          currency: unit,
        };
      });
    const listPaymentItem =
      dataOrder?.fulfillment_status === "fulfilled"
        ? listPaymentItemFulfilled
        : listPaymentItemUnfulfilled;
    const dataSource: any = [...convertListRefundsItem, ...listPaymentItem]; // sau có thể check là nếu listPaymentItem có số tiền là 0 thì trả ra mảng rỗng.
    return dataSource;
  }, [dataOrder]);
  const memoDetailRefund = useMemo(() => {
    const convertListRefund = memoDataSource?.filter(
      (item: any) => item?.isRefund
    );
    const totalRefundMoney = convertListRefund?.reduce(
      (total: number, item: any) => total + Number(countPrice(item)),
      0
    );
    const getListNoteRefund = convertListRefund?.map((item: any) => item?.note);

    return {
      totalRefund: totalRefundMoney,
      listNote: getListNoteRefund.filter(
        (note: string, index: number) =>
          getListNoteRefund?.indexOf(note) === index && !!note
      ), // loại bỏ các phần tử trùng nhau và trống
    };
  }, [memoDataSource]);
  const _renderContentShipping = () => {
    const addressOverview = dataOrder?.shipping_address;
    const trackingAddress = dataOrder?.fulfillments[0];
    if (
      !dataOrder?.fulfillment_status &&
      !["partially_refunded", "refunded"].includes(dataOrder?.financial_status)
    ) {
      return (
        <div className={styles.contentBlock}>
          <span className={styles.labels}>Address:</span>
          <p className={styles.number}>
            {addressOverview?.first_name} {addressOverview?.last_name} -
            {addressOverview?.address1 && `${addressOverview?.address1} -`}{" "}
            {addressOverview?.city && `${addressOverview?.city} -`}{" "}
            {addressOverview?.country}
          </p>
        </div>
      );
    }
    if (
      !dataOrder?.fulfillment_status ||
      ["partially_refunded", "refunded", "paid"].includes(
        dataOrder?.financial_status
      )
    ) {
      return (
        <>
          <div className={styles.contentBlock}>
            <span className={styles.labels}>Track url:</span>
            <span className={styles.link}>
              {trackingAddress?.tracking_url ? (
                <Link href={trackingAddress?.tracking_url} target="_blank">
                  {trackingAddress?.tracking_url}
                </Link>
              ) : (
                "-"
              )}
            </span>
          </div>
          <div className={styles.contentBlock}>
            <span className={styles.labels}>Track number:</span>
            <span className={styles.number}>
              {trackingAddress?.tracking_number || "-"}
            </span>
          </div>
        </>
      );
    }
  };
  const _renderListNote = () => {
    return memoDetailRefund?.listNote?.map((note: string, index: number) => (
      <span key={index}>
        {note}
        {index + 1 < memoDetailRefund?.listNote?.length && ", "}
      </span>
    ));
  };
  const _renderBadge = (status: string) => {
    switch (status) {
      case "fulfilled":
        return ["Fulfilled", styles.fulfilled];
      case "partially_refunded":
        return ["Partially Refunded", styles.partiallyRefunded];
      case "refunded":
        return ["Refund", styles.refund];
      case "paid":
        return ["Paid", styles.paid];
      default:
        return ["Unfulfilled", styles.warning];
    }
  };
  return (
    <section className={styles.detailContainer}>
      <div className={styles.content}>
        <div className={styles.overview}>
          <div className={styles.blockItem}>
            <div className={styles.titleBlock}>Date: </div>
            <div className={classNames(styles.dataBlock)}>
              {formatTimeDDMMYY(dataOrder?.created_at)}
            </div>
          </div>
          <div className={styles.status}>
            <div
              className={classNames(
                styles.badge,
                _renderBadge(dataOrder?.financial_status || "refunded")[1]
              )}
            >
              {
                _renderBadge(
                  dataOrder?.financial_status || "refunded"
                )[0] as any
              }
            </div>
            <div
              className={classNames(
                styles.badge,
                _renderBadge(dataOrder?.fulfillment_status)[1] as any
              )}
            >
              {_renderBadge(dataOrder?.fulfillment_status)[0] as any}
            </div>
          </div>
        </div>
        <div className={styles.tableItemOrder}>
          {memoDataSource?.map((item: any, index: number) => (
            <div className={styles.order} key={index}>
              <div
                className={classNames(styles.orderName, {
                  "text-line-through": item?.isRefund,
                })}
              >
                {item?.quantity}x{item?.name}
                {item?.sku && (
                  <div
                    className={classNames(styles.orderName, {
                      "text-line-through": item?.isRefund,
                    })}
                  >
                    {item?.sku}
                  </div>
                )}
              </div>
              <div
                className={classNames(styles.orderPrice, {
                  "text-line-through": item?.isRefund,
                })}
              >
                {countPrice(item)} {unit}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.priceStatistic}>
          <div className={styles.tax}>
            <span>Tax:</span>
            <p>
              {dataOrder?.current_total_tax || 0} {unit}
            </p>
          </div>
          <div className={styles.shipping}>
            <span>Shipping:</span>
            <p>
              {countShippingPrice()} {unit}
            </p>
          </div>
          <div className={styles.total}>
            <span>Total:</span>
            <p>
              {dataOrder?.current_total_price || 0} {unit}
            </p>
          </div>
        </div>
        <section className={styles.wrapShipping}>
          <h5 className={styles.subTitle}>Shipping</h5>
          <div className={styles.contentShipping}>
            {_renderContentShipping()}
          </div>
        </section>
        {["partially_refunded", "refunded"].includes(
          dataOrder?.financial_status
        ) && (
          <section className={styles.wrapRefund}>
            <h5 className={styles.subTitle}>Refund</h5>
            <div className={styles.contentRefund}>
              <div className={styles.contentBlock}>
                <span className={styles.labels}>Refunded:</span>
                <p className={styles.number}>
                  {memoDetailRefund?.totalRefund} {unit}
                </p>
              </div>
              <div className={styles.contentBlock}>
                <span className={styles.labels}>Reason:</span>{" "}
                <p className={styles.number}>
                  {memoDetailRefund?.listNote?.map(
                    (note: string, index: number) => (
                      <span key={index}>
                        {note}
                        {index + 1 < memoDetailRefund?.listNote?.length && ", "}
                      </span>
                    )
                  )}
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </section>
  );
});
