import React from "react";
import { isScheduledMatch, Match } from "../domain/Match";
import { UserDisplay } from "./UserDisplay";
import styled from "styled-components";
import { FlexDiv } from "./divs/FlexDiv";
import { Block } from "./Block";
import { DateTime } from "luxon";

interface Props {
  match: Match;
  className?: string;
}

export const MatchDisplay: React.FC<Props> = ({ match, className }) => {
  return (
    <Display className={className}>
      {isScheduledMatch(match) && (
        <DateAndTime>
          <p>
            {match.scheduledTime.setLocale("en-us").toLocaleString({
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
          <Time>{match.scheduledTime.toLocaleString(DateTime.TIME_SIMPLE)}</Time>
        </DateAndTime>
      )}
      <Users>
        {match.entrants.map((entrant) => (
          <User
            key={"match_display" + match.id + entrant.user.id}
            user={entrant.user}
            removeNamePadding={true}
          />
        ))}
      </Users>
    </Display>
  );
};

const Display = styled(Block)`
  margin-top: 0;
  margin-bottom: 1.2rem;
  padding: 0.3rem 2rem;
`;

const DateAndTime = styled(FlexDiv)`
  flex-direction: column;
  margin-right: 1.5rem;
  padding: 0.3rem 0;
`;

const Time = styled.p`
  margin-top: 0.3rem;
`;

const Users = styled(FlexDiv)`
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 0.3rem;
`;

const User = styled(UserDisplay)`
  margin-top: 0.3rem;
`;
