import { Actor, Color, Engine, Font, Keys, Text, vec } from 'excalibur';

import { Game } from './main';
import { Laser } from './laser';
import { Resources } from './resources';
import { degresToRadians } from './utils';

export type PlayerAsset = 'ship1' | 'ship2' | 'ship3';

export class Player extends Actor {
    asset: PlayerAsset;
    shootMode: 'normal' | 'rapid' = 'normal';
    shootModeActor: Actor;

    constructor({
        asset,
        shootMode,
    }: {
        asset: PlayerAsset;
        shootMode: 'normal' | 'rapid';
    }) {
        super({
            pos: vec(100, 600),
            width: 32,
            height: 32,
            scale: vec(3, 3),
            rotation: degresToRadians(90),
        });

        this.asset = asset;
        this.shootMode = shootMode;
        this.shootModeActor = new Actor({
            pos: vec(100, 50),
        });
    }

    updateShootMode(newShootMode: 'normal' | 'rapid') {
        this.shootMode = newShootMode;
    }

    shootLaser(engine: Game) {
        console.log('fire');

        const laser = new Laser({ asset: 'laser', pos: this.pos });
        laser.on('collisionstart', () => {
            laser.kill();
        });
        engine.add(laser);
    }

    update(engine: Game, delta: number) {
        super.update(engine, delta);

        const shootModeText = new Text({
            text: `${this.shootMode}`,
            font: new Font({ size: 25, family: 'Arial' }),
            color: Color.Black,
        });
        this.shootModeActor.graphics.use(shootModeText);
        engine.add(this.shootModeActor);

        if (engine.input.keyboard.isHeld(Keys.ArrowUp)) {
            if (this.transform.pos.y - this.width / 2 > 0)
                this.transform.pos.y -= delta * 0.5;
        }

        if (engine.input.keyboard.isHeld(Keys.ArrowDown)) {
            if (this.transform.pos.y + this.width / 2 < engine.drawHeight)
                this.transform.pos.y += delta * 0.5;
        }

        if (this.shootMode === 'normal') {
            if (engine.input.keyboard.wasPressed(Keys.Space)) {
                console.log('shoot normal');
                this.shootLaser(engine);
            }
        } else if (this.shootMode === 'rapid') {
            if (engine.input.keyboard.isHeld(Keys.Space)) {
                console.log('shoot rapid');
                this.shootLaser(engine);
            }
        }
    }

    onInitialize() {
        this.graphics.add(Resources[this.asset].toSprite());
    }
}
