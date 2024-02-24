import { Actor, Color, Engine, Scene, Text, vec } from 'excalibur';

import { Enemy } from './enemy';
import { Player } from './player';
import { loader } from './resources';

export class Game extends Engine {
    score: number;
    lives: number;

    scoreActor: Actor;
    livesActor: Actor;
    gameOverActor: Actor;

    constructor() {
        super({
            width: 1500,
            height: 692,
        });

        this.score = 0;
        this.lives = 3;

        this.scoreActor = new Actor({
            pos: vec(this.drawWidth - 100, 50),
        });
        this.livesActor = new Actor({
            pos: vec(this.drawWidth - 250, 50),
        });
        this.gameOverActor = new Actor({
            pos: vec(this.drawWidth / 2, this.drawHeight / 2),
        });
    }

    initialize() {
        const player = new Player({ asset: 'ship3' });

        this.add(player);
        this.currentScene.add(this.scoreActor);
        this.currentScene.add(this.livesActor);

        this.start(loader);
    }

    onPostUpdate(engine: Engine, delta: number) {
        const scoreText = new Text({
            text: `Score: ${this.score}`,
            scale: vec(3, 3),
        });
        const livesText = new Text({
            text: `Lives: ${this.lives}`,
            scale: vec(3, 3),
        });

        this.scoreActor.graphics.use(scoreText);
        this.livesActor.graphics.use(livesText);

        if (this.lives === 0) {
            const gameOverText = new Text({
                text: 'Game Over',
                scale: vec(5, 5),
                color: Color.Red,
            });

            this.currentScene.add(this.gameOverActor);
            this.gameOverActor.graphics.use(gameOverText);

            this.stop();
        }
    }

    incrementScore() {
        this.score += 5;
    }

    decrementLives() {
        this.lives -= 1;
    }

    addEnemies() {
        setInterval(() => {
            const enemy = new Enemy({ asset: 'meteor' });

            enemy.on('collisionstart', () => {
                enemy.kill();
            });

            enemy.on('exitviewport', () => {
                this.decrementLives();
                enemy.kill();
            });

            this.add(enemy);
        }, 1500);
    }
}

export const game = new Game();

game.initialize();
game.addEnemies();
