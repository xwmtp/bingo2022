import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Input } from "./Input";

interface Props {
  initialInput: string;
  onChannelChange: (channel: string | undefined) => void;
  placeholder?: string;
}

export const RestreamChannelInputField: React.FC<Props> = ({
  initialInput,
  onChannelChange,
  placeholder,
}) => {
  const [input, setInput] = useState<string>(initialInput);

  const restreamChannel =
    input.length === 0 || input.startsWith("_") ? undefined : input.replace(/[^a-z0-9_]/gi, "");

  useEffect(() => {
    onChannelChange(restreamChannel);
  }, [onChannelChange, restreamChannel]);

  return (
    <>
      <InputField
        type="text"
        maxLength={30}
        value={input}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInput(event.target.value)}
        placeholder={placeholder ?? "channel"}
      />
      {restreamChannel && <p>{`twitch.tv/${restreamChannel}`}</p>}
    </>
  );
};

const InputField = styled(Input)`
  width: 15rem;
  margin: 0.7rem 0;
  font-size: 1rem;
`;
