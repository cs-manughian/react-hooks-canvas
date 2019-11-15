import React from 'react';
import { useCanvas } from './useCanvas';
import './Graph.scss';

const LINE_STYLES = {
    DASHED: 'dashed',
    SOLID: 'solid'
}

function Graph() {
    const HEIGHT_CANVAS = 550;
    const WIDTH_CANVAS = 700;

    let canvasRef = useCanvas(
        (context) => render(context),
        '2d'
    );

    function render(context) {
        eraseCanvas(context);
        let rotationStep = 0;
            
        drawCircle({context});
        drawCircle({context, radius: (WIDTH_CANVAS / 9), lineStyle: LINE_STYLES.DASHED});
        drawCircle({context, radius: (WIDTH_CANVAS / 10), lineWidth: 3});
        drawCircle({context, radius: (WIDTH_CANVAS / 12)});
        drawCircle({context, radius: (WIDTH_CANVAS / 18), lineStyle: LINE_STYLES.DASHED, lineWidth: 1});
        drawCircle({context, radius: (WIDTH_CANVAS / 26), lineWidth: 2});
        drawCircle({context, radius: (WIDTH_CANVAS / 32), lineWidth: 1});

        drawBox({
            context,
            lineStyle: LINE_STYLES.DASHED, 
            rotation: Math.abs(Math.cos(rotationStep))
        });
        drawBox({
            context,
            boxWidth: 250, 
            boxHeight: 250, 
            lineStyle: LINE_STYLES.SOLID, 
            rotation: Math.abs(Math.cos(rotationStep))
        });

        rotationStep += 0.01;
    }

    function drawCircle({
        context,
        radius = (WIDTH_CANVAS / 8),
        lineStyle = LINE_STYLES.SOLID,
        lineWidth = 1
    }) {
        let circle = {
            center: {
                x: WIDTH_CANVAS / 2,
                y: HEIGHT_CANVAS / 2
            },
            r: radius,
            startAngle: 0,
            endAngle: 2 * Math.PI,
            counterClockwise: false,
            lineDistance: 1,
            lineGap: 4,
            lineWidth: lineWidth
        };

        // Set line style
        let lineDash = lineStyle === LINE_STYLES.DASHED
            ? [circle.lineDistance, circle.lineGap]
            : [0,0];
        context.setLineDash(lineDash);

        // Draw circle
        context.beginPath();
        context.lineWidth = circle.lineWidth;
        context.arc(
            circle.center.x,
            circle.center.y,
            circle.r,
            circle.startAngle,
            circle.endAngle,
            circle.counterClockwise
        );
        context.strokeStyle = '#fff';
        context.stroke();
    }

    function drawBox({
        context,
        boxWidth = 300,
        boxHeight = 300,
        lineStyle = LINE_STYLES.SOLID,
        rotation
    }) {
        const centeredX = WIDTH_CANVAS / 2 - boxWidth / 2;
        const centeredY = HEIGHT_CANVAS / 2 - boxHeight / 2;

        let box = {
            xUpperLeft: centeredX,
            yUpperLeft: centeredY,
            width: boxWidth,
            height: boxHeight,
            lineDistance: 1,
            lineGap: 4,
            rotation: degreesToRadians(rotation)
        };

        // Set line style
        let lineDash = lineStyle === LINE_STYLES.DASHED
            ? [box.lineDistance, box.lineGap]
            : [0,0];
        context.setLineDash(lineDash);

        context.beginPath();

        // Rotate around center
        context.translate(centeredX + boxWidth / 2, centeredY + boxHeight / 2);
        context.rotate(box.rotation);
        context.translate(-(centeredX + boxWidth / 2), -(centeredY + boxHeight / 2));

        
        // Draw box
        context.rect(
            box.xUpperLeft,
            box.yUpperLeft,
            box.width,
            box.height
            );
        context.stroke();
    }

    function eraseCanvas(context) {
        context.clearRect(0, 0, WIDTH_CANVAS, HEIGHT_CANVAS);
    }

    function degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
    }

    return (
        <div className="graph">
            <canvas
                className="centered"
                ref={canvasRef}
                width={WIDTH_CANVAS}
                height={HEIGHT_CANVAS}
            >
            </canvas>
        </div>
    );
}

export default Graph;
