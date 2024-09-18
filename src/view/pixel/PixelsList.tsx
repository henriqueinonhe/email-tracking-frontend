import { useState } from "react";
import { useTrackers } from "./useTrackers";
import { Tracker } from "@/domain/tracker/Tracker";
import { ImpressionsList } from "../impression/ImpressionsList";
import { Urls } from "../Urls";
import Link from "next/link";

export const PixelsList = () => {
  const { trackers, trackersStatus } = useTrackers();

  const [selectedTracker, setSelectedTracker] = useState<Tracker>();

  if (trackersStatus === "pending") {
    return "Carregando pixels...";
  }

  if (trackersStatus === "error") {
    return "Não conseguimos carregar os pixels, por favor tente novamente";
  }

  return (
    <>
      <h2>Pixels</h2>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Identificador</th>
            <th>Data de Criação</th>
            <th>Pixel</th>
          </tr>
        </thead>
        <tbody>
          {trackers!.map((tracker) => (
            <tr
              style={{ cursor: "pointer" }}
              key={tracker.id}
              onClick={() => setSelectedTracker(tracker)}
            >
              <td>
                <span style={{ marginLeft: 12 }}>{tracker.id}</span>
              </td>
              <td>
                <span style={{ marginLeft: 12 }}>{tracker.recipient}</span>
              </td>
              <td>
                <span style={{ marginLeft: 12 }}>{tracker.identifier}</span>
              </td>
              <td>
                <span style={{ marginLeft: 12 }}>
                  {tracker.createdAt.toLocaleString()}
                </span>
              </td>
              <td>
                <span style={{ marginLeft: 12 }}>
                  <Link href={Urls.pixel(tracker)} target="_blank">
                    <button>Abrir</button>
                  </Link>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTracker && <ImpressionsList tracker={selectedTracker} />}
    </>
  );
};
