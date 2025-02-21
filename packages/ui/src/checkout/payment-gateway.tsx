import React, { useRef, useEffect } from 'react';

interface Point {
    x: number;
    y: number;
}

interface Segment {
    start: Point;
    end: Point;
}

export const PaymentGateway: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameId = useRef<number>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Define the three segments of the right angle triangle.
        // Here, the right angle is at (50, 50).
        const segments: Segment[] = [
            { start: { x: 50, y: 50 }, end: { x: 50, y: 150 } },  // Vertical line
            { start: { x: 50, y: 150 }, end: { x: 150, y: 50 } }, // Diagonal line
            { start: { x: 150, y: 50 }, end: { x: 50, y: 50 } },  // Horizontal line
        ];

        let currentSegmentIndex = 0; // Tracks which segment is being drawn
        let progress = 0; // Progress for the current segment (0 to 1)
        const duration = 1000; // Duration (ms) to draw each segment
        let lastTime: number | null = null;

        // Helper: Calculate the intermediate point along a segment using linear interpolation.
        const getCurrentPoint = (segment: Segment, progress: number): Point => {
            return {
                x: segment.start.x + (segment.end.x - segment.start.x) * progress,
                y: segment.start.y + (segment.end.y - segment.start.y) * progress,
            };
        };

        const animate = (timestamp: number) => {
            if (lastTime === null) lastTime = timestamp;
            const deltaTime = timestamp - lastTime;
            lastTime = timestamp;

            // Clear the canvas for a fresh redraw.
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Begin a new path.
            ctx.beginPath();
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;

            // Draw all fully completed segments.
            for (let i = 0; i < currentSegmentIndex; i++) {
                const seg = segments[i];
                ctx.moveTo(seg.start.x, seg.start.y);
                ctx.lineTo(seg.end.x, seg.end.y);
            }

            // Update the progress for the current segment.
            progress += deltaTime / duration;
            if (progress > 1) progress = 1;

            // Draw the current segment partially (from its start to the current point).
            if (currentSegmentIndex < segments.length) {
                const currentSegment = segments[currentSegmentIndex];
                const currentPoint = getCurrentPoint(currentSegment, progress);
                ctx.moveTo(currentSegment.start.x, currentSegment.start.y);
                ctx.lineTo(currentPoint.x, currentPoint.y);
            }

            ctx.stroke();

            // If the current segment is fully drawn, move to the next segment.
            if (progress >= 1) {
                currentSegmentIndex++;
                progress = 0;
                // If all segments are drawn, stop the animation.
                if (currentSegmentIndex >= segments.length) return;
            }

            // Continue the animation loop.
            animationFrameId.current = requestAnimationFrame(animate);
        };

        // Start the animation.
        animationFrameId.current = requestAnimationFrame(animate);

        // Cleanup: Cancel animation on component unmount.
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            width={300}
            height={300}
            style={{ border: '1px solid black' }}
        />
    );
};
