"use client";
import { cn } from "@/lib/utils";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React from "react";

export const HeroHighlight = ({
    children,
    className,
    containerClassName,
}: {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
}) => {
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({
        currentTarget,
        clientX,
        clientY,
    }: React.MouseEvent<HTMLDivElement>) {
        if (!currentTarget) return;
        let { left, top } = currentTarget.getBoundingClientRect();

        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    // Changed to gold/amber tint for vintage theme
    const dotPattern = (color: string) => ({
        backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
        backgroundSize: '16px 16px',
    });

    return (
        <div
            className={cn(
                "relative h-[40rem] flex items-center bg-transparent justify-center w-full group",
                containerClassName
            )}
            onMouseMove={handleMouseMove}
        >
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={dotPattern('rgb(212 175 55)')} // Gold color
            />
            <motion.div
                className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    ...dotPattern('rgb(212 175 55)'), // Gold color bright
                    WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
                    maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
                }}
            />

            <div className={cn("relative z-20", className)}>{children}</div>
        </div>
    );
};

export const Highlight = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <motion.span
            initial={{
                backgroundSize: "0% 100%",
            }}
            animate={{
                backgroundSize: "100% 100%",
            }}
            transition={{
                duration: 2,
                ease: "linear",
                delay: 0.5,
            }}
            style={{
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left center",
                display: "inline",
            }}
            // Changed gradient to warm vintage gold/amber
            className={cn(
                `relative inline-block pb-1 px-1 rounded-lg bg-gradient-to-r from-amber-200/20 to-yellow-500/20 dark:from-amber-200/20 dark:to-yellow-500/20`,
                className
            )}
        >
            {children}
        </motion.span>
    );
};
