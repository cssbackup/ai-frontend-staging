// @ts-nocheck
"use client";

import React from "react";
import { motion, HTMLMotionProps, Variants } from "framer-motion";

const customEasing = [0.25, 0.1, 0.25, 1] as const;

export interface FadeInProps extends HTMLMotionProps<"div"> {
    direction?: "up" | "down" | "left" | "right" | "none";
    delay?: number;
    duration?: number;
    distance?: number;
    viewportOnce?: boolean;
    className?: string;
    children: React.ReactNode;
}

export function FadeIn({
    direction = "up",
    delay = 0,
    duration = 0.5,
    distance = 20,
    viewportOnce = true,
    className = "",
    children,
    ...props
}: FadeInProps) {
    const x =
        direction === "left"
            ? distance
            : direction === "right"
                ? -distance
                : 0;
    const y =
        direction === "up"
            ? distance
            : direction === "down"
                ? -distance
                : 0;

    return (
        <motion.div
            initial={{ opacity: 0, x, y }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: viewportOnce, margin: "-50px" }}
            transition={{
                duration,
                delay,
                ease: customEasing,
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

export interface StaggerContainerProps extends HTMLMotionProps<"div"> {
    staggerChildren?: number;
    delayChildren?: number;
    className?: string;
    children: React.ReactNode;
}

export function StaggerContainer({
    staggerChildren = 0.12,
    delayChildren = 0.1,
    className = "",
    children,
    ...props
}: StaggerContainerProps) {
    const containerVariants: Variants = {
        hidden: { opacity: 1 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren,
                delayChildren,
            },
        },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

export interface StaggerItemProps extends HTMLMotionProps<"div"> {
    direction?: "up" | "down" | "left" | "right" | "none";
    distance?: number;
    className?: string;
    children: React.ReactNode;
}

export function StaggerItem({
    direction = "up",
    distance = 25,
    className = "",
    children,
    ...props
}: StaggerItemProps) {
    const x =
        direction === "left"
            ? distance
            : direction === "right"
                ? -distance
                : 0;
    const y =
        direction === "up"
            ? distance
            : direction === "down"
                ? -distance
                : 0;

    const itemVariants: Variants = {
        hidden: { opacity: 0, x, y },
        show: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: 0.5,
                ease: customEasing,
            },
        },
    };

    return (
        <motion.div variants={itemVariants} className={className} {...props}>
            {children}
        </motion.div>
    );
}

export interface ScaleInProps extends HTMLMotionProps<"div"> {
    delay?: number;
    duration?: number;
    initialScale?: number;
    className?: string;
    children: React.ReactNode;
}

export function ScaleIn({
    delay = 0,
    duration = 0.5,
    initialScale = 0.9,
    className = "",
    children,
    ...props
}: ScaleInProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: initialScale }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
                duration,
                delay,
                ease: customEasing,
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

export interface MotionCardProps extends HTMLMotionProps<"div"> {
    hoverY?: number;
    hoverScale?: number;
    className?: string;
    children: React.ReactNode;
}

export function MotionCard({
    hoverY = -6,
    hoverScale = 1.01,
    className = "",
    children,
    ...props
}: MotionCardProps) {
    return (
        <motion.div
            whileHover={{
                y: hoverY,
                scale: hoverScale,
                transition: { duration: 0.25, ease: "easeOut" },
            }}
            whileTap={{ scale: 0.98 }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}
