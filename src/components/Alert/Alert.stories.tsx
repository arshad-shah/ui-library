import type { Meta, StoryObj } from '@storybook/react';

import { Alert } from './Alert';

/**
 * The Alert component is used to display important messages to users.
 * It supports multiple variants for different types of messages and can include
 * actions, links, and dismissal functionality.
 */
const meta: Meta<typeof Alert> ={
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info', 'neutral', 'promotional'],
      description: 'The visual style variant of the alert',
    },
    title: {
      control: 'text',
      description: 'The main heading text of the alert',
    },
    children: {
      control: 'text',
      description: 'The content to be displayed in the alert body',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the alert can be dismissed',
    },
    actions: {
      control: 'object',
      description: 'Array of action buttons to display',
    },
    link: {
      control: 'object',
      description: 'Optional link configuration',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Basic success alert with a title and message
 */
export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    children: 'Your changes have been saved successfully.',
  },
};

/**
 * Error alert with a dismissible button
 */
export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    children: 'There was a problem processing your request.',
    dismissible: true,
  },
};

/**
 * Warning alert with actions
 */
export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'Your subscription will expire in 3 days.',
    actions: [
      {
        label: 'Renew Now',
        onClick: () => console.log('Renew clicked'),
        variant: 'primary',
      },
      {
        label: 'Remind Later',
        onClick: () => console.log('Remind clicked'),
        variant: 'secondary',
      },
    ],
  },
};

/**
 * Info alert with a link
 */
export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    children: 'Learn more about our new features.',
    link: {
      href: 'https://example.com',
      label: 'View Documentation',
      onClick: () => console.log('Link clicked'),
    },
  },
};

/**
 * Neutral alert without a title
 */
export const Neutral: Story = {
  args: {
    variant: 'neutral',
    children: 'This is a neutral message without a title.',
  },
};

/**
 * Promotional alert with gradient background
 */
export const Promotional: Story = {
  args: {
    variant: 'promotional',
    title: 'Special Offer',
    children: 'Get 20% off on all premium features this week!',
    actions: [
      {
        label: 'Claim Offer',
        onClick: () => console.log('Claim clicked'),
        variant: 'primary',
      },
    ],
    link: {
      href: 'https://example.com/terms',
      label: 'Terms Apply',
    },
    dismissible: true,
  },
};

/**
 * Alert with custom icon
 */
export const CustomIcon: Story = {
  args: {
    variant: 'info',
    title: 'Custom Icon',
    children: 'This alert uses a custom icon.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
  },
};

/**
 * Alert with long content
 */
export const LongContent: Story = {
  args: {
    variant: 'info',
    title: 'Long Content Example',
    children: `This is an example of an alert with longer content. It demonstrates how the alert component handles multiple lines of text and maintains proper spacing and alignment. The content can include detailed information while maintaining readability.`,
    dismissible: true,
  },
};

/**
 * Alert with multiple actions and a link
 */
export const ComplexActions: Story = {
  args: {
    variant: 'success',
    title: 'Complex Actions',
    children: 'This alert demonstrates multiple interactive elements.',
    actions: [
      {
        label: 'Primary Action',
        onClick: () => console.log('Primary clicked'),
        variant: 'primary',
      },
      {
        label: 'Secondary',
        onClick: () => console.log('Secondary clicked'),
        variant: 'secondary',
      },
      {
        label: 'Tertiary',
        onClick: () => console.log('Tertiary clicked'),
        variant: 'secondary',
      },
    ],
    link: {
      href: 'https://example.com',
      label: 'Learn More',
    },
    dismissible: true,
  },
};