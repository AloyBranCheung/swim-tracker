import React, { useEffect, useRef } from "react";
import { Bodies, Composite, Engine, Render, Runner, Body } from "matter-js";
// components
import Button from "./Button";

interface ApplauseButtonProps {
  withNavbarAsBase?: boolean;
  withScreenAsBase?: boolean;
}

export default function ApplauseButton({
  withNavbarAsBase = true,
  withScreenAsBase = false,
}: ApplauseButtonProps) {
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

    if (withNavbarAsBase && !withScreenAsBase) {
      const ground = Bodies.rectangle(cw / 2, ch, cw, 64 * 2, {
        isStatic: true,
        render: {
          fillStyle: "transparent",
          strokeStyle: "transparent",
          lineWidth: 0,
        },
      });

      Composite.add(engine.current.world, [ground]);
    }

    if (!withNavbarAsBase && withScreenAsBase) {
      const ground = Bodies.rectangle(cw / 2, ch, cw, 25, {
        isStatic: true,
        render: {
          fillStyle: "transparent",
          strokeStyle: "transparent",
          lineWidth: 0,
        },
      });

      Composite.add(engine.current.world, [ground]);
    }

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
        className="pointer-events-none fixed top-0 h-full w-full pb-20"
        ref={scene}
      ></div>
      <Button onClick={testAdd}>applause 👏</Button>
    </>
  );
}
