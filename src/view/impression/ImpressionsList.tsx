import { Tracker } from "@/domain/tracker/Tracker";
import { useImpressions } from "./useImpressions";

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

  return (
    <>
      <h2>Visualizações</h2>

      <table>
        <thead>
          <th style={{ marginLeft: 12 }}>{"IP (Identificador)"}</th>
          <th style={{ marginLeft: 12 }}>País</th>
          <th style={{ marginLeft: 12 }}>Estado</th>
          <th style={{ marginLeft: 12 }}>Cidade</th>
          <th style={{ width: 100, marginLeft: 12 }}>Provedor</th>
          <th style={{ width: 300, marginLeft: 12 }}>User Agent</th>
          <th style={{ marginLeft: 12 }}>Data</th>
        </thead>

        <tbody>
          {impressions?.map((impression) => (
            <tr key={impression.id}>
              <td>{impression.ipHash ?? "Indisponível"}</td>
              <td>{impression.geolocation.country ?? "Indisponível"}</td>
              <td>{impression.geolocation.state ?? "Indisponível"}</td>
              <td>{impression.geolocation.city ?? "Indisponível"}</td>
              <td>{impression.geolocation.isp ?? "Indisponível"}</td>
              <td>{impression.userAgent ?? "Indisponível"}</td>
              <td>{impression.date.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
