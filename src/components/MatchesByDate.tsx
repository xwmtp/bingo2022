import React from "react";
import { MatchBlock } from "./pages/schedule/MatchBlock";
import { includesEntrant, ScheduledMatch } from "../domain/Match";
import { groupBy } from "../lib/groupBy";
import styled from "styled-components";
import { useUser } from "../api/userApi";
import { isAdmin } from "../domain/User";

interface Props {
  scheduledMatches: ScheduledMatch[];
  displayStatusOnMatchBlock?: boolean;
}

export const MatchesByDate: React.FC<Props> = ({ scheduledMatches, displayStatusOnMatchBlock }) => {
  const { data, isSuccess } = useUser();

  const user = isSuccess && data;

  const matchesByDate = groupBy(scheduledMatches, (match) =>
    match.scheduledTime.setLocale("en-us").toLocaleString({
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  );

  return (
    <>
      {Object.keys(matchesByDate).map((formattedDate, index) => {
        return (
          <DateGroup key={formattedDate} $isFirst={index === 0}>
            <h3>{formattedDate}</h3>
            {matchesByDate[formattedDate].map((match) => (
              <MatchBlock
                key={match.id}
                match={match}
                editable={user && (isAdmin(user) || includesEntrant(match, user.id))}
                displayStatus={displayStatusOnMatchBlock}
              />
            ))}
          </DateGroup>
        );
      })}
    </>
  );
};

const DateGroup = styled.div<{ $isFirst: boolean }>`
  margin-top: ${({ $isFirst }) => ($isFirst ? "0" : "1.2rem")};
`;
