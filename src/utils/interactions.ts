import { InteractionDataProps, InteractionState } from "src/types/interactions";

export function convertDataPropsToState(
  dataProps: InteractionDataProps
): InteractionState {
  return {
    isFocus: dataProps["data-focus"] === undefined ? false : true,
    isActive: dataProps["data-active"] === undefined ? false : true,
    isHovered: dataProps["data-hover"] === undefined ? false : true,
  };
}
