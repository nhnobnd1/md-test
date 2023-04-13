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
      value: `${dataOrder?.financial_status || "Refund"}, ${
        dataOrder?.fulfillment_status || "Unfulfilled"
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
          <div>{nameOrder}</div>
          {record?.sku && <div>{record?.sku}</div>}
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "price",
      width: "30%",
      render: (price: string, record: any) => (
        <div>
          {record?.quantity}x{price}$
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "total",
      width: "30%",
      render: (_: any, record: any) => <div>{countPrice(record)}$</div>,
    },
  ];
  const memoDataSource = useMemo(() => {
    const listRefundsItem = dataOrder?.refunds;
    const dataSource: any = [...listRefundsItem, ...dataOrder?.line_items];
    return dataSource;
  }, [dataOrder]);

  const _renderContentShipping = () => {
    const addressOverview = dataOrder?.shipping_address;
    const trackingAddress = dataOrder?.fulfillments?.shift();
    if (dataOrder?.fulfillment_status === "Unfulfilled") {
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
      dataOrder?.fulfillment_status ||
      dataOrder?.financial_status === "partially_refunded" ||
      dataOrder?.financial_status === "refunded"
    ) {
      return (
        <>
          <div className="pt-5 pl-5">
            <div>
              <span className="text-bold">Tracking Url:</span>
              <span className="ml-1">{trackingAddress?.tracking_url}</span>
            </div>
          </div>
          <div className="pt-2 pl-5">
            <div>
              <span className="text-bold">Tracking Number:</span>{" "}
              <span className="ml-1">{trackingAddress?.tracking_number}</span>
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
        {(dataOrder?.financial_status === "partially_refunded" ||
          dataOrder?.financial_status === "refunded") && (
          <div className={styles.wrapRefund}>
            <div className={styles.subTitle}>
              <UndoOutlined /> Refund
            </div>
            <div className={styles.contentRefund}>
              <div className="pt-5 pl-5">
                <div>
                  <span className="text-bold">Refunded:</span>
                  <span className="ml-1">10$</span>
                </div>
              </div>
              <div className="pt-2 pl-5">
                <div>
                  <span className="text-bold">Reason:</span>{" "}
                  <span className="ml-1">thich thi reject</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
});
