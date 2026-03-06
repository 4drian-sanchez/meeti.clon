import clsx from "clsx";
import { LabelHTMLAttributes } from "react";

type Props = LabelHTMLAttributes<HTMLLabelElement>

export default function FormLabel(props: Props) {
    const { children, className, ...restProps } = props
  return (
      <label {...restProps} className={clsx('block cursor-pointer', className)} >{children}</label>
  );
}