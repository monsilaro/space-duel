import {
    Actor,
    CollisionGroupManager,
    CollisionType,
    Engine,
    Shape,
    vec,
} from 'excalibur';

import { Resources } from './resources';

export type EnemyAsset = 'meteor' | 'flaming_meteor' | 'flare';

export const EnemyCollisionGroup = CollisionGroupManager.create('enemy');

export class Enemy extends Actor {
    asset: EnemyAsset;
    speed: number;

    constructor({ asset }: { asset: EnemyAsset }) {
        const randomPosY = Math.floor(Math.random() * (200 - 50 + 1)) + 50;
        const randomPosX = Math.floor(Math.random() * (400 - 1300 + 1)) + 1300;

        super({
            pos: vec(randomPosX, randomPosY),
            scale: vec(3, 3),
            collider: Shape.Circle(16),
            collisionType: CollisionType.Active,
            collisionGroup: EnemyCollisionGroup,
        });

        this.speed = asset === 'meteor' ? 2 : 3;
        this.asset = asset;
    }

    onInitialize() {
        this.graphics.add(Resources[this.asset].toSprite());
    }

    onPostUpdate(engine: Engine, delta: number): void {
        this.transform.pos.y += this.speed;
    }
}
