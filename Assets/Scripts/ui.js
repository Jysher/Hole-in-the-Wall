'use strict';

class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 45;
        this.fontFamily = 'Nunito';

        this.correctAnswer = 'green';
        this.wrongAnswer = 'red';
        this.blinkRate = 250;
        this.blinkRateCounter = this.blinkRate;
        this.isBlinking = true;
    }

    draw(context) {
        context.save();

        switch (this.game.state) {
            case this.game.gameStates.countdownToStart:
                context.font = this.fontSize + 'px ' + this.fontFamily;
                context.fillStyle = 'black';
                context.fillText(`Starting in: ${(this.game.timeToStart * .001).toFixed(1)}`, 30, 40);
                context.fillStyle = 'white';
                context.fillText(`Starting in: ${(this.game.timeToStart * .001).toFixed(1)}`, 32, 42);
                break;

            case this.game.gameStates.drawTargetPose:
                context.font = this.fontSize + 'px ' + this.fontFamily;
                context.fillStyle = 'black';
                context.fillText(`Checking Pose in: ${(this.game.timeLimitCounter * .001).toFixed(1)}`, 30, 40);
                context.fillStyle = 'white';
                context.fillText(`Checking Pose in: ${(this.game.timeLimitCounter * .001).toFixed(1)}`, 32, 42);
                break;

            case this.game.gameStates.countdownToPose:
                context.font = this.fontSize + 'px ' + this.fontFamily;
                context.fillStyle = 'black';
                context.fillText(`Posing in: ${(this.game.timeToNextPoseCounter * .001).toFixed(1)}`, 30, 40);
                context.fillStyle = 'white';
                context.fillText(`Posing in: ${(this.game.timeToNextPoseCounter * .001).toFixed(1)}`, 32, 42);
                break;
            default:
                break;
        }

        context.restore();
    }

    doesPoseMatch(doesMatch, context, deltaTime) {
        this.blinkRateCounter -= deltaTime;

        if (this.blinkRateCounter <= 0) {
            this.isBlinking = !this.isBlinking;
            this.blinkRateCounter = this.blinkRate;
        }

        if (doesMatch) {
            if (this.isBlinking) {
                context.fillStyle = this.correctAnswer;
                context.fillRect(0, 0, this.game.width, this.game.height);
            }

        } else {
            if (this.isBlinking) {
                context.fillStyle = this.wrongAnswer;
                context.fillRect(0, 0, this.game.width, this.game.height);
            }
        }
    }
}

export { UI };