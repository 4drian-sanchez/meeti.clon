import clsx from 'clsx';
import { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement>

export function FormSubmit(props: Props) {

    const { className, ...restProps } = props

    return (
        <input
            {...restProps}
            type="submit"
            className={clsx('bg-pink-500 cursor-pointer font-bold p-2 text-center text-white mt-5 uppercase w-full', className)}
        />
    );
}