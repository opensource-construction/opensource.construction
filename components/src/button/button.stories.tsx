import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta = {
  title: "Components/Atoms/Button",
  component: Button,
  args: {
    children: "Button",
    type: "secondary",
  },
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof Button>;

export const Secondary: Story = {};

export const Small: Story = {
  args: {
    size: "small",
  },
};

export const Card: Story = {
  args: {
    type: "card",
  },
};

export const Primary: Story = {
  args: {
    type: "primary",
  },
};

export const Submit: Story = {
  args: {
    type: "submit",
    label: "Register now",
  },
};

export const SubmitDisabled: Story = {
  args: {
    type: "submit",
    disabled: true,
    label: "Register now",
  },
};

export const External: Story = {
  args: {
    target: "https://example.com",
    type: "primary",
  },
};

export const Back: Story = {
  args: {
    target: "/",
    label: "Go back",
    icon: "left",
  },
};

export const SidebarOverlay: Story = {
  args: {
    type: "sidebar",
    target: () => {
      console.log("button fired");
    },
  },
};
