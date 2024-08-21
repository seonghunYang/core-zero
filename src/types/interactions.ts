export interface InteractionState {
  isFocus: boolean;
  isActive: boolean;
  isHovered: boolean;
}

export interface InteractionDataProps {
  "data-focus"?: string;
  "data-active"?: string;
  "data-hover"?: string;
}
