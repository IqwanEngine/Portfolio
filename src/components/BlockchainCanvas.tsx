import React, { useEffect, useRef } from "react";

interface Node {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulse: number;
  pulseDirection: number;
  connections: number[];
}

interface Pulse {
  fromId: number;
  toId: number;
  progress: number;
  speed: number;
}

export default function BlockchainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight || window.innerHeight);

    // Generate Nodes (blockchain blocks)
    const nodeCount = Math.min(45, Math.floor((width * height) / 18000));
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1.5,
        pulse: Math.random(),
        pulseDirection: Math.random() > 0.5 ? 1 : -1,
        connections: [],
      });
    }

    // Connect nodes based on proximity (form the blockchain network)
    const maxDistance = 140;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDistance) {
          nodes[i].connections.push(nodes[j].id);
          nodes[j].connections.push(nodes[i].id);
        }
      }
    }

    // Active transmission pulses (light moving in the blockchain lines)
    const pulses: Pulse[] = [];
    const maxPulses = Math.min(25, Math.floor(nodeCount * 0.6));

    const spawnPulse = () => {
      if (pulses.length >= maxPulses) return;
      
      // Select a random node that has connections
      const availableNodes = nodes.filter((n) => n.connections.length > 0);
      if (availableNodes.length === 0) return;

      const fromNode = availableNodes[Math.floor(Math.random() * availableNodes.length)];
      const toId = fromNode.connections[Math.floor(Math.random() * fromNode.connections.length)];

      pulses.push({
        fromId: fromNode.id,
        toId,
        progress: 0,
        speed: 0.005 + Math.random() * 0.01,
      });
    };

    // Pre-populate some pulses
    for (let i = 0; i < maxPulses / 2; i++) {
      spawnPulse();
      if (pulses[i]) {
        pulses[i].progress = Math.random();
      }
    }

    // HandleResize to make sure it covers the whole screen dynamically
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.offsetHeight || window.innerHeight;
    };

    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 150);
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Main render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Space Black overlay and grid lines coordinates
      ctx.fillStyle = "rgba(3, 3, 5, 0.95)";
      ctx.fillRect(0, 0, width, height);

      // 1. Draw Blockchain network lines (faint connections)
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        
        // Update positions (bounce on edges)
        n1.x += n1.vx;
        n1.y += n1.vy;
        
        if (n1.x < 0 || n1.x > width) n1.vx *= -1;
        if (n1.y < 0 || n1.y > height) n1.vy *= -1;

        // Pulse effect for node halos
        n1.pulse += 0.01 * n1.pulseDirection;
        if (n1.pulse > 1 || n1.pulse < 0) {
          n1.pulseDirection *= -1;
        }

        // Draw node lines
        n1.connections.forEach((targetId) => {
          // Avoid duplicate drawing of lines by checking IDs
          if (n1.id < targetId) {
            const n2 = nodes[targetId];
            const dx = n1.x - n2.x;
            const dy = n1.y - n2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < maxDistance) {
              const alpha = (1 - dist / maxDistance) * 0.12;
              ctx.strokeStyle = `rgba(239, 68, 68, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.stroke();
            }
          }
        });
      }

      // 2. Draw moving light pulses on the blockchain lines (the dynamic signals)
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        const nFrom = nodes[p.fromId];
        const nTo = nodes[p.toId];

        if (!nFrom || !nTo) {
          pulses.splice(i, 1);
          continue;
        }

        // Interpolate position along the line
        p.progress += p.speed;
        
        if (p.progress >= 1) {
          // Pulse reached destination. Optionally chain to next connection.
          const nextConnections = nTo.connections;
          if (nextConnections.length > 1 && Math.random() > 0.3) {
            // Find a connection that isn't the origin
            const filtered = nextConnections.filter((id) => id !== p.fromId);
            p.fromId = nTo.id;
            p.toId = filtered[Math.floor(Math.random() * filtered.length)];
            p.progress = 0;
            p.speed = 0.005 + Math.random() * 0.01;
          } else {
            // Expire pulse and spawn a new one elsewhere
            pulses.splice(i, 1);
            spawnPulse();
          }
          continue;
        }

        const currX = nFrom.x + (nTo.x - nFrom.x) * p.progress;
        const currY = nFrom.y + (nTo.y - nFrom.y) * p.progress;

        // Draw light particle
        ctx.beginPath();
        ctx.arc(currX, currY, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.fill();

        // Draw light path pulse aura
        const gradient = ctx.createRadialGradient(currX, currY, 0, currX, currY, 15);
        gradient.addColorStop(0, "rgba(239, 68, 68, 0.45)");
        gradient.addColorStop(0.5, "rgba(239, 68, 68, 0.15)");
        gradient.addColorStop(1, "rgba(239, 68, 68, 0)");
        
        ctx.beginPath();
        ctx.arc(currX, currY, 15, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // 3. Draw nodes (individual blockchain block points)
      nodes.forEach((n) => {
        // Outer pulsing ring
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + 3 + n.pulse * 4, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(239, 68, 68, ${0.1 * (1 - n.pulse)})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Inner core
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(239, 68, 68, 0.85)";
        ctx.fill();

        // White core accent
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      });

      // Periodically spawn new pulses if list gets low
      if (pulses.length < maxPulses && Math.random() < 0.05) {
        spawnPulse();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 z-[1]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
