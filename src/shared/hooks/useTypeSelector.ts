import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '../../app/store'

export const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector
