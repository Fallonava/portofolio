'use client';

import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';

interface AuroraProps {
    colorStops?: string[];
    amplitude?: number;
    speed?: number;
}

export function Aurora({
    colorStops = ['#00d8ff', '#7cff67', '#00d8ff'],
    amplitude = 1.0,
    speed = 0.5,
}: AuroraProps) {
    const ctnDom = useRef<HTMLDivElement>(null);
    const glRef = useRef<Renderer | null>(null);

    useEffect(() => {
        if (!ctnDom.current) return;

        const renderer = new Renderer({
            alpha: true,
            premultipliedAlpha: false,
            dpr: Math.min(window.devicePixelRatio, 2),
        });
        glRef.current = renderer;
        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);

        // Initial sizing
        function resize() {
            if (!ctnDom.current || !glRef.current) return;
            const width = ctnDom.current.offsetWidth;
            const height = ctnDom.current.offsetHeight;
            renderer.setSize(width, height);
            if (program) {
                program.uniforms.uResolution.value = [width, height];
            }
        }
        window.addEventListener('resize', resize);

        // Geometry & Program
        const geometry = new Triangle(gl);
        if (geometry.attributes.uv) {
            // @ts-ignore -- OGL types can be tricky, deleting if exists is fine
            delete geometry.attributes.uv;
        }

        const color1 = new Color(colorStops[0]);
        const color2 = new Color(colorStops[1]);
        const color3 = new Color(colorStops[2]);

        const program = new Program(gl, {
            vertex: `
        attribute vec2 uv;
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 0, 1);
        }
      `,
            fragment: `
        precision highp float;
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform float uAmplitude;
        
        varying vec2 vUv;
        
        // Simplex noise function
        vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
        float snoise(vec2 v){
          const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                   -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy) );
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod(i, 289.0);
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
          + i.x + vec3(0.0, i1.x, 1.0 ));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m ;
          m = m*m ;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / uResolution;
          float time = uTime * 0.5;
          
          // Create Aurora-like waves
          float noise1 = snoise(vec2(uv.x * 3.0 + time * 0.2, uv.y * 2.0 - time * 0.3));
          float noise2 = snoise(vec2(uv.x * 4.0 - time * 0.4, uv.y * 5.0 + time * 0.2));
          
          float wave = sin(uv.x * 5.0 + time) * 0.5 + 0.5;
          wave += noise1 * uAmplitude;
          
          float mask = smoothstep(0.0, 1.0, uv.y + noise2 * 0.2);
          
          vec3 color = mix(uColor1, uColor2, wave);
          color = mix(color, uColor3, noise2);
          
          gl_FragColor = vec4(color, mask * 0.6); // Adjust alpha for subtlety
        }
      `,
            uniforms: {
                uTime: { value: 0 },
                uResolution: { value: [0, 0] },
                uColor1: { value: color1 },
                uColor2: { value: color2 },
                uColor3: { value: color3 },
                uAmplitude: { value: amplitude },
            },
        });

        const mesh = new Mesh(gl, { geometry, program });
        let reqId: number;

        function update(t: number) {
            reqId = requestAnimationFrame(update);
            program.uniforms.uTime.value = t * 0.001 * speed;
            renderer.render({ scene: mesh });
        }

        ctnDom.current.appendChild(gl.canvas);
        gl.canvas.style.display = 'block';
        gl.canvas.style.width = '100%';
        gl.canvas.style.height = '100%';

        resize();
        reqId = requestAnimationFrame(update);

        return () => {
            cancelAnimationFrame(reqId);
            window.removeEventListener('resize', resize);
            if (ctnDom.current && gl.canvas.parentNode === ctnDom.current) {
                ctnDom.current.removeChild(gl.canvas);
            }
            // OGL cleanup if needed, usually simple unmount is fine for basic usage
        };
    }, [colorStops, amplitude, speed]);

    return <div ref={ctnDom} className="absolute inset-0 z-0 pointer-events-none" />;
}
