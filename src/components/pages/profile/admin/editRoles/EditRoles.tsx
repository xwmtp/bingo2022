import React, { useState } from "react";
import styled from "styled-components";
import { FlexDiv } from "../../../../divs/FlexDiv";
import { uneditableRoles, User } from "../../../../../domain/User";
import { RoleButton } from "./RoleButton";
import { Role } from "@xwmtp/bingo-tournament";
import { useAllUsers } from "../../../../../api/userApi";
import { Spinner } from "../../../../general/Spinner";
import { UserInputField } from "../../../../forms/UserInputField";
import { UserDisplay } from "../../../../UserDisplay";

const allRoles = Object.values(Role);

export const EditRoles: React.FC = () => {
  const { data: allUsers, isError, isSuccess } = useAllUsers();

  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

  if (isError) {
    return <p>Could not load entrants</p>;
  }
  if (!isSuccess) {
    return <Spinner size="small" />;
  }

  return (
    <EditRolesDiv>
      <InputRow>
        <InputLabel>User</InputLabel>
        <UserInputField initialInput={""} allUsers={allUsers} onUserChange={setSelectedUser} />
        {selectedUser && <UserDisplay user={selectedUser} />}
      </InputRow>

      {selectedUser && (
        <RolesDiv>
          <EditRolesGroup
            title={"Remove roles:"}
            roles={rolesToRemove(selectedUser)}
            user={selectedUser}
          />

          <EditRolesGroup
            title={"Add roles:"}
            roles={rolesToAdd(selectedUser)}
            user={selectedUser}
          />
        </RolesDiv>
      )}
    </EditRolesDiv>
  );
};

const EditRolesGroup: React.FC<{ title: string; user: User; roles: Role[] }> = ({
  title,
  user,
  roles,
}) => {
  if (roles.length === 0) {
    return <></>;
  }
  return (
    <RolesGroup>
      <p>{title}</p>
      <RolesRow>
        {roles.map((role) => (
          <RoleButtonStyled
            key={role}
            role={role}
            user={user}
            isEditable={!uneditableRoles.includes(role)}
          />
        ))}
      </RolesRow>
    </RolesGroup>
  );
};

const rolesToAdd = (user: User): Role[] => {
  return allRoles.filter((role) => !uneditableRoles.includes(role) && !user.roles.includes(role));
};

const rolesToRemove = (user: User): Role[] => {
  const roles = user.roles.filter((role) => !uneditableRoles.includes(role));
  const uneditableRolesUserHas = allRoles.filter(
    (role) => uneditableRoles.includes(role) && user.roles.includes(role)
  );
  return [...roles, ...uneditableRolesUserHas];
};

const EditRolesDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputRow = styled(FlexDiv)`
  justify-content: flex-start;
  margin-right: 2rem;
`;

const InputLabel = styled(FlexDiv)`
  width: 5rem;
  justify-content: flex-start;
`;

const RolesDiv = styled(FlexDiv)`
  flex-direction: column;
  align-items: flex-start;
  margin-top: 1rem;
`;

const RolesGroup = styled(FlexDiv)`
  flex-direction: column;
  align-items: flex-start;
  margin-top: 1rem;
`;

const RolesRow = styled(FlexDiv)`
  justify-content: flex-start;
  margin-top: 0.3rem;
`;

const RoleButtonStyled = styled(RoleButton)`
  margin-right: 1rem;
`;
