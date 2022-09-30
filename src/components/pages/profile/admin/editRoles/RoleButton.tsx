import React from "react";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";
import { addRole, removeRole } from "../../../../../api/userApi";
import { Role, User } from "@xwmtp/bingo-tournament";
import { MutationButton } from "../../../../forms/buttons/MutationButton";

interface Props {
  role: Role;
  user: User;
  isEditable: boolean;
  className?: string;
}

export const RoleButton: React.FC<Props> = ({ role, user, isEditable, className }) => {
  const queryClient = useQueryClient();
  const addRoleMutation = useMutation(addRole, {
    onSuccess: () => {
      onRoleMutationSuccess();
    },
  });

  const removeRoleMutation = useMutation(removeRole, {
    onSuccess: () => {
      onRoleMutationSuccess();
    },
  });

  const userHasRole = user.roles.includes(role);
  const editRoleMutation = userHasRole ? removeRoleMutation : addRoleMutation;

  const roleRequest = {
    userId: user.id,
    role: role,
  };

  const onRoleMutationSuccess = () => {
    queryClient.invalidateQueries("allEntrants");
    queryClient.invalidateQueries("allUsers");
    queryClient.invalidateQueries("user");
  };

  const color = userHasRole ? "brightMossGreen" : "lightGrey";
  return (
    <RoleButtonStyled
      mutationStatus={editRoleMutation.status}
      onIdleText={getRoleSign(userHasRole, isEditable) + role}
      color={color}
      disabled={!isEditable}
      onClick={() => {
        if (isEditable) {
          editRoleMutation.mutate(roleRequest);
        }
      }}
      className={className}
    />
  );
};

const getRoleSign = (userHasRole: boolean, isEditable: boolean): string => {
  if (!isEditable) {
    return "";
  }
  if (userHasRole) {
    return "- ";
  }
  return "+ ";
};

const RoleButtonStyled = styled(MutationButton)`
  flex-grow: 1;
  justify-content: flex-start;
  min-width: auto;
`;
