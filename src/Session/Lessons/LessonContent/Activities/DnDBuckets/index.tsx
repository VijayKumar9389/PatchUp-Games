// MinimalDndKitBuckets.tsx
import React, { useContext } from "react";
import {
    DndContext,
    useSensor,
    useSensors,
    PointerSensor,
    DragEndEvent,
    DragOverlay,
    pointerWithin,
} from "@dnd-kit/core";
import { motion } from "framer-motion";
import { IconButton, useMediaQuery, useTheme, alpha } from '@mui/material';
import { useDensity } from '../../../../../hooks/useDensity';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { AudioContext } from "../../..";

const gradientPrimary = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
const gradientPrimaryHover = 'linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%)';

type Item = { id: string; label: string; correctCategory?: string };
type BucketId = string;

export default function MinimalDndKitBuckets({
    categories,
    items,
    setActivityCompleted,

}: {
    categories?: [string, string];
    items?: Item[];
    setActivityCompleted: (completed: boolean) => void;
}) {
    const [shakingIds, setShakingIds] = React.useState<string[]>([]);
    const [submitted, setSubmitted] = React.useState(false);
    const { muteAudio, handleSpeak } = useContext(AudioContext);
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.only('xs'));
    const singleBucket = Number(categories?.length) === 1;
    const showInitialPool = !isXs || singleBucket;
    const [buckets, setBuckets] = React.useState<Record<string, Item[]>>(() => {

        const initialBuckets: Record<string, Item[]> = {
            pool: [],
            [categories[0]]: [],
            [categories[1]]: [],
        };

        if (!showInitialPool) {
            // Randomly distribute each item into one of the two categories
            items.slice(0, 4).forEach(item => {
                const randomCat = Math.random() < 0.5 ? categories[0] : categories[1];
                initialBuckets[randomCat].push(item);
            });
        } else {
            // Default behavior: all start in pool
            initialBuckets.pool = items.slice(0, 4);
        }

        return initialBuckets;
    });
    const [activeId, setActiveId] = React.useState<string | null>(null);
    const sensors = useSensors(useSensor(PointerSensor));


    function triggerShake(itemId: string) {
        setShakingIds(ids => [...ids, itemId]);
        setTimeout(() => {
            setShakingIds(ids => ids.filter(id => id !== itemId));
        }, 500);
    }
    function getIncorrectlyCategorizedIds(buckets: Record<string, Item[]>) {
        const wrongIds: string[] = [];
        Object.entries(buckets).forEach(([bucket, items]) => {
            // if (bucket === "pool") return; // skip pool
            items.forEach(item => {
                if (item.correctCategory && item.correctCategory !== bucket) {
                    wrongIds.push(item.id);
                }
            });
        });
        if (wrongIds.length === 0) {
            setSubmitted(true);
            setActivityCompleted(true);
        }

        return wrongIds;
    }

    function handleSubmit() {
        const wrongIds = getIncorrectlyCategorizedIds(buckets);
        wrongIds.forEach(triggerShake);
        // setSubmitted(true);
    }
    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over) return;

        // Find source and destination buckets
        let from: BucketId | null = null;
        let to: BucketId | null = null;

        for (const key of Object.keys(buckets) as BucketId[]) {
            if (buckets[key].find((i) => i.id === active.id)) from = key;
            if (over.id === key) to = key;
        }
        if (!from || !to || from === to) return;

        // Move item
        const movingItem = buckets[from].find((i) => i.id === active.id);
        if (!movingItem) return;
        setBuckets((prev) => ({
            ...prev,
            [from]: prev[from].filter((i) => i.id !== active.id),
            [to]: [...prev[to], movingItem],
        }));
    }

    return (
        <>
            <DndContext
                sensors={sensors}
                collisionDetection={pointerWithin}
                onDragStart={e => setActiveId(e.active.id as string)}
                onDragEnd={event => {
                    setActiveId(null);
                    handleDragEnd(event);
                }}
                onDragCancel={() => setActiveId(null)}
            >
                <div style={{
                    margin: "0 auto"
                }}>
                    <Box mb={1}>
                        {showInitialPool && (
                            <InitialBucket
                                id="pool"
                                items={buckets.pool}
                                shakingIds={shakingIds}

                            />
                        )}
                    </Box>
                    <div style={{ display: "flex", gap: isXs ? 8 : 16 }}>
                        {categories.map((cat) => (
                            <Bucket
                                key={cat}
                                id={cat}
                                title={cat}       // <--- dynamic bucket name
                                items={buckets[cat]}
                                shakingIds={shakingIds}
                                singleBucket={singleBucket}

                            />
                        ))}
                    </div>
                </div>
                <DragOverlay>
                    {activeId
                        ? (() => {
                            const allItems = Object.values(buckets).flat();
                            const item = allItems.find(i => i.id === activeId);
                            return item ? (
                                <DraggableItem
                                    id={item.id}
                                    label={item.label}
                                />
                            ) : null;
                        })()
                        : null}
                </DragOverlay>
            </DndContext>
            {submitted ? (
                <Box mt={2} textAlign="center">
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Great Job!
                    </Typography>
                </Box>
            ) : (
                <Box mt={2} textAlign="center">
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                            borderRadius: '24px',
                            border: 'none',
                            px: 3,
                            py: 1,
                            fontWeight: 600,
                            textTransform: 'none',
                            background: gradientPrimary,
                            color: 'white',
                            boxShadow: `0 4px 12px ${alpha('#667eea', 0.3)}`,
                            '&:hover': {
                                background: gradientPrimaryHover,
                                boxShadow: `0 6px 16px ${alpha('#667eea', 0.4)}`,
                            },
                        }}
                    >
                        Submit
                    </Button>
                </Box>
            )}
        </>
    );
}

import { useDroppable, useDraggable } from "@dnd-kit/core";
import { Box, Button, Typography } from "@mui/material";

function Bucket({
    id,
    title,
    items,
    shakingIds,
    singleBucket = false,

}: {
    id: BucketId;
    title: string;
    items: Item[];
    shakingIds: string[];
    singleBucket?: boolean;

}) {
    const { setNodeRef, isOver } = useDroppable({ id });
    const { muteAudio, handleSpeak } = useContext(AudioContext);
    const density = useDensity();
    return (
        <Box
            ref={setNodeRef}
            sx={{
                flex: 1,
                backgroundColor: isOver ? alpha('#667eea', 0.15) : "transparent",
                minHeight: Math.round(80 * density),
                border: `2px solid ${alpha('#667eea', 0.3)}`,
                borderRadius: 4,
                width: '40%',
                padding: 1,
                boxSizing: 'border-box',
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transition: 'all 0.2s ease',
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 1, // small space below the title row
                }}
            >
                <Typography style={{
                    fontWeight: 700,
                    textAlign: "center",
                }}>
                    {title}
                </Typography>
                {!muteAudio && (
                    <IconButton
                        onClick={() => handleSpeak(title)}
                        sx={{
                            '&:hover': {
                                backgroundColor: alpha('#667eea', 0.1),
                            },
                        }}
                    >
                        <VolumeUpIcon sx={{ color: "#667eea" }} />
                    </IconButton>
                )}
            </Box>
            {items.map((item) => (
                <DraggableItem
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    inBucket={true}
                    isShaking={shakingIds.includes(item.id)}
                    singleBucket={singleBucket}

                />
            ))}
        </Box>
    );
}

function InitialBucket({
    id,
    items,
    shakingIds,

}: {
    id: BucketId;
    items: Item[];
    shakingIds: string[];

}) {
    const { setNodeRef, isOver } = useDroppable({ id });
    const density = useDensity();
    return (
        <Box
            ref={setNodeRef}
            sx={{
                flex: 1,
                // backgroundColor: isOver ? "primary.dark" : "transparent",
                minHeight: Math.round(60 * density),
                // border: "2px solid white",
                borderRadius: 4,

            }}
        >
            {items.map((item) => (
                <DraggableItem
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    isShaking={shakingIds.includes(item.id)}

                />
            ))}
        </Box>
    );
}
interface DraggableItemProps extends Item {
    inBucket?: boolean;
    isShaking?: boolean;
    singleBucket?: boolean;

}
function DraggableItem({
    id,
    label,
    isShaking = false,
    inBucket = false,
    singleBucket = false,

}: DraggableItemProps) {
    const { setNodeRef, listeners, attributes, isDragging } = useDraggable({ id });
    const { muteAudio, handleSpeak } = useContext(AudioContext);
    return (
        <motion.div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={{
                display: "inline-block",
                width: inBucket && !singleBucket && '100%',      // <-- makes the card hug the content
                marginBottom: 8,
                margin: 4,
                padding: "4px 6px",
                background: isDragging ? "#90caf9" : "#fff",
                borderRadius: 8,
                border: "1px solid #bbb",
                boxShadow: isDragging ? "0 4px 12px rgba(0,0,0,0.10)" : undefined,
                opacity: isDragging ? 0.7 : 1,
                cursor: "grab",
                userSelect: "none",
                boxSizing: inBucket ? "border-box" : undefined,
                touchAction: "none",
                WebkitUserSelect: "none",
                WebkitTouchCallout: "none",
                WebkitTapHighlightColor: "transparent",

            }}
            animate={isShaking ? { x: [0, -6, 6, -6, 6, 0] } : { x: 0 }}
            transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
            }}

        >
            <Box sx={{ display: "flex", flexDirection: "row", flex: 1, alignItems: "center", }}>
                <Typography
                    sx={{
                        fontSize: {
                            xs: '0.6rem',   // phones
                            sm: '0.8rem',     // small tablets
                        },

                    }}
                >
                    {label}
                </Typography>
                {!muteAudio && (
                    <IconButton
                        // onClick={() => handleSpeak(label)}
                        onClick={(e) => { e.stopPropagation(); handleSpeak(label); }}
                        onMouseDown={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}   // iOS/Android
                        onPointerDown={(e) => e.stopPropagation()}
                        sx={{
                            color: "black",
                            p: 0
                        }}
                    >
                        <VolumeUpIcon sx={{ height: '20px' }} />
                    </IconButton>
                )}
            </Box>
        </motion.div>
    );
}
