import { Actor, Engine, Shape, Vector, vec } from 'excalibur';

import { Resources } from './resources';
import { degresToRadians } from './utils';

export type LaserAsset = 'laser';

export class Laser extends Actor {
    asset: LaserAsset;

    constructor({ asset, pos }: { asset: LaserAsset; pos: Vector }) {
        super({
            pos: vec(pos.x + 50, pos.y),
            width: 8,
            height: 12,
            rotation: degresToRadians(90),
        });

        this.asset = asset;
    }

    update(engine: Engine<any>, delta: number): void {
        super.update(engine, delta);

        this.transform.pos.x += 15 + delta;
    }

    onInitialize() {
        this.graphics.add(Resources[this.asset].toSprite());
    }
}
