import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Input } from "./Input";
import { User } from "../../domain/User";

interface Props {
  initialInput: string;
  allUsers: User[];
  onUserChange: (user: User | undefined) => void;
  placeholder?: string;
}

export const UserInputField: React.FC<Props> = ({
  initialInput,
  allUsers,
  onUserChange,
  placeholder,
}) => {
  const [input, setInput] = useState<string>(initialInput);

  useEffect(() => {
    let matchingUser = allUsers.find((user) => user.name.toLowerCase() === input.toLowerCase());
    if (!matchingUser && input !== "") {
      const usersStartingWithInput = allUsers.filter((user) =>
        user.name.toLowerCase().startsWith(input.toLowerCase())
      );
      if (usersStartingWithInput.length === 1) {
        matchingUser = usersStartingWithInput[0];
      }
    }
    onUserChange(matchingUser);
  }, [allUsers, input, onUserChange]);

  return (
    <InputField
      type="text"
      value={input}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInput(event.target.value)}
      placeholder={placeholder ?? "user"}
    />
  );
};

const InputField = styled(Input)`
  width: 15rem;
  margin-right: 1rem;
  font-size: 1rem;
`;
