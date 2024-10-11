import { useState } from "react";
import { useTrackers } from "./useTrackers";
import { Tracker } from "@/domain/tracker/Tracker";
import { ImpressionsList } from "../impression/ImpressionsList";
import { Urls } from "../Urls";
import Link from "next/link";
import { Button, Table } from "antd";
import styles from "./PixelsList.module.scss";
import { makeDiv, makeH2 } from "named-components";

export const PixelsList = () => {
  const { trackers, trackersStatus } = useTrackers();

  const [selectedTracker, setSelectedTracker] = useState<Tracker>();

  if (trackersStatus === "error") {
    return "Não conseguimos carregar os pixels, por favor tente novamente";
  }

  const tableColumns = [
    {
      title: "Email",
      dataIndex: "recipient",
    },
    {
      title: "Identificador",
      dataIndex: "identifier",
    },
    {
      title: "Data de Criação",
      render: (tracker: Tracker) => tracker.createdAt.toLocaleString(),
    },
    {
      title: "Pixel",
      render: (tracker: Tracker) => (
        <Link href={Urls.pixel(tracker)} target="_blank">
          <Button>Abrir</Button>
        </Link>
      ),
    },
  ];

  return (
    <>
      <Title>Pixels</Title>

      <TableContainer>
        <Table
          bordered
          loading={trackersStatus === "pending"}
          pagination={false}
          dataSource={trackers}
          columns={tableColumns}
          scroll={{
            y: "30vh",
          }}
          onRow={(tracker) => ({
            onClick: () => setSelectedTracker(tracker),
          })}
          rowClassName={styles.row}
          rowKey={(tracker) => tracker.id}
          rowSelection={{
            selectedRowKeys: selectedTracker ? [selectedTracker.id] : [],
            // Workaround to hide checkboxes
            columnWidth: 0,
            renderCell: () => null,
          }}
        />
      </TableContainer>

      {selectedTracker && <ImpressionsList tracker={selectedTracker} />}
    </>
  );
};

const Title = makeH2(styles.title);

const TableContainer = makeDiv(styles.tableContainer);
