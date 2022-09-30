import { User as UserDto } from "@xwmtp/bingo-tournament/dist/models/User";
import { Role } from "@xwmtp/bingo-tournament";
import { websiteSettings } from "../Settings";

export interface User {
  id: string;
  name: string;
  roles: Role[];
  avatar: string;
  twitchChannel?: string;
}

export const isEntrant = (user: User): boolean => {
  return user.roles.includes(Role.Entrant);
};

export const isAdmin = (user: User): boolean => {
  return user.roles.includes(Role.Admin);
};

export const isRestreamer = (user: User): boolean => {
  return user.roles.includes(Role.Restreamer);
};

export const uneditableRoles = [Role.Admin];

export const mapToUser = (userDto: UserDto): User => {
  return {
    id: userDto.id,
    name: userDto.name,
    roles: [...userDto.roles].sort((a, b) => a.localeCompare(b)),
    avatar: userDto.avatar || websiteSettings.DEFAULT_AVATAR,
    twitchChannel: userDto.twitchChannel,
  };
};
