import { useState, useId } from "react";
import { useTrackers } from "./useTrackers";

export const CreatePixelForm = () => {
  const { createTracker, createTrackerStatus } = useTrackers();

  const [recipient, setRecipient] = useState("");
  const [identifier, setIdentifier] = useState("");

  const emailId = useId();
  const identifierId = useId();

  const trimmedRecipient = recipient.trim();
  const trimmedIdentifier = identifier.trim();

  const createPixelButtonIsDisabled =
    trimmedRecipient.length === 0 ||
    trimmedIdentifier.length === 0 ||
    createTrackerStatus === "pending";

  return (
    <div>
      <h2>Criar pixel</h2>
      <div>
        <label htmlFor={emailId}>{"Email (Destinatário)"}</label>
        <input
          id={emailId}
          name="recipient"
          type="text"
          value={recipient}
          onChange={(event) => setRecipient(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor={identifierId}>Identificador</label>
        <input
          id={identifierId}
          // Hack to not trigger 1password autocomplete
          name="search_identifier"
          type="text"
          value={identifier}
          onChange={(event) => setIdentifier(event.target.value)}
          autoComplete="off"
        />
      </div>

      <button
        onClick={() => createTracker({ recipient, identifier })}
        disabled={createPixelButtonIsDisabled}
      >
        {createTrackerStatus === "pending" ? "Criando..." : "Criar"}
      </button>
    </div>
  );
};
