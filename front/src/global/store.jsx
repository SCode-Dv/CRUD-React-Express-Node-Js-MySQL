import {create} from 'zustand';

export const insercion = create((set) => ({
    satisfactoria: 0,
    setSatisfactoria: (valor) => set({satisfactoria: valor}),
}))