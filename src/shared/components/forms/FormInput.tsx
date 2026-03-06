import clsx from 'clsx';
import { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement>

export default function FormInput( props : Props ) {

    const { className, ...restProps } = props

    return (
        <input
            {...restProps}
            className={clsx("border border-slate-200 w-full p-2", className)}
        />
    );
}