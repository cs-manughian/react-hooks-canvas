import { useRef, useEffect } from 'react';

export function useCanvas(drawFn, context='2d') {
    let canvasRef = useRef();

    useEffect(() => {
        let canvas = canvasRef.current;
        let ctx = canvas.getContext(context);
        let requestId;

        const render = () => {
            requestId = requestAnimationFrame(render);
            drawFn(ctx);
        };

        render();

        return () => {
            cancelAnimationFrame(requestId);
        }
    });   

    return canvasRef;
}