import { useState } from "react";
import { useTrackers } from "./useTrackers";
import { Tracker } from "@/domain/tracker/Tracker";
import { ImpressionsList } from "../impression/ImpressionsList";
import { Urls } from "../Urls";
import Link from "next/link";
import { Button, Table, TableColumnsType } from "antd";
import styles from "./PixelsList.module.scss";
import { makeDerived, makeDiv, makeH2 } from "named-components";
import { CreatePixelModal } from "./CreatePixelModal";

export const PixelsList = () => {
  const { trackers, trackersStatus } = useTrackers();

  const [selectedTracker, setSelectedTracker] = useState<Tracker>();

  const [createPixelModalIsOpen, setCreatePixelModalIsOpen] = useState(false);

  if (trackersStatus === "error") {
    return "Não conseguimos carregar os pixels, por favor tente novamente";
  }

  const tableColumnsSpecification: TableColumnsType<Tracker> = [
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

  const sortedTrackers = trackers?.toSorted(
    (first, second) => second.createdAt.getTime() - first.createdAt.getTime(),
  );

  return (
    <>
      <Title>Pixels</Title>

      <CreatePixelButtonContainer>
        <CreatePixelButton
          type="primary"
          size="large"
          onClick={() => setCreatePixelModalIsOpen(true)}
        >
          Criar Pixel
        </CreatePixelButton>
      </CreatePixelButtonContainer>

      {createPixelModalIsOpen && (
        <CreatePixelModal onClose={() => setCreatePixelModalIsOpen(false)} />
      )}

      <TableContainer>
        <Table
          bordered
          loading={trackersStatus === "pending"}
          pagination={false}
          dataSource={sortedTrackers}
          columns={tableColumnsSpecification}
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
          // We need this to render the footer
          footer={() => null}
        />
      </TableContainer>

      {selectedTracker && <ImpressionsList tracker={selectedTracker} />}
    </>
  );
};

const Title = makeH2(styles.title);

const TableContainer = makeDiv(styles.tableContainer);

const CreatePixelButtonContainer = makeDiv(styles.createPixelButtonContainer);

const CreatePixelButton = makeDerived(Button);
