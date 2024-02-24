import { Actor, Engine, Keys, vec } from 'excalibur';

import { Game } from './main';
import { Laser } from './laser';
import { Resources } from './resources';
import { degresToRadians } from './utils';

export type PlayerAsset = 'ship1' | 'ship2' | 'ship3';

export class Player extends Actor {
    asset: PlayerAsset;

    constructor({ asset }: { asset: PlayerAsset }) {
        super({
            pos: vec(100, 600),
            width: 32,
            height: 32,
            scale: vec(3, 3),
            rotation: degresToRadians(90),
        });

        this.asset = asset;
    }

    update(engine: Game, delta: number) {
        super.update(engine, delta);

        if (engine.input.keyboard.isHeld(Keys.ArrowUp)) {
            if (this.transform.pos.y - this.width / 2 > 0)
                this.transform.pos.y -= delta * 0.5;
        }

        if (engine.input.keyboard.isHeld(Keys.ArrowDown)) {
            if (this.transform.pos.y + this.width / 2 < engine.drawHeight)
                this.transform.pos.y += delta * 0.5;
        }

        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            console.log('fire');

            const laser = new Laser({ asset: 'laser', pos: this.pos });
            laser.on('collisionstart', () => {
                engine.incrementScore();
                laser.kill();

                console.log('collision');
            });
            engine.add(laser);
        }
    }

    onInitialize() {
        this.graphics.add(Resources[this.asset].toSprite());
    }
}
