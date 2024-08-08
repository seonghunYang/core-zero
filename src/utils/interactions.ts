import { InteractionDataProps, InteractionState } from "src/types/interactions";

export function convertDataPropsToState(
  dataProps: InteractionDataProps
): InteractionState {
  return {
    isFocus: dataProps["data-focus"] ?? false,
    isActive: dataProps["data-active"] ?? false,
    isHovered: dataProps["data-hover"] ?? false,
  };
}
