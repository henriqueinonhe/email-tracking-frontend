import { useState, useId } from "react";
import { useTrackers } from "./useTrackers";
import { makeDerived, makeDiv } from "named-components";
import { Button, Input } from "antd";
import styles from "./CreatePixelForm.module.scss";
import { Tracker } from "@/domain/tracker/Tracker";

export type CreatePixelFormProps = {
  onTrackerCreated: (tracker: Tracker) => void;
};

export const CreatePixelForm = ({ onTrackerCreated }: CreatePixelFormProps) => {
  const { createTracker, createTrackerStatus } = useTrackers();

  const [recipient, setRecipient] = useState("");
  const [identifier, setIdentifier] = useState("");

  const emailId = useId();
  const identifierId = useId();

  const trimmedRecipient = recipient.trim();
  const trimmedIdentifier = identifier.trim();

  const resetForm = () => {
    setRecipient("");
    setIdentifier("");
  };

  const onCreateTrackerClicked = async () => {
    const tracker = await createTracker({
      identifier: trimmedIdentifier,
      recipient: trimmedRecipient,
    });

    resetForm();

    onTrackerCreated(tracker);
  };

  const createPixelButtonIsDisabled =
    trimmedRecipient.length === 0 ||
    trimmedIdentifier.length === 0 ||
    createTrackerStatus === "pending";

  return (
    <div>
      <h2>Criar Pixel</h2>

      <InputContainer>
        <label htmlFor={emailId}>{"Email (Destinatário)"}</label>

        <RecipientInput
          id={emailId}
          name="recipient"
          type="text"
          value={recipient}
          onChange={(event) => setRecipient(event.target.value)}
        />
      </InputContainer>

      <InputContainer>
        <label htmlFor={identifierId}>Identificador</label>

        <IdentifierInput
          id={identifierId}
          // Hack to not trigger 1password autocomplete
          name="search_identifier"
          type="text"
          value={identifier}
          onChange={(event) => setIdentifier(event.target.value)}
          autoComplete="off"
        />
      </InputContainer>

      <CreatePixelButtonContainer>
        <CreatePixelButton
          type="primary"
          size="large"
          onClick={onCreateTrackerClicked}
          disabled={createPixelButtonIsDisabled}
        >
          {createTrackerStatus === "pending" ? "Criando..." : "Criar"}
        </CreatePixelButton>
      </CreatePixelButtonContainer>
    </div>
  );
};

const InputContainer = makeDiv(styles.inputContainer);

const RecipientInput = makeDerived(Input);

const IdentifierInput = makeDerived(Input);

const CreatePixelButtonContainer = makeDiv(styles.createPixelButtonContainer);

const CreatePixelButton = makeDerived(Button);
