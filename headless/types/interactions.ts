
export interface InteractionState {
  isFocus: boolean;
  isActive: boolean;
  isHovered: boolean;
}

export interface InteractionDataProps {
  'data-focus': boolean;
  'data-active': boolean;
  'data-hover': boolean;
}