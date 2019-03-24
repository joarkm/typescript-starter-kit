// export module Tyre {
    
// }

export type Compound = Object;

export interface TyreMaterial {
    compound: Compound,
    hardness: 'hard' | 'medium' | 'soft'
}

export enum TyreType {
    Road,
    Urban,
    Gravel,
    Mud
}

export interface ITyre {
    diameter: Object,
    material: TyreMaterial,
    spikes: boolean
}

export class Tyre implements ITyre {

    constructor(
        public diameter: Object,
        public material: TyreMaterial,
        public spikes = false
    ) {
        this.diameter = diameter;
        this.material = material;
    }

}