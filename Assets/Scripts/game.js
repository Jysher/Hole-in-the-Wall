'use strict';

import { poses, hasPlayerFeed } from "./posenetSetup.js";
import { StandPose, TPose, SidePose, CrabPose, RunPose, OneFootBalancePose } from "./poses.js";
import { UI } from "./ui.js";

class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.deltaTime = 0;
        this.timeToStart = 5000;
        this.timeLimit = 5000;
        this.timeLimitCounter = this.timeLimit;
        this.timeToNextPose = 2000;
        this.timeToNextPoseCounter = this.timeToNextPose;

        this.targetPoses = [
            new StandPose(this),
            new TPose(this),
            new SidePose(this),
            new CrabPose(this),
            new RunPose(this),
            new OneFootBalancePose(this),
        ];
        this.targetPoseIndex = 0;
        this.useStandPose = true;
        this.doesPoseMatch = false;
        this.showAnswer = 1000;
        this.showAnswerCounter = this.showAnswer;
        this.hasCheckedPose = false;

        this.ui = new UI(this);

        this.gameStates = {
            waitingPlayerFeed: 'waitingPlayerFeed',
            countdownToStart: 'countDownToStart',
            selectTargetPose: 'selectTargetPose',
            drawTargetPose: 'drawTargetPose',
            checkingPose: 'checkingPose',
            countdownToPose: 'countdownToPose',
        }

        this.state = this.gameStates.waitingPlayerFeed;
    }

    update(deltaTime, context) {
        this.deltaTime += deltaTime;

        switch (this.state) {
            case this.gameStates.waitingPlayerFeed:
                if (hasPlayerFeed) this.state = this.gameStates.countdownToStart;
                break;

            case this.gameStates.countdownToStart:
                if (this.timeToStart > 0) this.timeToStart -= deltaTime;
                else this.state = this.gameStates.selectTargetPose;
                break;

            case this.gameStates.selectTargetPose:
                if (!this.useStandPose) this.targetPoseIndex = this.selectNextPose(this.targetPoses);
                this.state = this.gameStates.countdownToPose;
                break;

            case this.gameStates.drawTargetPose:
                this.timeLimitCounter -= deltaTime;
                this.targetPoses[this.targetPoseIndex].draw(context);

                if (this.timeLimitCounter <= 0) {
                    this.timeLimitCounter = this.timeLimit;
                    this.useStandPose = false;
                    this.hasCheckedPose = false;
                    this.state = this.gameStates.checkingPose;
                }
                break;

            case this.gameStates.checkingPose:
                this.targetPoses[this.targetPoseIndex].draw(context);
                if (!this.hasCheckedPose) {
                    this.checkPose(poses, this.targetPoses[this.targetPoseIndex]);
                    this.hasCheckedPose = true;
                }
                this.showAnswerCounter -= deltaTime;

                this.ui.doesPoseMatch(this.doesPoseMatch, context, deltaTime);

                if (this.showAnswerCounter <= 0) {
                    this.showAnswerCounter = this.showAnswer;
                    this.ui.isBlinking = true;
                    this.ui.blinkRateCounter = this.ui.blinkRate;
                    this.state = this.gameStates.selectTargetPose;
                }
                break;

            case this.gameStates.countdownToPose:
                this.timeToNextPoseCounter -= deltaTime;
                this.targetPoses[this.targetPoseIndex].draw(context);

                if (this.timeToNextPoseCounter <= 0) {
                    this.timeToNextPoseCounter = this.timeToNextPose;
                    this.state = this.gameStates.drawTargetPose;
                }
                break;

            default:
                break;
        }
    }

    draw(context) {
        context.clearRect(0, 0, this.width, this.height);
        this.ui.draw(context);
    }

    selectNextPose(targetPoses) {
        const randomTargetPoseIndex = Math.floor((Math.random() * (targetPoses.length)));
        return randomTargetPoseIndex;
    }

    checkCoordinates(bodyPart, targetBodyPart) {
        const marginOfError = 25 * this.widthRatio;
        if (targetBodyPart === undefined) return true;
        if ((bodyPart.x >= targetBodyPart.x - marginOfError &&
            bodyPart.x <= targetBodyPart.x + marginOfError) &&
            (bodyPart.y >= targetBodyPart.y - marginOfError &&
                bodyPart.y <= targetBodyPart.y + marginOfError)
        ) return true;
        else return false;
    }

    checkPose(currentPose, targetPose) {
        const doesBodyPartMatch = new Array(targetPose.pose.length).fill(false);
        this.doesPoseMatch = false;

        // Loop through and check captured player pose with target pose keypoints
        for (let i = 0; i < targetPose.pose.length; i++) {
            if (doesBodyPartMatch[i]) continue;
            if (targetPose.pose[i] === undefined) {
                doesBodyPartMatch[i] = true;
                continue;
            }

            for (let j = 0; j < currentPose.length; j++) {
                if (doesBodyPartMatch[i]) break;

                for (let k = 0; k < currentPose[j].keypoints.length; k++) {
                    if (doesBodyPartMatch[i]) break;
                    if (this.checkCoordinates(currentPose[j].keypoints[k], targetPose.pose[i])) doesBodyPartMatch[i] = true;
                }
            }
        }

        // Check if all keypoints match
        for (let i = 0; i < doesBodyPartMatch.length; i++) {
            if (!doesBodyPartMatch[i]) break;
            if (i !== doesBodyPartMatch.length - 1) continue;
            if (i === doesBodyPartMatch.length - 1 && doesBodyPartMatch[i]) this.doesPoseMatch = true;
        }
    }
}

export { Game };