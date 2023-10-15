import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

function useOnDraw(onDraw: (ctx: CanvasRenderingContext2D, point: Point, prevPoint: Point | null) => void) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const isDrawingRef = useRef(false);
    const prevPointRef = useRef<Point | null>(null);

    const mouseMoveListenerRef = useRef<((e: MouseEvent) => void) | null>(null);
    const mouseUpListenerRef = useRef<(() => void) | null>(null);

    useEffect(() => {
        function initMouseMoveListener() {
            const mouseMoveListener = (e: MouseEvent) => {
                if (isDrawingRef.current && canvasRef.current) {
                    const point = computePointInCanvas(e.clientX, e.clientY);
                    const ctx = canvasRef.current.getContext("2d");

                    if (onDraw && ctx && point) onDraw(ctx, point, prevPointRef.current);
                    prevPointRef.current = point;
                }
            };
            mouseMoveListenerRef.current = mouseMoveListener;
            window.addEventListener("mousemove", mouseMoveListener);
        }

        function initMouseUpListener() {
            const listener = () => {
                isDrawingRef.current = false;
                prevPointRef.current = null;
            };
            mouseUpListenerRef.current = listener;
            window.addEventListener("mouseup", listener);
        }

        function computePointInCanvas(clientX: number, clientY: number): Point | null {
            if (canvasRef.current) {
                const boundingRect = canvasRef.current.getBoundingClientRect();
                return {
                    x: clientX - boundingRect.left,
                    y: clientY - boundingRect.top,
                };
            } else {
                return null;
            }
        }

        function removeListeners() {
            if (mouseMoveListenerRef.current) {
                window.removeEventListener("mousemove", mouseMoveListenerRef.current);
            }
            if (mouseUpListenerRef.current) {
                window.removeEventListener("mouseup", mouseUpListenerRef.current);
            }
        }

        initMouseMoveListener();
        initMouseUpListener();
        return () => {
            removeListeners();
        };
    }, [onDraw]);

    function setCanvasRef(ref: HTMLCanvasElement | null) {
        canvasRef.current = ref;
    }

    function onMouseDown() {
        isDrawingRef.current = true;
    }

    return {
        setCanvasRef,
        onMouseDown,
    };
}

export default useOnDraw;
