export interface AvatarData {
  src: string;
  name: string;
  size: AvatarSize;
  type: AvatarType;
}

export enum AvatarSize {
  XS = 'e-avatar-xsmall',
  S = 'e-avatar-small',
  M = 'e-avatar',
  L = 'e-avatar-large',
  XL = 'e-avatar-xlarge',
}

export enum AvatarType {
  Circle = 'e-avatar-circle',
  Square = '', // default
}
