import {
    Actor,
    CollisionGroupManager,
    CollisionType,
    Engine,
    Shape,
    vec,
} from 'excalibur';

import { Resources } from './resources';
import { degresToRadians } from './utils';

export type EnemyAsset = 'meteor';

export const EnemyCollisionGroup = CollisionGroupManager.create('enemy');

export class Enemy extends Actor {
    asset: EnemyAsset;

    constructor({ asset }: { asset: EnemyAsset }) {
        const randomPosY = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
        const randomPosX = Math.floor(Math.random() * (500 - 1300 + 1)) + 1300;
        const randomRotation = Math.floor(Math.random() * (360 - 0 + 1)) + 0;

        super({
            pos: vec(randomPosX, randomPosY),
            rotation: degresToRadians(randomRotation),
            scale: vec(3, 3),
            collider: Shape.Circle(16),
            collisionType: CollisionType.Active,
            collisionGroup: EnemyCollisionGroup,
        });

        this.asset = asset;
    }

    onInitialize() {
        this.graphics.add(Resources[this.asset].toSprite());
    }

    onPostUpdate(engine: Engine, delta: number): void {
        this.transform.pos.y += 3;
    }
}
