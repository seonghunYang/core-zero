import { AriaButtonOptions, useButton } from "react-aria";

interface ButtonProps extends AriaButtonOptions<"button"> {
  buttonRef: React.RefObject<HTMLButtonElement>;
  style?: React.CSSProperties | undefined;
  children: React.ReactNode;
}

export function Button(props: ButtonProps) {
  let ref = props.buttonRef;
  let { buttonProps } = useButton(props, ref);

  console.log(buttonProps);
  return (
    <button {...buttonProps} ref={ref} style={props.style}>
      {props.children}
    </button>
  );
}
