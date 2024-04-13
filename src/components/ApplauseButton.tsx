import React, { useEffect, useRef } from "react";
import { Bodies, Composite, Engine, Render, Runner, Body } from "matter-js";
// components
import Button from "./Button";

export default function ApplauseButton() {
  const scene = useRef(null);
  const engine = useRef(Engine.create());

  useEffect(() => {
    if (!scene.current) return;
    const cw = document.body.clientWidth;
    const ch = document.body.clientHeight;

    const render = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: "transparent",
      },
    });

    Render.run(render);

    const runner = Runner.create();

    Runner.run(runner, engine.current);

    return () => {
      // clean up to prevent memory leaks
      Runner.stop(runner);
      Engine.clear(engine.current);
      Render.stop(render);
      render.canvas.remove();
      render.textures = null;
      Composite.clear(engine.current.world, false);
      Runner.stop(runner); // again, to double-check
    };
  }, []);

  const testAdd = () => {
    const x = Math.random() * document.body.clientWidth;
    const y = 0;

    const emoji = Bodies.circle(x, y, 10, {
      render: {
        sprite: {
          texture: "/assets/clap.png",
          xScale: 0.0725,
          yScale: 0.0725,
        },
      },
    });

    // Set a random rotation for the emoji
    const randomAngle = Math.random() * 2 * Math.PI; // Generate a random angle in radians
    Body.setAngle(emoji, randomAngle); // Set the angle of the body

    Composite.add(engine.current.world, [emoji]);
  };

  return (
    <>
      <div
        className="pointer-events-none absolute h-full w-full pb-20"
        ref={scene}
      ></div>
      <Button onClick={testAdd}>applause 👏</Button>
    </>
  );
}
