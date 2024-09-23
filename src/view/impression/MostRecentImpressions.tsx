import { Impression } from "@/domain/impression/Impression";
import { useTrackers } from "../pixel/useTrackers";
import { useMostRecentImpressions } from "./useMostRecentImpressions";
import { useState } from "react";

export const MostRecentImpressions = () => {
  const { mostRecentImpressions } = useMostRecentImpressions();

  const { trackers } = useTrackers();

  const [show, setShow] = useState(false);

  if (!mostRecentImpressions || !trackers) {
    return "Carregando...";
  }

  const findTracker = (impression: Impression) =>
    trackers.find((t) => t.id === impression.trackerId)!;

  return (
    <>
      <div>
        <button onClick={() => setShow((show) => !show)}>
          {show
            ? "Esconder Visualizações Mais Recentes"
            : "Mostrar Visualizações Mais Recentes"}
        </button>
      </div>

      {show && (
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Identificador</th>
              <th>IP (Identificador)</th>
              <th>País</th>
              <th>Estado</th>
              <th>Cidade</th>
              <th>Provedor</th>
              <th>User Agent</th>
              <th>Data</th>
            </tr>
          </thead>

          <tbody>
            {mostRecentImpressions.map((impression) => (
              <tr key={impression.id}>
                <td>{findTracker(impression).recipient}</td>
                <td>{findTracker(impression).identifier}</td>
                <td>{impression.ipHash}</td>
                <td>{impression.geolocation.country}</td>
                <td>{impression.geolocation.state}</td>
                <td>{impression.geolocation.city}</td>
                <td>{impression.geolocation.isp}</td>
                <td>{impression.userAgent}</td>
                <td>{impression.date.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
