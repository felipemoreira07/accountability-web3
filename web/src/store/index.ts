import { create } from "zustand";

export interface Move {
  name: string;
  moveType: string;
}
export interface IPokemon {
  id: number;
  name: string;
  nickname: string;
  url: string;
  captured_at: number;
  types: string[];
  ability: string;
  weight: number;
  height: number;
  moves: Move[];
}

export interface INewPokemon {
  name: string;
  sprites: { front_default: string };
  moves: { move: { name: string } }[];
  abilities: { ability: { name: string } }[];
  types: { type: { name: string } }[];
  weight: number;
  height: number;
}

interface AppStateVariables {
  newPokemon: IPokemon | undefined;
  selectedPokemon: IPokemon | undefined;
  teamPokemons: IPokemon[];
  refetchPokeball: number | undefined;
  isLoading: boolean;
}

interface AppStateActions {
  setNewPokemon: (pokemon: IPokemon) => void;
  resetNewPokemon: () => void;

  setSelectedPokemon: (pokemon: IPokemon) => void;
  resetSelectedPokemon: (pokemon: IPokemon) => void;

  addTeamPokemon: (pokemon: IPokemon) => void;

  setRefetchPokeball: (val: number) => void;
  resetRefetchPokeball: () => void;

  setLoading: (val: boolean) => void;
}

export const useAppStore = create<AppStateVariables & AppStateActions>(
  (set) => ({
    newPokemon: undefined,
    selectedPokemon: undefined,
    teamPokemons: [],
    refetchPokeball: undefined,
    isLoading: false,

    setNewPokemon: (pokemon: IPokemon) => set(() => ({ newPokemon: pokemon })),
    resetNewPokemon: () => set(() => ({ newPokemon: undefined })),

    setSelectedPokemon: (pokemon: IPokemon) =>
      set(() => ({ selectedPokemon: pokemon })),
    resetSelectedPokemon: () => set(() => ({ selectedPokemon: undefined })),

    addTeamPokemon: (pokemon) =>
      set((state) => ({
        teamPokemons: [...state.teamPokemons, pokemon],
      })),

    setRefetchPokeball: (val: number) => set(() => ({ refetchPokeball: val })),
    resetRefetchPokeball: () => set(() => ({ refetchPokeball: undefined })),

    setLoading: (val: boolean) => set(() => ({ isLoading: val })),
  })
);
