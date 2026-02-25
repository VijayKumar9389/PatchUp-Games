import React from "react";
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Button, alpha } from "@mui/material";
import { motion } from "framer-motion";
import {
    restrictToVerticalAxis,
    restrictToWindowEdges,
} from '@dnd-kit/modifiers';

const gradientPrimary = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
const gradientPrimaryHover = 'linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%)';
// Types
interface MatchItem {
    id: string;
    label: string;
    correctMatch: string; // must be in labels array
}

interface MatchingGameProps {
    labels: string[];         // the left-side labels (in order)
    items: MatchItem[];       // items to drag into order (order not guaranteed)
    setActivityCompleted?: (completed: boolean) => void;
}

// Draggable item
function SortableMatchItem({ item, isShaking }: { item: MatchItem, isShaking: boolean }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
    return (
        <motion.div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={{
                display: "inline-block",
                width: '100%',
                whiteSpace: "no-wrap",
                userSelect: "none",
            }}
            animate={isShaking ? { x: [0, -6, 6, -6, 6, 0] } : { x: 0 }}
            transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
            }}
        ><Paper
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            elevation={isDragging ? 6 : 2}
            sx={{
                p: 1.2,
                mb: 1.2,
                bgcolor: isDragging ? "#e3f2fd" : "#fafafa",
                border: "1px solid #ddd",
                fontWeight: 500,
                cursor: "grab",
                opacity: isDragging ? 0.8 : 1,
                transform: CSS.Transform.toString(transform),
                transition,
                borderRadius: 2,
                touchAction: "none",
                WebkitUserSelect: "none",
                WebkitTouchCallout: "none",
                WebkitTapHighlightColor: "transparent",
            }}
        >
                <Typography
                    sx={{
                        textAlign: 'center',
                        fontSize: {
                            xs: "0.8rem",
                            sm: "1rem",
                            md: "1.1rem",
                            lg: "1.25rem",
                        },
                    }}
                >{item.label}</Typography>
            </Paper>
        </motion.div>


    );
}

// Main component
export default function DnDMatch({ labels, items, setActivityCompleted }: MatchingGameProps) {
    // Sortable order: just store array of ids
    const [itemOrder, setItemOrder] = React.useState(() => items.map(i => i.id));
    const [submitted, setSubmitted] = React.useState(false);
    const [shakingIds, setShakingIds] = React.useState<string[]>([]);

    function handleSubmit() {
        const wrongIds = getIncorrectlyMatchedIds();
        wrongIds.forEach(triggerShake);
    }
    const sensors = useSensors(useSensor(PointerSensor));


    const itemMap = React.useMemo(() => {
        const map: Record<string, MatchItem> = {};
        items.forEach(i => { map[i.id] = i; });
        return map;
    }, [items]);

    function triggerShake(itemId: string) {
        setShakingIds(ids => [...ids, itemId]);
        setTimeout(() => {
            setShakingIds(ids => ids.filter(id => id !== itemId));
        }, 500);
    }

    function getIncorrectlyMatchedIds() {
        const wrongIds: string[] = [];
        itemOrder.forEach((itemId, index) => {
            const item = itemMap[itemId];
            const correctLabel = item.correctMatch;
            const currentLabel = labels[index];
            if (correctLabel !== currentLabel) {
                wrongIds.push(itemId);
            }
        });
        if (wrongIds.length === 0) {
            setSubmitted(true);
            setActivityCompleted(true);
        }
        return wrongIds;
    }
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIdx = itemOrder.indexOf(active.id as string);
            const newIdx = itemOrder.indexOf(over.id as string);
            const newOrder = arrayMove(itemOrder, oldIdx, newIdx);
            setItemOrder(newOrder);
        }
    };

    return (
        <Box sx={{ width: "100%", mx: "auto", mt: 2 }}>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[
                    restrictToVerticalAxis,
                    restrictToWindowEdges, // keeps it inside the viewport
                    // If you prefer to keep it inside a scroller instead:
                    // restrictToFirstScrollableAncestor,
                    // ...and make sure the ancestor has `position: relative`
                ]}
            >
                <SortableContext items={itemOrder} strategy={verticalListSortingStrategy}>
                    {itemOrder.map((itemId, idx) => {
                        const item = itemMap[itemId];
                        const label = labels[idx];
                        return (
                            <Box key={itemId} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                <Typography sx={{
                                    flex: 2, fontWeight: 600, mr: 1, fontSize: {
                                        xs: "0.8rem",
                                        sm: "1rem",
                                        md: "1.1rem",
                                        lg: "1.25rem",
                                    }
                                }}>{label}</Typography>
                                <Box sx={{ flex: 1 }}>
                                    <SortableMatchItem
                                        item={item}
                                        isShaking={shakingIds.includes(item.id)} />
                                </Box>
                            </Box>
                        );
                    })}
                </SortableContext>
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
        </Box>
    );
}
