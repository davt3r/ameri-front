import { User } from "./user";

export type Perfume = {
  image: {
    urlOriginal: string;
    url: string;
    mimetype: string;
    size: number;
  };
  name: string;
  id: string;
  season: "winter" | "spring" | "summer" | "autumn";
  topNotes: "bergamote" | "ginger" | "iris";
  baseNotes: "woodyNotes" | "aquaticNotes" | "flowerNotes";
  lastNotes: "vetiver" | "patchouli" | "sandal";
  owner: User;
  description: string;
};

export type PerfumeStructure = { id: string } & Perfume;

export type PerfumeServerResponse = {
  results: PerfumeStructure[];
};
