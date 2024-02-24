import { ImageSource, Loader, Vector } from 'excalibur';

import flaming_meteor from './asset/flaming_meteor.png';
import flare from './asset/flare.png';
import laser from './asset/laser.png';
import meteor from './asset/meteor.png';
import ship1 from './asset/ship_1.png';
import ship2 from './asset/ship_2.png';
import ship3 from './asset/ship_3.png';

export const Resources = {
    ship1: new ImageSource(ship1),
    ship2: new ImageSource(ship2),
    ship3: new ImageSource(ship3),

    meteor: new ImageSource(meteor),
    flare: new ImageSource(flare),
    flaming_meteor: new ImageSource(flaming_meteor),

    laser: new ImageSource(laser),
} as const;

export const loader = new Loader();

for (const res of Object.values(Resources)) {
    loader.addResource(res);
    loader.backgroundColor = 'DarkGray';
    //loader.logo = ship1;
}
