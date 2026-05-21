import { TextareaHTMLAttributes } from "react";


type Props = TextareaHTMLAttributes<HTMLTextAreaElement>

export function FormTextarea(props: Props) {

    const { className, children, ...restProps } = props

    return (
        <>
            <textarea
                {...restProps}
                className={`border border-slate-200 w-full p-2 h-40 ${className}`}
            >
                {children}
            </textarea>
        </>
    );
}