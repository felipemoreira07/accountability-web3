"use client";

import CatchPokemonModal from "@/components/catch_pokemon_modal";
import PokeballModal from "@/components/pokeball_modal";
import { useAppStore } from "@/store";
import { contract } from "@/utils/constants";
import { Pokeball } from "@/utils/enum/PokeBalls";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LoadingBarContainer } from "react-top-loading-bar";
import { useReadContract } from "thirdweb/react";

export default function Safari() {
  const [openPokeballModal, setOpenPokeballModal] = useState<boolean>(false);
  const [catchPokeballModal, setCatchPokeballModal] = useState<boolean>(false);
  const store = useAppStore();

  const {
    data: pokeballs,
    refetch: refetchPokeball,
    isPending: isPendingPokeballs,
    isRefetching: isRefetchingPokeballs,
  } = useReadContract({
    contract,
    method: "function getPokeballs() view returns (uint256)",
    params: [],
  });

  const {
    data: greatballs,
    refetch: refetchGreatball,
    isPending: isPendingGreatballs,
    isRefetching: isRefetchingGreatballs,
  } = useReadContract({
    contract,
    method: "function getGreatballs() view returns (uint256)",
    params: [],
  });

  const {
    data: ultraballs,
    refetch: refetchUltraball,
    isPending: isPendingUltraballs,
    isRefetching: isRefetchingUltraballs,
  } = useReadContract({
    contract,
    method: "function getUltraballs() view returns (uint256)",
    params: [],
  });

  useEffect(() => {
    if (store.refetchPokeball) {
      if (store.refetchPokeball === Pokeball.enum.Pokeball) refetchPokeball();
      if (store.refetchPokeball === Pokeball.enum.GreatBall) refetchGreatball();
      if (store.refetchPokeball === Pokeball.enum.UltraBall) refetchUltraball();
      store.setRefetchPokeball(undefined);
    }
  }, [store.refetchPokeball]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 pb-20 font-[family-name:var(--font-poppins)]">
      <div className="flex items-center gap-8">
        <Image
          src="/pokeball.svg"
          alt="Next.js logo"
          width={130}
          height={100}
        />
        <h2 className="text-6xl font-semibold">Safari</h2>
      </div>
      <div className="flex gap-5 mt-5 text-lg font-semibold py-5">
        <div className="flex items-center gap-2">
          <Image
            src="/pokeball.png"
            alt="Next.js logo"
            width={25}
            height={25}
          />
          <p className="text-lg">
            {isPendingPokeballs || isRefetchingPokeballs ? "..." : pokeballs}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src="/greatball.png"
            alt="Next.js logo"
            width={25}
            height={25}
          />
          <p className="text-lg">
            {isPendingGreatballs || isRefetchingGreatballs ? "..." : greatballs}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src="/ultraball.png"
            alt="Next.js logo"
            width={25}
            height={25}
          />
          <p className="text-lg">
            {isPendingUltraballs || isRefetchingUltraballs ? "..." : ultraballs}
          </p>
        </div>
      </div>

      <div className="pt-5 flex gap-2">
        <button
          onClick={() => setOpenPokeballModal((prev) => !prev)}
          className="bg-white text-black font-semibold rounded-md px-5 py-3"
        >
          Buy some pokeballs here
        </button>
        <button
          onClick={() => setCatchPokeballModal((prev) => !prev)}
          className="bg-white text-black font-semibold rounded-md px-5 py-3"
        >
          Try to catch a pokemon!
        </button>
      </div>
      <LoadingBarContainer>
        <PokeballModal
          open={openPokeballModal}
          setOpen={setOpenPokeballModal}
        />
        <CatchPokemonModal
          open={catchPokeballModal}
          setOpen={setCatchPokeballModal}
        />
      </LoadingBarContainer>
    </div>
  );
}
