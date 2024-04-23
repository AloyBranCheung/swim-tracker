"use client";
import React, { useEffect, useRef } from "react";
import {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  MouseConstraint,
  Mouse,
} from "matter-js";
import { twMerge } from "tailwind-merge";

const NUMBER_OF_404 = 60;

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef(Engine.create({ gravity: { y: 0.6 } }));
  const mouseRef = useRef<MouseConstraint>();

  useEffect(() => {
    if (!containerRef?.current) return;
    const cw = document.body.clientWidth;
    const ch = document.body.clientHeight;

    // create mouse constraint
    const mConstraint = MouseConstraint.create(engineRef.current, {
      mouse: Mouse.create(containerRef.current),
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });
    mouseRef.current = mConstraint;

    Composite.add(engineRef.current.world, mConstraint);

    // create renderer
    const render = Render.create({
      element: containerRef.current,
      engine: engineRef.current,
      options: {
        wireframes: false,
        background: "transparent",
        width: cw,
        height: ch,
      },
    });

    // create assets

    const ground = Bodies.rectangle(cw / 2, ch, cw, 1, {
      isStatic: true,
      render: {
        fillStyle: "transparent",
      },
    });

    // Create container walls
    const walls = {
      left: Bodies.rectangle(0, ch, 1, ch * 2, {
        isStatic: true,
        render: {
          fillStyle: "transparent",
        },
      }),
      right: Bodies.rectangle(cw, ch, 1, ch * 2, {
        isStatic: true,
        render: {
          fillStyle: "transparent",
        },
      }),
    };

    // add bodies to the world
    Composite.add(engineRef.current.world, [ground, walls.left, walls.right]);

    // run the renderer
    Render.run(render);

    // create runner
    const runner = Runner.create();

    // run the engine
    Runner.run(runner, engineRef.current);

    return () => {
      // clean up to prevent memory leaks
      Runner.stop(runner);
      Engine.clear(engineRef.current);
      Render.stop(render);
      render.canvas.remove();
      render.textures = null;
      Composite.clear(engineRef.current.world, false);
      Runner.stop(runner); // again, to double-check
    };
  }, []);

  useEffect(() => {
    const STAGGER_DELAY = 250; // milliseconds
    for (let i = 0; i < NUMBER_OF_404; i++) {
      setTimeout(() => {
        const x = Math.random() * window.innerWidth;
        const y = (Math.random() * -window.innerHeight) / 2;

        const rect404 = Bodies.rectangle(x, y, 100, 50, {
          render: {
            sprite: {
              texture: "/assets/404.png",
              xScale: 0.25,
              yScale: 0.25,
            },
          },
        });
        Composite.add(engineRef.current.world, [rect404]);
      }, i * STAGGER_DELAY);
    }
  }, []);

  const documentBodyheight = document.body.clientHeight;

  return (
    <div className="bg-bluescreen flex h-screen justify-center">
      <div
        ref={containerRef}
        className={twMerge(
          "absolute top-0 w-full",
          `h-[${documentBodyheight}px]`,
        )}
      ></div>
      <div className="flex flex-col gap-8 p-20">
        <div className="text-9xl text-header-font">:&#40;</div>
        <div className="text-2xl text-header-font">
          No worries, your device is okay but page not found.
        </div>
      </div>
    </div>
  );
}
