export interface Pokemon {
    abilities: Ability[],
    base_experience: number,
    forms: Form[],
    game_indices: GameIndex[],
    height: number,
    id: number,
    is_default: boolean,
    location_area_encounters: string,
    moves: Move[],
    name: string,
    order: number,
    species: Form,
    stats: Stats[],
    sprites?:PokemonSprites,
    types: Types[],
    weight: number,
}

export interface PokemonList {
    count: number,
    next: string,
    results: Form[],
}

export interface Ability {
    ability: {
        name: string,
        url: string,
    },
    is_hidden: boolean,
    slot: number,
}

export interface Form {
    name: string,
    url: string,
}

export interface GameIndex {
    game_index: number,
    version: Form,
}

export interface Move {
    move: Form,
    version_group_details: VersionGroupDetails[],
}

export interface VersionGroupDetails {
    level_learned_at: number,
    move_learn_method: Form,
    version_group: Form,
}

export interface Stats {
    base_stat: number,
    effort: number,
    stat: Form,
}

export interface Types {
    slot: number,
    type: Form,
}

export interface PokemonSprites {
    front_default: string;
    front_shiny: string;
    // Add other sprite properties here as needed
}