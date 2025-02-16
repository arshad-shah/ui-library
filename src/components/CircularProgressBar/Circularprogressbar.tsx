import React from 'react';
import { motion } from 'framer-motion';

interface CircularProgressBarProps {
  /** Value between 0 and 100, or null for indeterminate state */
  value: number | null;
  /** Optional maximum value (defaults to 100) */
  max?: number;
  /** Visual variant of the progress bar */
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  /** Show percentage text */
  showPercentage?: boolean;
  /** Show animated stripes */
  animated?: boolean;
  /** Size of the progress bar */
  size?: 'sm' | 'md' | 'lg';
  /** Thickness of the progress bar */
  thickness?: 'thin' | 'normal' | 'thick';
  /** Additional classes */
  className?: string;
}

export function CircularProgressBar({
  value,
  max = 100,
  variant = 'default',
  showPercentage = false,
  animated = false,
  size = 'md',
  thickness = 'normal',
  className = '',
}: CircularProgressBarProps) {
  // Calculate percentage if value is not null
  const percentage = value !== null 
    ? Math.min(100, Math.max(0, (value / max) * 100))
    : null;

  // Define color schemes
  const colorSchemes = {
    default: {
      bar: 'stroke-blue-500',
      background: 'stroke-blue-100',
      text: 'text-blue-700',
      fill: '#3B82F6', // blue-500
      bgFill: '#EFF6FF', // blue-50
    },
    success: {
      bar: 'stroke-emerald-500',
      background: 'stroke-emerald-100',
      text: 'text-emerald-700',
      fill: '#10B981', // emerald-500
      bgFill: '#ECFDF5', // emerald-50
    },
    warning: {
      bar: 'stroke-amber-500',
      background: 'stroke-amber-100',
      text: 'text-amber-700',
      fill: '#F59E0B', // amber-500
      bgFill: '#FFFBEB', // amber-50
    },
    danger: {
      bar: 'stroke-red-500',
      background: 'stroke-red-100',
      text: 'text-red-700',
      fill: '#EF4444', // red-500
      bgFill: '#FEF2F2', // red-50
    },
    info: {
      bar: 'stroke-cyan-500',
      background: 'stroke-cyan-100',
      text: 'text-cyan-700',
      fill: '#06B6D4', // cyan-500
      bgFill: '#ECFEFF', // cyan-50
    }
  };

  // Define size variations
  const sizes = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  // Define stroke width based on thickness
  const strokeWidths = {
    thin: 4,
    normal: 6,
    thick: 8
  };

  // SVG parameters
  const size_px = size === 'sm' ? 64 : size === 'md' ? 96 : 128;
  const strokeWidth = strokeWidths[thickness];
  const radius = (size_px - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const indeterminateVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const progressVariants = {
    initial: {
      strokeDashoffset: circumference
    },
    animate: {
      strokeDashoffset: value !== null 
        ? circumference - (percentage! / 100) * circumference
        : 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className={`relative inline-flex ${sizes[size]} ${className}`}>
      {value !== null ? (
        // Determinate state
        <motion.svg
          className="w-full h-full transform -rotate-90"
          animate={animated ? { rotate: 360 } : undefined}
          transition={animated ? { duration: 2, repeat: Infinity, ease: "linear" } : undefined}
        >
          {/* Background circle */}
          <circle
            className={colorSchemes[variant].background}
            cx={size_px / 2}
            cy={size_px / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
          />
          
          {/* Progress circle */}
        <motion.circle
        className={colorSchemes[variant].bar}
        cx={size_px / 2}
        cy={size_px / 2}
        r={radius}
        fill="none"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        variants={progressVariants}
        initial="initial"
        animate="animate"
        />
        </motion.svg>
      ) : (
        // Indeterminate state
        <div className="relative w-full h-full">
          {/* Background circle */}
          <svg className="absolute inset-0 w-full h-full">
            <circle
              className={colorSchemes[variant].background}
              cx={size_px / 2}
              cy={size_px / 2}
              r={radius}
              fill="none"
              strokeWidth={strokeWidth}
            />
          </svg>

          {/* Spinning gradient circle */}
          <motion.div
            className="w-full h-full"
            variants={indeterminateVariants}
            animate="animate"
          >
            <svg className="w-full h-full">
              <defs>
                <linearGradient 
                  id={`spinner-gradient-${variant}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor={colorSchemes[variant].fill} stopOpacity="1" />
                  <stop offset="50%" stopColor={colorSchemes[variant].fill} stopOpacity="0.1" />
                  <stop offset="100%" stopColor={colorSchemes[variant].fill} stopOpacity="1" />
                </linearGradient>
              </defs>
              <circle
                cx={size_px / 2}
                cy={size_px / 2}
                r={radius}
                fill="none"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                stroke={`url(#spinner-gradient-${variant})`}
                strokeDasharray={`${circumference * 0.4} ${circumference * 0.6}`}
              />
            </svg>
          </motion.div>
        </div>
      )}
      
      {showPercentage && value !== null && (
        <motion.div 
          className={`
            absolute inset-0 flex items-center justify-center
            text-sm font-medium
            ${colorSchemes[variant].text}
          `}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {percentage!.toFixed(0)}%
        </motion.div>
      )}
    </div>
  );
}