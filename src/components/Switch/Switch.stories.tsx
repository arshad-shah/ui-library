import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  component: Switch,
  title: 'UI/Switch',
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'The controlled checked state of the switch',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled',
      defaultValue: false,
    },
    variant: {
      control: 'select',
      options: ['default', 'violet', 'blue', 'green'],
      description: 'The visual style variant of the switch',
      defaultValue: 'default',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the switch',
      defaultValue: 'md',
    },
    onCheckedChange: {
      action: 'checked changed',
      description: 'Event handler for when the checked state changes',
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
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Controlled switch helper component
const ControlledSwitch = (props: React.ComponentProps<typeof Switch>) => {
  const [checked, setChecked] = useState(props.checked || false);
  return (
    <Switch {...props} checked={checked} onCheckedChange={setChecked} />
  );
};

// Default story
export const Default: Story = {
  render: (args) => <ControlledSwitch {...args} />,
};

// Variants showcase
export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <ControlledSwitch variant="default" />
        <span className="text-sm text-gray-500">Default</span>
      </div>
      <div className="flex items-center gap-4">
        <ControlledSwitch variant="violet" />
        <span className="text-sm text-gray-500">Violet</span>
      </div>
      <div className="flex items-center gap-4">
        <ControlledSwitch variant="blue" />
        <span className="text-sm text-gray-500">Blue</span>
      </div>
      <div className="flex items-center gap-4">
        <ControlledSwitch variant="green" />
        <span className="text-sm text-gray-500">Green</span>
      </div>
    </div>
  ),
};

// Sizes showcase
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <ControlledSwitch size="sm" />
        <span className="text-sm text-gray-500">Small</span>
      </div>
      <div className="flex items-center gap-4">
        <ControlledSwitch size="md" />
        <span className="text-sm text-gray-500">Medium</span>
      </div>
      <div className="flex items-center gap-4">
        <ControlledSwitch size="lg" />
        <span className="text-sm text-gray-500">Large</span>
      </div>
    </div>
  ),
};

// States showcase
export const States: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Switch checked={false} />
        <span className="text-sm text-gray-500">Unchecked</span>
      </div>
      <div className="flex items-center gap-4">
        <Switch checked={true} />
        <span className="text-sm text-gray-500">Checked</span>
      </div>
      <div className="flex items-center gap-4">
        <Switch disabled checked={false} />
        <span className="text-sm text-gray-500">Disabled Unchecked</span>
      </div>
      <div className="flex items-center gap-4">
        <Switch disabled checked={true} />
        <span className="text-sm text-gray-500">Disabled Checked</span>
      </div>
    </div>
  ),
};

// Variant and Size combinations
export const Combinations: Story = {
  render: () => {
    const variants = ['default', 'violet', 'blue', 'green'] as const;
    const sizes = ['sm', 'md', 'lg'] as const;
    
    return (
      <div className="space-y-8">
        {variants.map((variant) => (
          <div key={variant} className="space-y-4">
            <h3 className="text-lg font-semibold capitalize">{variant}</h3>
            <div className="flex gap-8 items-center">
              {sizes.map((size) => (
                <div key={size} className="text-center">
                  <ControlledSwitch
                    variant={variant}
                    size={size}
                  />
                  <p className="mt-2 text-sm text-gray-500 capitalize">{size}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

// Example with label
const WithLabelComponent = () => {
  const [checked, setChecked] = useState(false);
  
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="airplane-mode"
        checked={checked}
        onCheckedChange={setChecked}
        variant="blue"
      />
      <label
        htmlFor="airplane-mode"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Airplane Mode {checked ? 'On' : 'Off'}
      </label>
    </div>
  );
};

export const WithLabel: Story = {
  render: () => <WithLabelComponent />,
};

// Interactive example
const InteractiveComponent = () => {
  const [enabled, setEnabled] = useState({
    wifi: true,
    bluetooth: false,
    airplane: false,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between py-2">
        <label className="text-sm font-medium">Wi-Fi</label>
        <Switch
          checked={enabled.wifi}
          onCheckedChange={(checked) => setEnabled(prev => ({ ...prev, wifi: checked }))}
          variant="blue"
        />
      </div>
      <div className="flex items-center justify-between py-2">
        <label className="text-sm font-medium">Bluetooth</label>
        <Switch
          checked={enabled.bluetooth}
          onCheckedChange={(checked) => setEnabled(prev => ({ ...prev, bluetooth: checked }))}
          variant="violet"
        />
      </div>
      <div className="flex items-center justify-between py-2">
        <label className="text-sm font-medium">Airplane Mode</label>
        <Switch
          checked={enabled.airplane}
          onCheckedChange={(checked) => setEnabled(prev => ({ ...prev, airplane: checked }))}
          variant="green"
        />
      </div>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveComponent />,
};