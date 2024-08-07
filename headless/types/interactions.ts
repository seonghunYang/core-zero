
export interface InteractionState {
  isFocus: boolean;
  isPressed: boolean;
  isHovered: boolean;
}

export interface InteractionDataProps {
  'data-focus': boolean;
  'data-active': boolean;
  'data-hover': boolean;
}