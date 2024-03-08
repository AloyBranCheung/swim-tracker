import {describe, it, expect} from 'vitest'; 
import {render, screen} from '@testing-library/react'

describe("helloworld test", () => {
  it("should render helloworld", () => {
    render(<div>helloworld</div>);

    expect(screen.getByText("helloworld")).toBeDefined(); 
  });
});
