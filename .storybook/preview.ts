import type { Preview } from "@storybook/react";
// https://storybook.js.org/recipes/tailwindcss#2-provide-tailwind-to-stories
import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
