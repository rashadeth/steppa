"use client";

import { createContext } from "react";

/** Bumps when the user starts “Set goals” again so the goal progress bar can restart from empty. */
export const GoalProgressRunContext = createContext<number>(0);
