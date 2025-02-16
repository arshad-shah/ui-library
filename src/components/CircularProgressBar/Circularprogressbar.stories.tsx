import type { Meta, StoryObj } from '@storybook/react';
import { CircularProgressBar } from './Circularprogressbar';

const meta: Meta<typeof CircularProgressBar> = {
  title: 'UI/CircularProgressBar',
  component: CircularProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { 
        type: 'number', 
        min: 0, 
        max: 100, 
        step: 1 
      },
      description: 'Current progress value (0-100), or null for indeterminate state',
    },
    max: {
      control: { 
        type: 'number', 
        min: 1 
      },
      description: 'Maximum value (defaults to 100)',
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger', 'info'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the progress bar',
    },
    thickness: {
      control: 'select',
      options: ['thin', 'normal', 'thick'],
      description: 'Thickness of the progress ring',
    },
    showPercentage: {
      control: 'boolean',
      description: 'Show percentage text in the center (not shown in indeterminate state)',
    },
    animated: {
      control: 'boolean',
      description: 'Enable rotation animation (for determinate state only)',
    },
  },
} satisfies Meta<typeof CircularProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with basic progress
export const Default: Story = {
  args: {
    value: 75,
    variant: 'default',
    size: 'md',
    thickness: 'normal',
    showPercentage: true,
  },
};

// Show different progress values
export const ProgressStages: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <CircularProgressBar value={25} showPercentage />
      <CircularProgressBar value={50} showPercentage />
      <CircularProgressBar value={75} showPercentage />
      <CircularProgressBar value={100} showPercentage />
    </div>
  ),
};

// Show all variants
export const Variants: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <CircularProgressBar value={75} variant="default" showPercentage />
      <CircularProgressBar value={75} variant="success" showPercentage />
      <CircularProgressBar value={75} variant="warning" showPercentage />
      <CircularProgressBar value={75} variant="danger" showPercentage />
      <CircularProgressBar value={75} variant="info" showPercentage />
    </div>
  ),
};

// Show indeterminate variants
export const IndeterminateVariants: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <CircularProgressBar value={null} variant="default" />
      <CircularProgressBar value={null} variant="success" />
      <CircularProgressBar value={null} variant="warning" />
      <CircularProgressBar value={null} variant="danger" />
      <CircularProgressBar value={null} variant="info" />
    </div>
  ),
};

// Show all sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-end">
      <CircularProgressBar value={75} size="sm" showPercentage />
      <CircularProgressBar value={75} size="md" showPercentage />
      <CircularProgressBar value={75} size="lg" showPercentage />
    </div>
  ),
};

// Show indeterminate sizes
export const IndeterminateSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-end">
      <CircularProgressBar value={null} size="sm" />
      <CircularProgressBar value={null} size="md" />
      <CircularProgressBar value={null} size="lg" />
    </div>
  ),
};

// Show all thicknesses
export const Thicknesses: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <CircularProgressBar value={75} thickness="thin" showPercentage />
      <CircularProgressBar value={75} thickness="normal" showPercentage />
      <CircularProgressBar value={75} thickness="thick" showPercentage />
    </div>
  ),
};

// Animated example
export const Animated: Story = {
  args: {
    value: 75,
    animated: true,
    showPercentage: true,
  },
};

// Example with custom max value
export const CustomMaxValue: Story = {
  args: {
    value: 125,
    max: 200,
    showPercentage: true,
  },
};

// Loading state example (indeterminate)
export const Loading: Story = {
  args: {
    value: null,
    size: 'sm',
    thickness: 'thin',
  },
};

// Full featured example
export const FullFeatured: Story = {
  args: {
    value: 85,
    variant: 'success',
    size: 'lg',
    thickness: 'thick',
    showPercentage: true,
    animated: true,
  },
};

// Error state example
export const Error: Story = {
  args: {
    value: 100,
    variant: 'danger',
    size: 'lg',
    showPercentage: true,
    thickness: 'thick',
  },
};

// Indeterminate example
export const Indeterminate: Story = {
  args: {
    value: null,
    variant: 'default',
    size: 'md',
    thickness: 'normal',
  },
};