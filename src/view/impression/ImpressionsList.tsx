import { Tracker } from "@/domain/tracker/Tracker";
import { useImpressions } from "./useImpressions";
import { makeH2 } from "named-components";
import styles from "./ImpressionsList.module.scss";
import { Table } from "antd";
import { Impression } from "@/domain/impression/Impression";
import { ColumnsType } from "antd/es/table";

export type ImpressionsListProps = {
  tracker: Tracker;
};

export const ImpressionsList = ({ tracker }: ImpressionsListProps) => {
  const { impressions, impressionsStatus } = useImpressions(tracker.id);

  if (impressionsStatus === "pending") {
    return "Carregando visualizações...";
  }

  if (impressionsStatus === "error") {
    return "Não conseguimos carregar os visualizações, por favor tente novamente";
  }

  const tableColumnsSpecification: ColumnsType<Impression> = [
    {
      title: "IP (Identificador)",
      render: (_, impression) => impression.ipHash ?? "Indisponível",
    },
    {
      title: "País",
      render: (_, impression) =>
        impression.geolocation.country ?? "Indisponível",
    },
    {
      title: "Estado",
      render: (_, impression) => impression.geolocation.state ?? "Indisponível",
    },
    {
      title: "Cidade",
      render: (_, impression) => impression.geolocation.city ?? "Indisponível",
    },
    {
      title: "Provedor",
      render: (_, impression) => impression.geolocation.isp ?? "Indisponível",
    },
    {
      title: "User Agent",
      dataIndex: "userAgent",
    },
    {
      title: "Data",
      render: (impression: Impression) => impression.date.toLocaleString(),
    },
  ];

  return (
    <>
      <Title>Visualizações</Title>

      <Table
        dataSource={impressions}
        columns={tableColumnsSpecification}
        pagination={false}
        scroll={{
          y: "50vh",
        }}
      />
    </>
  );
};

const Title = makeH2(styles.title);
