import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  component: Slider,
  title: 'UI/Slider',
  argTypes: {
    value: { 
      control: { type: 'object' },
      description: 'Current value(s) of the slider'
    },
    min: { 
      control: 'number',
      defaultValue: 0,
      description: 'Minimum value'
    },
    max: { 
      control: 'number',
      defaultValue: 100,
      description: 'Maximum value'
    },
    step: { 
      control: 'number',
      defaultValue: 1,
      description: 'Step increment'
    },
    variant: {
      control: 'select',
      options: ['default', 'violet', 'blue', 'green'],
      defaultValue: 'default',
      description: 'Visual style variant'
    },
    disabled: { 
      control: 'boolean',
      defaultValue: false,
      description: 'Disable the slider'
    },
    showLabels: { 
      control: 'boolean',
      defaultValue: false,
      description: 'Show value labels'
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'your-figma-url-here',
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8 max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component for controlled state
const ControlledSlider = (props: React.ComponentProps<typeof Slider>) => {
  const [value, setValue] = useState(props.value || [50]);
  return <Slider {...props} value={value} onValueChange={setValue} />;
};

// Basic usage
export const Default: Story = {
  render: (args) => <ControlledSlider {...args} />,
  args: {
    value: [50],
  },
};

// Color variants
export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      <Slider value={[25]} variant="default" />
      <Slider value={[50]} variant="violet" />
      <Slider value={[75]} variant="blue" />
      <Slider value={[90]} variant="green" />
    </div>
  ),
};

// Interactive states
export const States: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-gray-500 mb-2">Default</p>
        <Slider value={[50]} />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Disabled</p>
        <Slider value={[30]} disabled />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">With Labels</p>
        <Slider value={[70]} showLabels />
      </div>
    </div>
  ),
};

// Range slider
const RangeSliderDemo = (args: React.ComponentProps<typeof Slider>) => {
  const [values, setValues] = useState([25, 75]);
  return (
    <div className="space-y-8">
      <Slider 
        {...args} 
        value={values} 
        onValueChange={setValues}
        variant="violet"
        showLabels 
      />
    </div>
  );
};

export const RangeSlider: Story = {
  render: (args) => <RangeSliderDemo {...args} />,
};

// Custom range and step
export const CustomConfiguration: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-gray-500 mb-2">Custom Range (-50 to 50)</p>
        <Slider value={[0]} min={-50} max={50} />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Custom Step (10)</p>
        <Slider value={[20]} step={10} showLabels />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Percentage (0-100)</p>
        <Slider value={[75]} step={1} showLabels />
      </div>
    </div>
  ),
};

// Animated example
const AnimatedSlider = () => {
  const [value, setValue] = useState([0]);
    
  useEffect(() => {
    const interval = setInterval(() => {
      setValue(prev => {
        const newValue = prev[0] + 1;
        return newValue > 100 ? [0] : [newValue];
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">Animated Progress</p>
      <Slider 
        value={value} 
        onValueChange={setValue}
        variant="blue"
        showLabels
      />
    </div>
  );
};

export const Animated: Story = {
  render: () => <AnimatedSlider />
};

// Responsive sizes
export const ResponsiveSizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="w-full sm:w-1/2 md:w-1/3">
        <p className="text-sm text-gray-500 mb-2">Small</p>
        <Slider value={[60]} />
      </div>
      <div className="w-full sm:w-2/3 md:w-1/2">
        <p className="text-sm text-gray-500 mb-2">Medium</p>
        <Slider value={[75]} variant="violet" />
      </div>
      <div className="w-full">
        <p className="text-sm text-gray-500 mb-2">Large</p>
        <Slider value={[90]} variant="blue" />
      </div>
    </div>
  ),
};