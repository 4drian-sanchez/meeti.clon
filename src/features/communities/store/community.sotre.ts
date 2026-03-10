"use client"

import {create} from 'zustand'
import { SelectComunity } from '../types/community.types'

type Store = {
    open: boolean
    setOpen : ( ) => void
    community: SelectComunity | null
    setCommunity : ( community : SelectComunity | null ) => void
}

export const useCommunityStore = create<Store>( (set) => ({
    open: false,
    community: null,
    setOpen() {
        set( (state) => ({
            open: !state.open
        }))
    },
    setCommunity( community ) {
        set({
            community
        })
    }
}) )