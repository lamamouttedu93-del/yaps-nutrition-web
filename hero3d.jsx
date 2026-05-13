/* YAPS · Hero 3D — Three.js scene
   Chromed/metallic primitives flowing along an arc in space.
   Purple-tinted procedural environment so reflections match the brand. */

function Hero3D() {
  const mountRef = React.useRef(null);
  const stateRef = React.useRef({});

  React.useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !window.THREE) return;
    const T = window.THREE;

    // ---- Renderer ----
    const renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = T.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.outputColorSpace = T.SRGBColorSpace;
    mount.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, {
      width: "100%",
      height: "100%",
      display: "block",
    });

    // ---- Scene & camera ----
    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.6, 7.4);
    camera.lookAt(0, 0, 0);

    // ---- Procedural environment map (purple-magenta gradient cube) ----
    const envCanvas = document.createElement("canvas");
    envCanvas.width = 512;
    envCanvas.height = 256;
    {
      const ctx = envCanvas.getContext("2d");
      const g = ctx.createLinearGradient(0, 0, 0, 256);
      g.addColorStop(0.0, "#ffffff");
      g.addColorStop(0.35, "#f1e3ff");
      g.addColorStop(0.55, "#c79bff");
      g.addColorStop(0.78, "#8b3d9e");
      g.addColorStop(1.0, "#a8347d");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 512, 256);
      // Subtle highlight band
      const h = ctx.createLinearGradient(0, 60, 0, 130);
      h.addColorStop(0, "rgba(255,255,255,0)");
      h.addColorStop(0.5, "rgba(255,255,255,0.55)");
      h.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = h;
      ctx.fillRect(0, 60, 512, 70);
    }
    const envTex = new T.CanvasTexture(envCanvas);
    envTex.mapping = T.EquirectangularReflectionMapping;
    envTex.colorSpace = T.SRGBColorSpace;
    const pmrem = new T.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const envMap = pmrem.fromEquirectangular(envTex).texture;
    scene.environment = envMap;
    envTex.dispose();

    // ---- Lights ----
    scene.add(new T.AmbientLight(0xffffff, 0.45));
    const key = new T.DirectionalLight(0xffffff, 1.2);
    key.position.set(2.5, 4, 4);
    scene.add(key);
    const fillMagenta = new T.PointLight(0xa8347d, 2.6, 12);
    fillMagenta.position.set(-3, -1.5, 2);
    scene.add(fillMagenta);
    const fillViolet = new T.PointLight(0x7b4fd8, 2.2, 12);
    fillViolet.position.set(3, 2.5, -1);
    scene.add(fillViolet);

    // ---- Arc curve ----
    // A wide elliptical arc tilted in 3D, viewed in perspective.
    const arcCurve = new T.CatmullRomCurve3(
      (() => {
        const pts = [];
        const n = 24;
        for (let i = 0; i <= n; i++) {
          const t = i / n;
          // -1..1 swing across X
          const x = T.MathUtils.lerp(-4.2, 4.2, t);
          // y descends gently into the distance (arc dipping)
          const y = -0.4 + Math.sin(t * Math.PI) * 1.05;
          // z arcs forward in middle, away at ends — creates perspective
          const z = -1.6 + Math.sin(t * Math.PI) * 2.2;
          pts.push(new T.Vector3(x, y, z));
        }
        return pts;
      })(),
      false,
      "catmullrom",
      0.3
    );

    // Tube geometry for the luminous arc itself
    const tubeGeo = new T.TubeGeometry(arcCurve, 200, 0.014, 12, false);
    const tubeMat = new T.MeshBasicMaterial({
      color: 0xb88dff,
      transparent: true,
      opacity: 0.55,
    });
    const tube = new T.Mesh(tubeGeo, tubeMat);
    scene.add(tube);

    // Outer glow tube (thicker, more transparent) for bloom-ish look without postFX
    const glowGeo = new T.TubeGeometry(arcCurve, 200, 0.05, 12, false);
    const glowMat = new T.MeshBasicMaterial({
      color: 0xd7b9ff,
      transparent: true,
      opacity: 0.14,
      blending: T.AdditiveBlending,
      depthWrite: false,
    });
    const glow = new T.Mesh(glowGeo, glowMat);
    scene.add(glow);

    // ---- Floating primitives along the arc ----
    const group = new T.Group();
    scene.add(group);

    // Shared chromed material — metallic, low roughness, picks up envMap
    const makeChrome = (tint = 0xffffff, rough = 0.08) =>
      new T.MeshPhysicalMaterial({
        color: tint,
        metalness: 1,
        roughness: rough,
        envMapIntensity: 1.3,
        clearcoat: 0.4,
        clearcoatRoughness: 0.15,
      });

    // Capsule geometry (Three's CapsuleGeometry available since r140)
    const geos = [
      () => new T.BoxGeometry(0.55, 0.55, 0.55, 1, 1, 1),
      () => new T.SphereGeometry(0.34, 48, 48),
      () => (T.CapsuleGeometry ? new T.CapsuleGeometry(0.22, 0.5, 8, 16) : new T.CylinderGeometry(0.24, 0.24, 0.8, 24)),
      () => new T.IcosahedronGeometry(0.36, 0),
      () => new T.TorusGeometry(0.28, 0.085, 24, 64),
      () => new T.OctahedronGeometry(0.36, 0),
    ];

    const tints = [0xffffff, 0xf2e7ff, 0xffe6f3, 0xe5d8ff, 0xffffff, 0xfff0fa];

    const count = 11;
    const items = [];
    for (let i = 0; i < count; i++) {
      const t = (i + 0.5) / count;
      const pos = arcCurve.getPointAt(t);
      // Offset perpendicular to the curve a bit for visual variance
      const tangent = arcCurve.getTangentAt(t);
      const normal = new T.Vector3(0, 1, 0).cross(tangent).normalize();
      const sideOffset = (Math.sin(i * 1.7) * 0.15);
      const vertOffset = (Math.cos(i * 2.3) * 0.18);
      pos.add(normal.multiplyScalar(sideOffset));
      pos.y += vertOffset;

      const geo = geos[i % geos.length]();
      const mat = makeChrome(tints[i % tints.length], 0.06 + (i % 3) * 0.05);
      const mesh = new T.Mesh(geo, mat);
      mesh.position.copy(pos);
      const s = 0.78 + (Math.sin(i * 3.1) * 0.18);
      mesh.scale.setScalar(s);
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      group.add(mesh);
      items.push({
        mesh,
        t,
        baseT: t,
        spin: new T.Vector3(
          0.12 + Math.random() * 0.18,
          0.16 + Math.random() * 0.22,
          0.05 + Math.random() * 0.1
        ),
      });
    }

    // ---- Resize ----
    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // ---- Mouse parallax ----
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e) => {
      const r = mount.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      mouse.tx = (e.clientX - cx) / r.width;
      mouse.ty = (e.clientY - cy) / r.height;
    };
    window.addEventListener("mousemove", onMove);

    // ---- Animate ----
    let raf = 0;
    const clock = new T.Clock();
    const tick = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const time = clock.elapsedTime;

      // Smooth parallax
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;

      // Slow group rotation (overall pan) + parallax tilt
      group.rotation.y = Math.sin(time * 0.12) * 0.18 + mouse.x * 0.3;
      group.rotation.x = -mouse.y * 0.15;
      tube.rotation.copy(group.rotation);
      glow.rotation.copy(group.rotation);

      // Update each primitive: spin + slow procession along arc
      for (const it of items) {
        it.mesh.rotation.x += it.spin.x * dt;
        it.mesh.rotation.y += it.spin.y * dt;
        it.mesh.rotation.z += it.spin.z * dt;
        // Procession around the loop
        let nt = (it.baseT + time * 0.02) % 1;
        if (nt < 0) nt += 1;
        const p = arcCurve.getPointAt(nt);
        const bob = Math.sin(time * 0.6 + it.baseT * 9) * 0.06;
        it.mesh.position.set(p.x, p.y + bob, p.z);
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    stateRef.current = { renderer, scene };

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      ro.disconnect();
      pmrem.dispose();
      renderer.dispose();
      tubeGeo.dispose();
      glowGeo.dispose();
      items.forEach((it) => {
        it.mesh.geometry.dispose();
        it.mesh.material.dispose();
      });
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="hero-canvas" aria-hidden="true" />;
}

window.Hero3D = Hero3D;
