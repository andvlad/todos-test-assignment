import type { Dispatch, SetStateAction } from 'react';
import { TAB_VALUES } from './constants'

export interface INote {
  text: string;
  completed: boolean;
}

export interface INotesProps {
  notes: INote[];
  setNotes: Dispatch<SetStateAction<INote[]>>;
}

export type ITabValuesKeys = keyof typeof TAB_VALUES;
export type ITabValues = typeof TAB_VALUES[ITabValuesKeys];