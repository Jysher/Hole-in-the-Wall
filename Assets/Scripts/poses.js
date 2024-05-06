'use strict';

class Pose {
    constructor(game) {
        this.game = game;
        this.pose = [
            { x: 0, y: 0, name: 'head' },
            { x: 0, y: 0, name: 'leftShoulder' },
            { x: 0, y: 0, name: 'rightShoulder' },
            { x: 0, y: 0, name: 'leftElbow' },
            { x: 0, y: 0, name: 'rightElbow' },
            { x: 0, y: 0, name: 'leftWrist' },
            { x: 0, y: 0, name: 'rightWrist' },
            { x: 0, y: 0, name: 'leftHip' },
            { x: 0, y: 0, name: 'rightHip' },
            { x: 0, y: 0, name: 'leftKnee' },
            { x: 0, y: 0, name: 'rightKnee' },
            { x: 0, y: 0, name: 'leftAnkle' },
            { x: 0, y: 0, name: 'rightAnkle' },
        ]
    }

    drawCircle(context, x = 0, y = 0, diameter = 0, color = 'red') {
        context.beginPath();
        context.arc(x, y, diameter, 0, 2 * Math.PI);
        context.fillStyle = color;
        context.fill();
    }

    drawShape(context, points, isClosedShape = false, lineWidth = 1) {
        context.lineWidth = lineWidth;
        context.beginPath();

        let pointStart = false;
        for (let i = 0; i < points.length; i++) {
            if (points[i] === undefined) continue;
            if (!pointStart) {
                context.moveTo(points[i].x, points[i].y);
                pointStart = true;
                continue;
            }
            context.lineTo(points[i].x, points[i].y)
        }

        if (isClosedShape) context.closePath();

        context.stroke();
    }

    drawAnchorPoint(context, bodyPart, size = 10, color = 'red') {
        this.drawCircle(context, bodyPart.x, bodyPart.y, size, color);
    }

    drawHead(context, size = 10, color = 'yellow') {
        if (this.pose[0] !== undefined) this.drawAnchorPoint(context, this.pose[0], size, color);

        // Draw Neck
        const neck = {
            x: ((this.pose[2]?.x ?? this.pose[1].x) + (this.pose[1]?.x ?? this.pose[2].x)) * 0.5,
            y: ((this.pose[2]?.y ?? this.pose[1].y) + (this.pose[1]?.y ?? this.pose[2].y)) * 0.5
        };

        this.drawShape(context, [neck, this.pose[0]], false, 1);
    }

    drawBody(context, size = 8, color = 'red') {
        if (this.pose[1] !== undefined) this.drawAnchorPoint(context, this.pose[1], size, color);
        if (this.pose[2] !== undefined) this.drawAnchorPoint(context, this.pose[2], size, color);
        if (this.pose[7] !== undefined) this.drawAnchorPoint(context, this.pose[7], size, color);
        if (this.pose[8] !== undefined) this.drawAnchorPoint(context, this.pose[8], size, color);

        const body = [
            this.pose[1] ?? this.pose[2],
            this.pose[2] ?? this.pose[1],
            this.pose[8] ?? this.pose[7],
            this.pose[7] ?? this.pose[8]
        ];

        this.drawShape(context, body, true, 1);
    }

    drawHands(context, size = 8, color = 'blue') {
        // Left Hand
        if (this.pose[3] !== undefined) this.drawAnchorPoint(context, this.pose[3], size, color);
        if (this.pose[5] !== undefined) this.drawAnchorPoint(context, this.pose[5], size, color);

        const leftHand = [
            this.pose[1] ?? this.pose[2],
            this.pose[3],
            this.pose[5]
        ];

        this.drawShape(context, leftHand, false, 1);

        // Right Hand
        if (this.pose[4] !== undefined) this.drawAnchorPoint(context, this.pose[4], size, color);
        if (this.pose[6] !== undefined) this.drawAnchorPoint(context, this.pose[6], size, color);

        const rightHand = [
            this.pose[2] ?? this.pose[1],
            this.pose[4],
            this.pose[6]
        ];

        this.drawShape(context, rightHand, false, 1);
    }

    drawFeet(context, size = 8, color = 'green') {
        // Left Foot
        if (this.pose[9] !== undefined) this.drawAnchorPoint(context, this.pose[9], size, color);
        if (this.pose[11] !== undefined) this.drawAnchorPoint(context, this.pose[11], size, color);

        const leftFoot = [
            this.pose[7] ?? this.pose[8],
            this.pose[9],
            this.pose[11]
        ];

        this.drawShape(context, leftFoot, false, 1);

        // Right Foot
        if (this.pose[10] !== undefined) this.drawAnchorPoint(context, this.pose[10], size, color);
        if (this.pose[12] !== undefined) this.drawAnchorPoint(context, this.pose[12], size, color);

        const rightFoot = [
            this.pose[8] ?? this.pose[7],
            this.pose[10],
            this.pose[12]
        ];

        this.drawShape(context, rightFoot, false, 1);
    }

    drawPose(context) {
        this.drawHead(context, 10, 'yellow');
        this.drawBody(context, 10, 'yellow');
        this.drawHands(context, 10, 'yellow');
        this.drawFeet(context, 10, 'yellow');
    }
}

class StandPose extends Pose {
    constructor(game) {
        super(game);
        this.pose = [
            { x: 970, y: 49, name: 'head' },
            { x: 1097, y: 214, name: 'leftShoulder' },
            { x: 873, y: 209, name: 'rightShoulder' },
            { x: 1139, y: 396, name: 'leftElbow' },
            { x: 824, y: 370, name: 'rightElbow' },
            { x: 1144, y: 515, name: 'leftWrist' },
            { x: 821, y: 529, name: 'rightWrist' },
            { x: 1057, y: 562, name: 'leftHip' },
            { x: 886, y: 551, name: 'rightHip' },
            { x: 1082, y: 790, name: 'leftKnee' },
            { x: 884, y: 792, name: 'rightKnee' },
            { x: 1114, y: 1020, name: 'leftAnkle' },
            { x: 863, y: 1020, name: 'rightAnkle' },
        ];
    }

    draw(context) {
        super.drawPose(context);
    }
}

class TPose extends Pose {
    constructor(game) {
        super(game);
        this.pose = [
            { x: 976, y: 50, name: 'head' },
            { x: 1105, y: 191, name: 'leftShoulder' },
            { x: 879, y: 182, name: 'rightShoulder' },
            { x: 1276, y: 200, name: 'leftElbow' },
            { x: 711, y: 197, name: 'rightElbow' },
            { x: 1443, y: 207, name: 'leftWrist' },
            { x: 544, y: 185, name: 'rightWrist' },
            { x: 1073, y: 515, name: 'leftHip' },
            { x: 897, y: 519, name: 'rightHip' },
            { x: 1072, y: 797, name: 'leftKnee' },
            { x: 919, y: 782, name: 'rightKnee' },
            { x: 1093, y: 1020, name: 'leftAnkle' },
            { x: 899, y: 1020, name: 'rightAnkle' },
        ];
    }

    draw(context) {
        super.drawPose(context);
    }
}

class SidePose extends Pose {
    constructor(game) {
        super(game);
        this.pose = [
            { x: 993, y: 57, name: 'head' },
            { x: 1116, y: 165, name: 'leftShoulder' },
            undefined,
            { x: 953, y: 285, name: 'leftElbow' },
            undefined,
            { x: 760, y: 345, name: 'leftWrist' },
            undefined,
            { x: 1061, y: 527, name: 'leftHip' },
            undefined,
            { x: 1031, y: 783, name: 'leftKnee' },
            undefined,
            { x: 1057, y: 1038, name: 'leftAnkle' },
            undefined,
        ];
    }

    draw(context) {
        super.drawPose(context);
    }
}

class CrabPose extends Pose {
    constructor(game) {
        super(game);
        this.pose = [
            { x: 954, y: 245, name: 'head' },
            { x: 1097, y: 383, name: 'leftShoulder' },
            { x: 860, y: 377, name: 'rightShoulder' },
            { x: 1222, y: 437, name: 'leftElbow' },
            { x: 695, y: 429, name: 'rightElbow' },
            { x: 1192, y: 247, name: 'leftWrist' },
            { x: 757, y: 257, name: 'rightWrist' },
            { x: 1046, y: 715, name: 'leftHip' },
            { x: 873, y: 684, name: 'rightHip' },
            { x: 1210, y: 830, name: 'leftKnee' },
            { x: 755, y: 852, name: 'rightKnee' },
            { x: 1137, y: 1005, name: 'leftAnkle' },
            { x: 870, y: 1017, name: 'rightAnkle' },
        ];
    }

    draw(context) {
        super.drawPose(context);
    }
}

class RunPose extends Pose {
    constructor(game) {
        super(game);
        this.pose = [
            { x: 890, y: 118, name: 'head' },
            { x: 1011, y: 217, name: 'leftShoulder' },
            undefined,
            { x: 1106, y: 351, name: 'leftElbow' },
            { x: 800, y: 384, name: 'rightElbow' },
            { x: 1149, y: 502, name: 'leftWrist' },
            { x: 727, y: 260, name: 'rightWrist' },
            { x: 1012, y: 565, name: 'leftHip' },
            undefined,
            { x: 986, y: 810, name: 'leftKnee' },
            { x: 800, y: 774, name: 'rightKnee' },
            { x: 1131, y: 1012, name: 'leftAnkle' },
            { x: 824, y: 1032, name: 'rightAnkle' },
        ];
    }

    draw(context) {
        super.drawPose(context);
    }
}

class OneFootBalancePose extends Pose {
    constructor(game) {
        super(game);
        this.pose = [
            { x: 1151, y: 28, name: 'head' },
            { x: 1160, y: 198, name: 'leftShoulder' },
            { x: 973, y: 142, name: 'rightShoulder' },
            { x: 1308, y: 210, name: 'leftElbow' },
            { x: 834, y: 254, name: 'rightElbow' },
            { x: 1481, y: 234, name: 'leftWrist' },
            { x: 707, y: 383, name: 'rightWrist' },
            undefined,
            { x: 958, y: 511, name: 'rightHip' },
            { x: 725, y: 735, name: 'leftKnee' },
            { x: 936, y: 777, name: 'rightKnee' },
            { x: 525, y: 876, name: 'leftAnkle' },
            { x: 915, y: 1051, name: 'rightAnkle' },
        ];
    }

    draw(context) {
        super.drawPose(context);
    }
}

export { StandPose, TPose, SidePose, CrabPose, RunPose, OneFootBalancePose };