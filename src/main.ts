import { Actor, Color, Engine, Font, Scene, Text, vec } from 'excalibur';
import { Enemy, EnemyAsset } from './enemy';

import { Player } from './player';
import { loader } from './resources';

export type ShootMode = 'normal' | 'rapid';

export class Game extends Engine {
    score: number;
    lives: number;

    scoreActor: Actor;
    livesActor: Actor;
    gameOverActor: Actor;

    playerActor: Actor;

    constructor() {
        super({
            width: 1500,
            height: 692,
            backgroundColor: Color.DarkGray,
        });

        this.score = 0;
        this.lives = 3;

        this.scoreActor = new Actor({
            pos: vec(this.drawWidth - 100, 50),
        });
        this.livesActor = new Actor({
            pos: vec(this.drawWidth - 225, 50),
        });
        this.gameOverActor = new Actor({
            pos: vec(this.drawWidth / 2, this.drawHeight / 2),
        });

        this.playerActor = new Player({ asset: 'ship3', shootMode: 'normal' });
    }

    initialize() {
        this.currentScene.add(this.scoreActor);
        this.currentScene.add(this.livesActor);

        this.start(loader);
    }

    onPostUpdate(engine: Engine, delta: number) {
        const scoreText = new Text({
            text: `Score: ${this.score}`,
            font: new Font({ size: 25, family: 'Arial' }),
            color: Color.Yellow,
        });
        const livesText = new Text({
            text: `Lives: ${this.lives}`,
            font: new Font({ size: 25, family: 'Arial' }),
            color: Color.Green,
        });

        this.scoreActor.graphics.use(scoreText);
        this.livesActor.graphics.use(livesText);

        this.add(this.playerActor);

        if (this.lives === 0) {
            const gameOverText = new Text({
                text: 'Game Over',
                color: Color.Red,
                font: new Font({ size: 70 }),
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
            if (this.ready) {
                console.log('addEnemy');

                const randomSpawn = Math.random();
                let enemyAsset: EnemyAsset;

                if (randomSpawn < 0.05) {
                    // 5% chance for flare
                    enemyAsset = 'flare';
                } else if (randomSpawn < 0.15) {
                    // 10% chance for flaming meteor
                    enemyAsset = 'flaming_meteor';
                } else {
                    // 85% chance for regular meteor
                    enemyAsset = 'meteor';
                }
                const enemy = new Enemy({
                    asset: enemyAsset,
                });

                enemy.on('collisionstart', () => {
                    if (enemy.asset === 'flaming_meteor') {
                        this.incrementScore();
                        this.incrementScore();
                        this.incrementScore();
                        this.incrementScore();
                    } else if (enemy.asset === 'flare') {
                        (this.playerActor as Player).updateShootMode('rapid');

                        setTimeout(() => {
                            (this.playerActor as Player).updateShootMode(
                                'normal'
                            );
                        }, 5000);
                    } else {
                        this.incrementScore();
                    }
                    enemy.kill();
                });

                enemy.on('exitviewport', () => {
                    this.decrementLives();
                    enemy.kill();
                });

                this.add(enemy);
            }
        }, 1500);
    }
}

export const game = new Game();

game.initialize();
game.addEnemies();
