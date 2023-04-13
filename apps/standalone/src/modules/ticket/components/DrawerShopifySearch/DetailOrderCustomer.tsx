import {
  ArrowLeftOutlined,
  RocketOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { formatTimeDDMMYY } from "@moose-desk/core/helper/format";
import classNames from "classnames";
import { memo, useMemo } from "react";
import { Table } from "src/components/UI/Table";
import styles from "./styles.module.scss";

interface IProps {
  onBack: () => void;
  dataOrder: any;
}
export const DetailOrderCustomer = memo(({ onBack, dataOrder }: IProps) => {
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
  const LIST_OVERVIEW = [
    {
      title: "Order #",
      value: dataOrder?.order_number,
      style: "text-underlined",
    },
    {
      title: "Order Status",
      value: `${dataOrder?.financial_status || "refund"}, ${
        dataOrder?.fulfillment_status || "unfulfilled"
      }`,
      style: "text-bold",
    },
    {
      title: "Date",
      value: formatTimeDDMMYY(dataOrder?.created_at),
    },
    {
      title: "Tax",
      value: `${dataOrder?.current_total_tax || 0}$`,
    },
    {
      title: "Shipping",
      value: `${countShippingPrice()}$`,
    },
    {
      title: "Total",
      value: `${dataOrder?.current_total_price || 0}$`,
      style: "text-bold",
    },
  ];
  const columns = [
    {
      title: "",
      dataIndex: "name",
      width: "40%",
      render: (nameOrder: string, record: any) => (
        <div>
          <div className={record?.isRefund ? "text-line-through" : ""}>
            {nameOrder}
          </div>
          {record?.sku && (
            <div className={record?.isRefund ? "text-line-through" : ""}>
              {record?.sku}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "price",
      width: "30%",
      render: (price: string, record: any) => (
        <div className={record?.isRefund ? "text-line-through" : ""}>
          {record?.quantity}x{price}$
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "total",
      width: "30%",
      render: (_: any, record: any) => (
        <div className={record?.isRefund ? "text-line-through" : ""}>
          {countPrice(record)}$
        </div>
      ),
    },
  ];
  const memoDataSource = useMemo(() => {
    const listRefundsItem = dataOrder?.refunds;
    const convertListRefundsItem = listRefundsItem?.map((item: any) => {
      const deepItem = item?.refund_line_items[0];
      return {
        quantity: deepItem?.quantity,
        name: deepItem?.line_item?.name,
        sku: deepItem?.line_item?.sku,
        price: deepItem?.line_item?.price,
        note: item?.note,
        isRefund: true,
      };
    });
    const listPaymentItemUnfulfilled = dataOrder?.line_items?.map(
      (item: any) => {
        return {
          quantity: item?.fulfillable_quantity || 0,
          name: item?.name,
          sku: item?.sku,
          price: item?.price,
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
      listNote: getListNoteRefund.filter((note: string) => !!note), // loại bỏ những note bỏ trống hoặc empty
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
        <div className="pt-5 pl-5 d-flex">
          <div className="text-bold mr-5">Address:</div>
          <div>
            {addressOverview?.first_name} {addressOverview?.last_name} -
            {addressOverview?.address1} - {addressOverview?.city} -{" "}
            {addressOverview?.country}
          </div>
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
          <div className="pt-5 pl-5">
            <div>
              <span className="text-bold">Tracking Url:</span>
              <span className="ml-1">
                {trackingAddress?.tracking_url || "(empty)"}
              </span>
            </div>
          </div>
          <div className="pt-2 pl-5">
            <div>
              <span className="text-bold">Tracking Number:</span>
              <span className="ml-1">
                {trackingAddress?.tracking_number || "(empty)"}
              </span>
            </div>
          </div>
        </>
      );
    }
  };
  return (
    <section className={styles.detailContainer}>
      <div className={styles.back} onClick={onBack}>
        <ArrowLeftOutlined /> <span className={styles.backTitle}>Back</span>
      </div>
      <div className={styles.content}>
        <div className={styles.overview}>
          {LIST_OVERVIEW.map((block, index) => (
            <div key={index} className={styles.blockItem}>
              <div className={styles.titleBlock}>{block.title}: </div>
              <div className={classNames(styles.dataBlock, block.style)}>
                {block.value}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.tableItemOrder}>
          <Table
            columns={columns}
            dataSource={memoDataSource}
            rowKey={(record) => record.id}
            scroll={{ y: 500 }}
          />
        </div>
        <div className={styles.wrapShipping}>
          <div className={styles.subTitle}>
            <RocketOutlined /> Shipping
          </div>
          <div className={styles.contentShipping}>
            {_renderContentShipping()}
          </div>
        </div>
        {["partially_refunded", "refunded"].includes(
          dataOrder?.financial_status
        ) && (
          <div className={styles.wrapRefund}>
            <div className={styles.subTitle}>
              <UndoOutlined /> Refund
            </div>
            <div className={styles.contentRefund}>
              <div className="pt-5 pl-5">
                <div>
                  <span className="text-bold">Refunded:</span>
                  <span className="ml-1">{memoDetailRefund?.totalRefund}$</span>
                </div>
              </div>
              <div className="pt-2 pl-5">
                <div>
                  <span className="text-bold">Reason:</span>{" "}
                  <span className="ml-1">
                    {memoDetailRefund?.listNote?.map(
                      (note: string, index: number) => (
                        <span key={index}>
                          {note}
                          {index + 1 < memoDetailRefund?.listNote?.length &&
                            ", "}
                        </span>
                      )
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
});
