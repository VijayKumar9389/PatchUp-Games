import { Box, useMediaQuery, useTheme } from '@mui/material';
import React, { useState, useCallback, useEffect } from 'react';

type CircleNode = {
    id: string;
    level: number;
    children?: CircleNode[];
};

const generateChildren = (parent: CircleNode): CircleNode[] => {
    return [0, 1, 2, 3].map((i) => ({
        id: `${parent.id}-${i}`,
        level: parent.level + 1,
    }));
};

const Circle = ({
    node,
    size,
    onUpdateLeaves,
    MAX_LEVEL,
    hoveredNodeId,
    onPointerMove
}: {
    node: CircleNode;
    size: number;
    onUpdateLeaves: (delta: number) => void;
    MAX_LEVEL: number;
    hoveredNodeId: string | null;
    onPointerMove: (e: React.PointerEvent) => void;
}) => {
    const [children, setChildren] = useState<CircleNode[] | undefined>(node.children);

    const handleHover = () => {
        if (!children && node.level < MAX_LEVEL) {
            const newChildren = generateChildren(node);
            setChildren(newChildren);
            onUpdateLeaves(3);
        }
    };
    useEffect(() => {
        if (hoveredNodeId !== node.id) return;
        if (children) return;
        if (node.level >= MAX_LEVEL) return;

        const newChildren = generateChildren(node);
        setChildren(newChildren);
        onUpdateLeaves(3);
    }, [hoveredNodeId]);

    if (children) {
        const halfSize = size / 2;
        return (
            <div
                onPointerMove={onPointerMove}
                onPointerDown={onPointerMove}
                style={{
                    position: 'relative',
                    width: size,
                    height: size,
                    touchAction: 'none',
                    userSelect: "none",
                    WebkitUserSelect: "none",
                }}
            >

                {children.map((child, index) => {
                    const style: React.CSSProperties = {
                        position: 'absolute',
                        width: halfSize,
                        height: halfSize,
                        top: index < 2 ? 0 : halfSize,
                        left: index % 2 === 0 ? 0 : halfSize,

                    };
                    return (
                        <div style={style} key={child.id} >
                            <Circle
                                node={child}
                                size={halfSize}
                                MAX_LEVEL={MAX_LEVEL}
                                onUpdateLeaves={onUpdateLeaves}
                                onPointerMove={onPointerMove}
                                hoveredNodeId={hoveredNodeId}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }

    const getColorForLevel = (level: number) => {
        const colors = ['#69b', '#7cc', '#8d8', '#fb4', '#f88', '#00A2E8'];
        return colors[level] || '#ccc';
    };

    return (
        <div
            data-node-id={node.id}
            onPointerDown={handleHover}
            onPointerUp={() => { }}
            style={{
                width: size,
                height: size,
                borderRadius: '50%',
                backgroundColor: getColorForLevel(node.level),
                margin: 'auto',
                alignItems: 'center',
                justifyContent: 'center',
                touchAction: 'none',
                userSelect: "none",
                WebkitUserSelect: "none",
            }}
        />
    );
};

interface CircleGridGameProps {
    onSend: (text: string, userSelected: boolean, activity: string) => void;
    setFinished?: (finished: boolean) => void;
}

const CircleGridGame: React.FC<CircleGridGameProps> = ({ onSend, setFinished }) => {
    const [leafCount, setLeafCount] = useState(1); // start with root circle
    const [completed, setCompleted] = useState(false);
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.only('xs'));
    const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

    const onPointerMove = (e: React.PointerEvent) => {
        const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
        const nodeEl = el?.closest("[data-node-id]") as HTMLElement | null;
        setHoveredNodeId(nodeEl?.dataset.nodeId ?? null);
    };
    let circleSize, MAX_LEVEL, TOTAL_CIRCLES;
    if (isXs) {
        circleSize = 256;
        MAX_LEVEL = 4;
    } else {
        circleSize = 512;
        MAX_LEVEL = 5;
    }
    TOTAL_CIRCLES = 4 ** MAX_LEVEL;
    const handleUpdateLeaves = useCallback((delta: number) => {
        setLeafCount(prev => {
            const newCount = prev + delta;
            if (newCount === TOTAL_CIRCLES) {
                setCompleted(true);
            }
            return newCount;
        });
    }, []);

    React.useEffect(() => {
        if (completed) {
            setFinished?.(true);
            setTimeout(() => {
                onSend('Exercise Completed!', false, 'circle_grid_game');
            }, 5000); // Delay to allow user to see completion

        }
    }, [completed]);

    const rootNode: CircleNode = { id: 'root', level: 0 };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 2,
                touchAction: 'none',
            }}
        >

            <Circle
                node={rootNode}
                MAX_LEVEL={MAX_LEVEL}
                size={circleSize}
                onUpdateLeaves={handleUpdateLeaves}
                onPointerMove={onPointerMove}
                hoveredNodeId={hoveredNodeId}
            />
        </Box>
    );
};

export default CircleGridGame;
