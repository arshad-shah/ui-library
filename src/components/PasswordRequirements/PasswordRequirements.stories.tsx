// src/components/PasswordRequirements/PasswordRequirements.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import {PasswordRequirements} from './PasswordRequirements';
import React from 'react';

/**
 * The PasswordRequirements component provides real-time feedback on password strength
 * and validity based on customizable requirements. It features smooth animations and
 * visual feedback for each requirement.
 */
const meta: Meta<typeof PasswordRequirements> = {
  title: 'Components/PasswordRequirements',
  component: PasswordRequirements,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A dynamic password requirements checker with animated feedback.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    password: {
      control: 'text',
      description: 'The current password string to validate',
    },
    isVisible: {
      control: 'boolean',
      description: 'Controls the visibility of the requirements panel',
    },
    requirements: {
      control: 'object',
      description: 'Array of password requirements with labels and validator functions',
    },
  },
} satisfies Meta<typeof PasswordRequirements>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default requirements for stories
const DEFAULT_REQUIREMENTS = [
  {
    label: 'At least 8 characters long',
    validator: (password: string) => password.length >= 8,
  },
  {
    label: 'Contains at least one uppercase letter',
    validator: (password: string) => /[A-Z]/.test(password),
  },
  {
    label: 'Contains at least one lowercase letter',
    validator: (password: string) => /[a-z]/.test(password),
  },
  {
    label: 'Contains at least one number',
    validator: (password: string) => /\d/.test(password),
  },
  {
    label: 'Contains at least one special character',
    validator: (password: string) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
];

/**
 * Default state with no requirements met
 */
export const Empty: Story = {
  args: {
    password: '',
    requirements: DEFAULT_REQUIREMENTS,
    isVisible: true,
  },
};

/**
 * Shows the component with some requirements met
 */
export const PartiallyValid: Story = {
  args: {
    password: 'Password123',
    requirements: DEFAULT_REQUIREMENTS,
    isVisible: true,
  },
};

/**
 * Shows the component with all requirements met
 */
export const AllValid: Story = {
  args: {
    password: 'Password123!',
    requirements: DEFAULT_REQUIREMENTS,
    isVisible: true,
  },
};
/**
 * Example with custom requirements
 */
export const CustomRequirements: Story = {
  args: {
    password: 'mypassword',
    requirements: [
      {
        label: 'Must be at least 10 characters',
        validator: (password: string) => password.length >= 10,
      },
      {
        label: 'No consecutive repeated characters',
        validator: (password: string) => !/(.)\1/.test(password),
      },
      {
        label: 'Cannot contain the word "password"',
        validator: (password: string) => !password.toLowerCase().includes('password'),
      },
    ],
    isVisible: true,
  },
};

/**
 * Example with complex password patterns
 */
export const ComplexPatterns: Story = {
  args: {
    password: 'Test123!@#',
    requirements: [
      {
        label: 'Must contain at least 3 numbers',
        validator: (password: string) => (password.match(/\d/g) || []).length >= 3,
      },
      {
        label: 'Must contain at least 2 special characters',
        validator: (password: string) => 
          (password.match(/[!@#$%^&*(),.?":{}|<>]/g) || []).length >= 2,
      },
      {
        label: 'Must start with a capital letter',
        validator: (password: string) => /^[A-Z]/.test(password),
      },
      {
        label: 'Must be between 8 and 20 characters',
        validator: (password: string) => 
          password.length >= 8 && password.length <= 20,
      },
    ],
    isVisible: true,
  },
};

/**
 * Interactive demo that changes as you type
 */
export const Interactive: Story = {
  render: function Render() {
    const [password, setPassword] = React.useState('');
    
    return (
      <div className="w-80">
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type password..."
          className="w-full px-4 py-2 border rounded-lg mb-2"
        />
        <PasswordRequirements
          password={password}
          requirements={DEFAULT_REQUIREMENTS}
          isVisible={true}
        />
      </div>
    );
  }
};

/**
 * Shows how the component handles extremely long passwords
 */
export const LongPassword: Story = {
  args: {
    password: 'ThisIsAnExtremelyLongPasswordThatMightCauseWrappingIssues123!@#',
    requirements: DEFAULT_REQUIREMENTS,
    isVisible: true,
  },
};