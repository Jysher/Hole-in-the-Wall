'use strict';

import { drawKeypoints, drawSkeleton } from "./util.js";

let poses;
let hasPlayerFeed = false;
const minScore = 0.10;

const detectorConfig = {
    architecture: 'MobileNetV1',
    outputStride: 16,
    inputResolution: { width: 0, height: 0 },
    multiplier: 1
};

const estimationConfig = {
    maxPoses: 5,
    flipHorizontal: false,
    scoreThreshold: 0.5,
    nmsRadius: 20
};

async function setupCamera() {
    const video = document.getElementById('webcam');

    const stream = await navigator.mediaDevices.getUserMedia({
        // video: { width: webcamSettings.width, height: webcamSettings.width / 16 * 9 },
        video: {
            width: { min: 640, ideal: 1920 },
            height: { min: 360, ideal: 1080 }
        },
        audio: false
    }).catch((err) => {
        alert("Please allow access to camera");
    });
    const streamSettings = stream.getVideoTracks()[0].getSettings();
    stream.getVideoTracks()[0].applyConstraints({ width: streamSettings.width, height: streamSettings.width / 16 * 9 });

    video.width = streamSettings.width;
    video.height = streamSettings.width / 16 * 9;
    detectorConfig.inputResolution.width = video.width;
    detectorConfig.inputResolution.height = video.height;
    video.srcObject = stream;

    return new Promise((resolve) => {
        video.onloadedmetadata = () => {
            resolve(video);
        };
    });
}

async function loadPoseModel() {
    const detector = await poseDetection.createDetector(poseDetection.SupportedModels.PoseNet, detectorConfig);
    return detector;
}

async function estimatePoses(canvas, videoWidth, videoHeight, context) {
    const webcam = await setupCamera();
    const poseModel = await loadPoseModel();

    async function detectPose() {
        poses = await poseModel.estimatePoses(canvas, estimationConfig);

        context.clearRect(0, 0, videoWidth, videoHeight);

        drawImage(context, webcam, videoWidth, videoHeight);

        poses.forEach(pose => {
            drawKeypoints(pose.keypoints, minScore, context);
            drawSkeleton(pose.keypoints, minScore, context);
        });

        requestAnimationFrame(detectPose);
        if (!hasPlayerFeed) hasPlayerFeed = true;
    }

    detectPose();
}

function drawImage(context, image, videoWidth, videoHeight) {
    context.drawImage(image, 0, 0, image.width, image.height, 0, 0, videoWidth, videoHeight);
}

export { estimatePoses, poses, hasPlayerFeed };