import * as THREE from 'three';
import { GLTFLoader } from './assets/three-addons/loaders/GLTFLoader.js';
import { DRACOLoader } from './assets/three-addons/loaders/DRACOLoader.js';

class CadViewer extends HTMLElement {
  connectedCallback() {
    this.style.position = 'relative';
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.NoToneMapping;
    this.renderer.domElement.setAttribute('aria-label', `${this.getAttribute('alt') || 'CAD assembly'}. Move your mouse to rotate.`);
    this.append(this.renderer.domElement);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(32, 1, 0.001, 100);
    this.scene.add(new THREE.AmbientLight(0xffffff, 1.15));
    const key = new THREE.DirectionalLight(0xffffff, 0.7);
    key.position.set(2, 4, 3);
    this.scene.add(key);
    const fill = new THREE.DirectionalLight(0xffffff, 0.2);
    fill.position.set(-3, 1, -2);
    this.scene.add(fill);
    this.group = new THREE.Group();
    this.scene.add(this.group);
    this.targetAngle = 0;
    this.edgeWorker = new Worker(new URL('./cad-edges.js', import.meta.url), { type: 'module' });
    this.edgeWorker.onmessage = ({ data }) => {
      const pending = this.edgePending;
      this.edgePending = null;
      pending?.(data);
    };
    this.pointerHandler = event => {
      if (event.pointerType !== 'mouse') return;
      const rect = this.getBoundingClientRect();
      this.targetAngle = ((event.clientX - rect.left) / rect.width - 0.5) * Math.PI * 1.8;
      this.draw();
    };
    this.addEventListener('pointermove', this.pointerHandler);
    this.observer = new ResizeObserver(() => this.resize());
    this.observer.observe(this);
    this.draco = new DRACOLoader();
    this.draco.setWorkerLimit(2);
    this.draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
    const loader = new GLTFLoader().setDRACOLoader(this.draco);
    loader.load(this.getAttribute('src'), async gltf => {
      if (!this.isConnected) return;
      const model = gltf.scene;
      const meshes = [];
      model.traverse(mesh => { if (mesh.isMesh) meshes.push(mesh); });
      for (const mesh of meshes) {
        if (!this.isConnected) return;
        const originals = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        const materials = originals.map(material => new THREE.MeshLambertMaterial({
          color: material.color.clone().convertSRGBToLinear(),
          side: THREE.DoubleSide,
          transparent: material.transparent,
          opacity: material.opacity,
          polygonOffset: true,
          polygonOffsetFactor: 1,
          polygonOffsetUnits: 1
        }));
        mesh.material = Array.isArray(mesh.material) ? materials : materials[0];
        const positions = mesh.geometry.attributes.position.array.slice();
        const indices = mesh.geometry.index?.array.slice();
        const edgePositions = await new Promise(resolve => {
          this.edgePending = resolve;
          this.edgeWorker.postMessage({ positions, indices }, indices ? [positions.buffer, indices.buffer] : [positions.buffer]);
        });
        if (!this.isConnected) return;
        const edges = new THREE.BufferGeometry();
        edges.setAttribute('position', new THREE.BufferAttribute(edgePositions, 3));
        const lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x25312d, transparent: true, opacity: 0.75 }));
        mesh.add(lines);
        originals.forEach(material => material.dispose());
      }
      const bounds = new THREE.Box3().setFromObject(model);
      const center = bounds.getCenter(new THREE.Vector3());
      this.size = bounds.getSize(new THREE.Vector3());
      model.position.sub(center);
      this.group.add(model);
      this.resize();
      this.loaded = true;
      this.draw();
      this.dispatchEvent(new Event('load'));
    }, undefined, () => this.dispatchEvent(new Event('error')));
  }
  draw() {
    if (this.frame || !this.isConnected) return;
    this.frame = requestAnimationFrame(() => {
      this.frame = null;
      if (!this.isConnected) return;
      const delta = this.targetAngle - this.group.rotation.y;
      this.group.rotation.y += delta * 0.12;
      this.renderer.render(this.scene, this.camera);
      if (Math.abs(delta) > 0.001) this.draw();
    });
  }
  resize() {
    if (!this.renderer) return;
    const width = this.clientWidth;
    const height = this.clientHeight;
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    if (this.size) {
      const radius = this.size.length() / 2;
      const fov = THREE.MathUtils.degToRad(this.camera.fov);
      const distance = radius / Math.sin(fov / 2) / Math.min(1, this.camera.aspect) * 1.08;
      this.camera.position.set(distance * 0.65, distance * 0.4, distance * 0.65);
      this.camera.near = radius / 100;
      this.camera.far = distance * 10;
      this.camera.lookAt(0, 0, 0);
    }
    this.camera.updateProjectionMatrix();
    this.draw();
  }
  disconnectedCallback() {
    cancelAnimationFrame(this.frame);
    this.edgeWorker?.terminate();
    this.edgePending?.(null);
    this.edgePending = null;
    this.observer?.disconnect();
    this.removeEventListener('pointermove', this.pointerHandler);
    this.renderer?.setAnimationLoop(null);
    this.scene?.traverse(object => {
      object.geometry?.dispose();
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.forEach(material => material?.dispose());
    });
    this.draco?.dispose();
    this.renderer?.dispose();
    this.renderer?.forceContextLoss();
  }
}
customElements.define('cad-viewer', CadViewer);
