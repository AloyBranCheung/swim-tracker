import type { Meta, StoryObj } from "@storybook/react";

import ProgramMenu from "@/containers/plans-page/ProgramMenu";

const meta: Meta<typeof ProgramMenu> = {
  component: ProgramMenu,
};

export default meta;
type Story = StoryObj<typeof ProgramMenu>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => <ProgramMenu />,
};
