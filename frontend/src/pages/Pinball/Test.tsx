import React, { useEffect } from 'react';
import Matter from 'matter-js';
// import mysvg from "../../assets/terrain.svg";
import mysvg from "../../assets/Group.svg";
import { svgPathProperties } from 'svg-path-properties';
import decomp from 'poly-decomp';

const MyComponent: React.FC = () => {
  useEffect(() => {
    const { Engine, Render, Runner, Bodies, Svg, World, Mouse, MouseConstraint, Common } = Matter;

    // Create an engine
    const engine = Engine.create();
    Common.setDecomp(decomp)
    // Create a renderer
    const render = Render.create({
      element: document.getElementById('my-canvas')!, // Replace 'my-canvas' with your container's ID
      engine: engine,
      options: {
        width: 800,
        height: 600,
      },
    });

    Render.run(render);

    // Create a runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Load your SVG file
const loadSvg = async () => {
  const response = await fetch(mysvg);
  if (!response.ok) {
    console.error('Failed to load SVG file');
    return;
  }

  const svgData = await response.text();
  const parser = new DOMParser();
  const svg = parser.parseFromString(svgData, 'image/svg+xml');
  const paths = Array.from(svg.querySelectorAll('path'));
  const bodies = [];

  paths.forEach((path, index) => {
    const pathData = path.getAttribute('d');
    const pathProperties = new svgPathProperties(pathData);
    const pathLength = pathProperties.getTotalLength();
    const pathVertices = [];

    for (let i = 0; i < pathLength; i += 1) {
      const point = pathProperties.getPointAtLength(i);
      pathVertices.push({'x':Math.round(point.x), 'y':Math.round(point.y)});
      console.log(point)
      console.log(pathVertices)
    }

    // Convert the pathVertices to a convex polygon (simplified shape)

    const x = 0;
    const y = 0;

    const body = Bodies.fromVertices(x, y, [pathVertices], {
      isStatic: true,
      render: {
        fillStyle: '#060a19',
        strokeStyle: '#060a19',
        lineWidth: 1,
      },
    }, true);

    if (body !== undefined) {
      bodies.push(body);
    }
  });

  World.add(engine.world, bodies);
  Engine.run(engine)
  

};

loadSvg();

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: true,
        },
      },
    });

    World.add(engine.world, mouseConstraint);

    // Keep the mouse in sync with rendering
    render.mouse = mouse;

    // Fit the render viewport to the scene
    Render.lookAt(render, {
      min: { x: -120, y: -100 },
      max: { x: 1000, y: 700 },
    });

    // Cleanup when the component unmounts
    return () => {
      Render.stop(render);
      Runner.stop(runner);
    };
  }, []);

  return <div id="my-canvas" style={{ width: "100%", height: "100%" }}></div>; // Replace 'my-canvas' with your container's ID
};

export default MyComponent;