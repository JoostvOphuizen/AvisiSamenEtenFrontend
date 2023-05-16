import type { type } from "os"

export interface User {
    id: string
    name: string
    email: string
    password: string
    picture: string | undefined
}

export interface Voordeel {
    id: number;
    titel: string;
}

export interface Restaurant {
    id: number;
    naam: string;
    postcode: string;
    straatnaam: string;
    huisnummer: string;
    link: string;
    foto: string;
    VoedingsRestricties: VoedingsRestricties[];
}

export interface VoedingsRestricties {
    voedingsRestrictie: VoedingsRestrictie[];
}

export interface VoedingsRestrictie {
    naam: string | null;
    type: string | null;
}
  