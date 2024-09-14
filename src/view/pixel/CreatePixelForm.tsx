import { useState, useId } from "react";

export const CreatePixelForm = () => {
  const [recipient, setRecipient] = useState("");
  const [identifier, setIdentifier] = useState("");

  const emailId = useId();
  const identifierId = useId();

  const trimmedRecipient = recipient.trim();
  const trimmedIdentifier = identifier.trim();

  const createPixelButtonIsDisabled =
    trimmedRecipient.length === 0 || trimmedIdentifier.length === 0;

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

      <button disabled={createPixelButtonIsDisabled}>Criar</button>
    </div>
  );
};
