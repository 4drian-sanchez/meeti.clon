"use client"

import { useState } from "react"

type Props = {
    meetiId: string
    permisisons: {
        canConfirm: boolean
        canCancel: boolean
    }
}

export function AttendanceButton( { meetiId, permisisons } : Props ) {
    
    const [ canConfirm, setCanConfirm ] = useState(permisisons.canConfirm)

    const handleClick = async () => {

    }

    return (
        <>
            <button
                onClick={handleClick}
                className={`${canConfirm ? 'bg-orange-600' : 'bg-red-600'} font-bold text-lg w-full lg:w-auto px-5 py-2 text-white cursor-pointer`}
            >
                {canConfirm ? 'Confirmar asistencia' : 'Abandonar asistencia'}
            </button>

        </>
    )
}