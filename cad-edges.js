import { BufferGeometry, BufferAttribute, EdgesGeometry } from './assets/three-build/three.module.js';
self.onmessage = ({ data }) => {
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(data.positions, 3));
  if (data.indices) geometry.setIndex(new BufferAttribute(data.indices, 1));
  const edges = new EdgesGeometry(geometry, 28);
  const positions = edges.attributes.position.array;
  self.postMessage(positions, [positions.buffer]);
  edges.dispose();
  geometry.dispose();
};
