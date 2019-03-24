import { Compound, ITyre, Tyre, TyreMaterial } from "./models/Tyre";

let rollerTyre: Tyre = {
    diameter: {
        size: 26,
        sizeType: '"'
    },
    material: {
        compound: {},
        hardness: 'hard'
    },
    spikes: false
};

let rollerTyre2 = new Tyre(
    <Compound>{
        size: 26,
        sizeType: 'inches'
    },
    <TyreMaterial>{
        compound: {},
        hardness: 'hard'
    }
);

let commuteTyre: Tyre = {
    diameter: {
        size: 26,
        sizeType: 'inches'
    },
    material: {
        compound: { kind: 'rubber'},
        hardness: 'hard'
    },
    spikes: false
};
console.debug('//Spring-Autumn season', '\n', JSON.stringify(commuteTyre, null, 4), '\n');

// Put on spikes on commute tire
type SpikesType = Pick<ITyre, 'spikes'>;
const spikes: SpikesType = { spikes: true };

commuteTyre = Object.assign(commuteTyre, spikes, spikes);
console.debug('//Winter season', '\n', JSON.stringify(commuteTyre, null, 4), '\n');

console.log();
console.log('done');