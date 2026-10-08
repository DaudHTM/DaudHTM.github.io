// Add videos, GIFs, photos, or diagrams to a project's media array.
// Video entries use { type: 'video', src, caption, poster }; GIFs use type: 'image'.
const projectDetails = [
  { stack: ['ESP32', '2 × MPU6050 IMUs', 'Bluetooth LE', 'I\u00b2C sensor bus', 'Serial communication', 'Three.js'], flow: ['Upper-arm + forearm sensors', 'ESP32 firmware', 'Bluetooth LE', 'Browser games + 3D viewer'], sections: [{ title: 'Sensor buses and communication', text: 'The two MPU6050 sensors share an I\u00b2C bus with the ESP32. Serial communication supports firmware debugging and sensor data inspection, while Bluetooth LE sends arm-motion data to the browser.' }, { title: 'HackRice', text: 'Built over 36 hours at HackRice, GitFit won second place.' }], flowTitle: 'From arm movement to gameplay', media: [{ type: 'video', src: 'assets/gitfit-demo.mp4', poster: 'assets/gitfit-demo-poster.jpg', caption: 'GitFit demo — 0:45–2:20, played at 1.5× speed' }, { type: 'image', src: 'assets/gitfit-wiring.png', alt: 'Wiring diagram connecting two MPU6050 sensors to an ESP32 on a shared I²C bus', caption: 'ESP32 + two MPU6050 sensors — shared I²C wiring' }, { type: 'image', src: 'assets/gitfit-sensors.png', alt: 'Two wired sensor boards mounted on wearable arm straps', caption: 'Wearable upper-arm and forearm sensor straps' }] },
  { stack: ['6 degrees of freedom', 'Mechanical design', 'Hardware prototyping', 'Teleoperation', 'Vision-language-action (VLA)', 'NVIDIA Isaac Sim', 'I\u00b2C', 'Serial communication', 'PWM motor control'], status: 'Work in progress', sections: [{ title: 'Arm specifications', text: '6 degrees of freedom, a 10 lb payload, and a 35-inch reach.' }, { title: 'Embedded control and communication', text: 'Ongoing embedded work includes I\u00b2C and serial-bus communication, passing control commands and feedback between hardware and software, and PWM-based actuator control. These interfaces connect the arm hardware with teleoperation and policy execution.' }, { title: 'Teleoperation and VLA policies', text: 'Ongoing work focuses on teleoperating the arm and running vision-language-action (VLA) policies for robot manipulation. The goal is to connect hands-on control with learned policies that translate visual observations and language instructions into actions.' }, { title: 'Simulation and next steps', text: 'Isaac Sim is part of the ongoing simulation workflow for exploring and testing robot policies. Teleoperation, policy execution, and the simulation-to-hardware workflow are still in development.' }], media: [{ type: 'video', src: 'assets/arm-1.mp4', poster: 'assets/arm-1-poster.jpg', caption: '6-DOF robotic arm — demonstration 1' }, { type: 'video', src: 'assets/arm-2.mp4', poster: 'assets/arm-2-poster.jpg', caption: '6-DOF robotic arm — demonstration 2' }, { type: 'model', src: 'assets/robot-arm.glb', caption: 'Robotic arm CAD assembly' }] },
  { stack: ['Arduino', 'C', 'Raspberry Pi', 'Python', '3D modeling'], sections: [{ title: 'Two versions', text: 'The first version explores legged movement with Arduino and C. The second uses Raspberry Pi and Python, and adds powered wheels at the knees to switch between walking and wheeled locomotion.' }], media: [{ type: 'video', src: 'assets/dog-1.mp4', poster: 'assets/dog-1-poster.jpg', caption: 'Robot dog — Version 1' }, { type: 'video', src: 'assets/dog-2.mp4', poster: 'assets/dog-2-poster.jpg', caption: 'Robot dog — Version 2' }, { type: 'model', src: 'assets/robot-dog-v2.glb', caption: 'Robot dog Version 2 — CAD assembly' }] },
  { stack: ['FIRST Tech Challenge', 'Mechanical design', 'Mechanism development', 'Java', 'Autonomous routines', 'Computer vision'], sections: [{ title: 'Four years of FTC', text: 'I participated in FIRST Tech Challenge robotics from 2021 to 2025, serving as mechanical lead, programmer, and co-president. I worked across mechanical design, software, and team leadership throughout those four years.' }, { title: 'World Championship', text: 'Our team competed at the FIRST World Championship and placed 8th in the Ochoa Division.' }, { title: 'Mechanical design', text: 'I designed various robot components and mechanisms, contributing to the physical systems our competition robots relied on.' }, { title: 'Programming and autonomous control', text: 'I programmed autonomous routines in Java and worked on computer vision, combining robot control with visual sensing for autonomous operation.' }], media: [{ type: 'video', src: 'assets/ftc-1.mp4', poster: 'assets/ftc-1-poster.jpg', caption: 'FTC robotics — video 1' }, { type: 'video', src: 'assets/ftc-2.mp4', poster: 'assets/ftc-2-poster.jpg', caption: 'FTC robotics — video 2' }] },
  { stack: ['ESP32', 'C++', 'Bluetooth', 'ESP-NOW', 'MPU6050', 'PID control', 'BLDC motors', 'ESCs', '3D printing'], sections: [{ title: 'What I learned', text: 'Building this drone gave me hands-on experience with C++ firmware, Bluetooth communication, and MPU6050 motion sensing. I worked on tuning a PID controller and controlling brushless DC (BLDC) motors through electronic speed controllers (ESCs), learning how sensing, communication, and motor control come together in a flight system.' }], media: [] },
  { stack: ['Assistive device design', 'Hardware prototyping', 'PLTW Engineering Design & Development'], sections: [{ title: 'The problem', text: 'Opening a medicine bottle can be difficult for people with arthritis or limited hand mobility. This prototype focuses on making that everyday task easier.' }], media: [{ type: 'video', src: 'assets/bottle-demo.mp4', poster: 'assets/bottle-demo-poster.jpg', caption: 'Medicine bottle opener — first 22 seconds' }] },
  { stack: ['Unity', 'C#', 'Arduino', 'Potentiometers', 'Bluetooth'], flow: ['Arm movement', 'Potentiometers + Arduino', 'Bluetooth', 'Unity virtual arm'], flowTitle: 'From physical movement to a virtual arm', media: [{ type: 'video', src: 'assets/beat-tracker.mp4', poster: 'assets/beat-tracker-poster.jpg', caption: 'Beat Saber + arm tracker — first 20 seconds' }, { type: 'image', src: 'assets/beat-tracker-hardware.png', alt: 'Arm tracking prototype with Arduino, breadboard, wiring, and orange housing', caption: 'Arm tracker hardware prototype' }, { type: 'image', src: 'assets/beat-tracker-unity.png', alt: 'Unity editor showing the Beat Saber-inspired game and virtual arm', caption: 'Virtual arm and rhythm game in Unity' }] },
  { stack: ['Robotics', 'Arm-based motion control', 'Hardware prototyping'], media: [{ type: 'video', src: 'assets/puppet-demo.mp4', poster: 'assets/puppet-demo-poster.jpg', caption: 'Puppeteering robot — first 11 seconds' }] }
];

const warmedVideos = new Map();
const dialog = document.createElement('dialog');
dialog.className = 'project-modal';
dialog.setAttribute('aria-labelledby', 'modal-title');
dialog.innerHTML = '<div class="modal-toolbar"><button class="modal-back" type="button" autofocus>Back to projects</button></div><div class="modal-content"></div>';
document.body.append(dialog);
const content = dialog.querySelector('.modal-content');
let opener;
let outsidePress = false;
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}
function section(title, text) {
  const node = el('section', 'detail-section');
  node.append(el('h3', '', title), el('p', '', text));
  return node;
}
let viewerScript;
function loadViewer() {
  if (!viewerScript) {
    viewerScript = document.createElement('script');
    viewerScript.type = 'module';
    viewerScript.src = 'cad-viewer.js';
    document.head.append(viewerScript);
  }
}
function renderMedia(item) {
  if (item.type === 'model') {
    loadViewer();
    const figure = el('figure', 'gallery-item gallery-model');
    const title = el('h3', '', item.caption);
    const viewer = el('cad-viewer');
    viewer.setAttribute('src', item.src);
    viewer.setAttribute('alt', item.caption);
    const status = el('p', 'model-status', 'Loading 3D assembly…');
    status.setAttribute('role', 'status');
    viewer.addEventListener('load', () => { status.textContent = 'Move your mouse to rotate'; });
    viewer.addEventListener('error', () => { status.textContent = 'The 3D assembly could not load. Please try reopening the project.'; });
    figure.append(title, viewer, status);
    return figure;
  }
  const figure = el('figure', 'gallery-item');
  const media = item.type === 'video' && warmedVideos.has(item.src) ? warmedVideos.get(item.src) : el(item.type === 'embed' ? 'iframe' : item.type === 'video' ? 'video' : 'img');
  if (media.getAttribute('src') !== item.src) media.src = item.src;
  if (item.type === 'embed') {
    figure.classList.add('gallery-embed');
    media.title = item.caption || 'Project video';
    media.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen';
    media.referrerPolicy = 'strict-origin-when-cross-origin';
    media.allowFullscreen = true;
  } else if (item.type === 'video') {
    media.controls = true;
    media.autoplay = true;
    media.muted = true;
    media.loop = true;
    figure.classList.add('gallery-video');
    media.preload = 'auto';
    media.playsInline = true;
    if (item.poster) media.poster = item.poster;
  } else {
    if (item.type === 'gif') figure.classList.add('gallery-gif');
    media.alt = item.alt || item.caption || '';
    media.loading = item.type === 'gif' ? 'eager' : 'lazy';
  }
  figure.append(media);
  if (item.caption) figure.append(el('figcaption', '', item.caption));
  return figure;
}
function openProject(card, index, button) {
  opener = button;
  const details = projectDetails[index];
  const heading = el('div', 'modal-heading');
  heading.append(el('p', 'eyebrow', details.status || 'PROJECT DETAILS'));
  const title = el('h2', '', card.querySelector('h3').textContent);
  title.id = 'modal-title';
  heading.append(title, el('p', 'modal-description', card.querySelector(':scope > p').textContent));
  const gallery = el('section', 'modal-gallery');
  if (index === 1 || index === 2) gallery.classList.add('arm-gallery');
  gallery.setAttribute('aria-label', 'Project photos and media');
  const images = Array.from(card.querySelectorAll('img')).map(image => ({ type: 'image', src: image.getAttribute('src'), alt: image.alt, caption: image.closest('figure')?.querySelector('figcaption')?.textContent || image.alt }));
  details.media.concat(images).forEach(item => gallery.append(renderMedia(item)));
  const info = el('div', 'modal-info');
  const story = el('div', 'modal-story');
  const paragraphs = Array.from(card.querySelectorAll('.notes > p')).map(p => p.textContent);
  if (paragraphs.length) {
    const overview = el('section', 'detail-section');
    overview.append(el('h3', '', 'About the project'));
    paragraphs.forEach(p => overview.append(el('p', '', p)));
    story.append(overview);
  }
  details.sections?.forEach(item => story.append(section(item.title, item.text)));
  if (details.flow) {
    const diagram = el('section', 'detail-section');
    diagram.append(el('h3', '', 'How it works'));
    const flow = el('ol', 'architecture-flow');
    flow.setAttribute('aria-label', details.flowTitle);
    details.flow.forEach(step => flow.append(el('li', '', step)));
    diagram.append(flow);
    story.append(diagram);
  }
  const stack = el('aside', 'modal-stack');
  stack.append(el('h3', '', 'Tech stack & methods'));
  const chips = el('ul', 'stack-list');
  details.stack.forEach(tech => chips.append(el('li', '', tech)));
  stack.append(chips);
  const links = card.querySelector('.project-links');
  if (links) stack.append(links.cloneNode(true));
  info.append(story, stack);
  content.replaceChildren(heading, gallery, info);
  document.documentElement.classList.add('modal-is-open');
  document.querySelectorAll('.card-video').forEach(video => video.pause());
  dialog.showModal();
  content.querySelectorAll('video').forEach(video => {
    video.currentTime = 0;
    video.play().catch(() => { /* Native controls remain available if autoplay is blocked. */ });
  });
  dialog.scrollTop = 0;
  dialog.querySelector('.modal-back').focus({ preventScroll: true });
}
const warmedGifs = new Set();
function warmMedia(index) {
  projectDetails[index].media.filter(item => item.type === 'video').forEach(item => {
    if (warmedVideos.has(item.src)) return;
    const video = document.createElement('video');
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.src = item.src;
    video.poster = item.poster || '';
    warmedVideos.set(item.src, video);
    video.load();
  });
  projectDetails[index].media.filter(item => item.type === 'gif').forEach(item => {
    if (warmedGifs.has(item.src)) return;
    warmedGifs.add(item.src);
    const image = new Image();
    image.src = item.src;
  });
}
document.querySelectorAll('.project').forEach((card, index) => {
  const button = el('button', 'project-open', 'Explore project');
  button.type = 'button';
  button.setAttribute('aria-label', 'Explore ' + card.querySelector('h3').textContent);
  button.setAttribute('aria-haspopup', 'dialog');
  button.addEventListener('click', () => openProject(card, index, button));
  card.addEventListener('pointerdown', () => warmMedia(index), { once: true });
  if (projectDetails[index].media.some(item => item.type === 'video')) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { warmMedia(index); observer.disconnect(); }
    }, { rootMargin: '300px' });
    observer.observe(card);
  }
  card.addEventListener('pointerenter', () => warmMedia(index), { once: true });
  button.addEventListener('focus', () => warmMedia(index), { once: true });
  card.append(button);
  card.classList.add('modal-enabled');
});
dialog.querySelector('.modal-back').addEventListener('click', () => dialog.close());
function outside(event) {
  const rect = dialog.getBoundingClientRect();
  return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
}
dialog.addEventListener('pointerdown', event => { outsidePress = outside(event); });
dialog.addEventListener('pointerup', event => {
  if (outsidePress && outside(event)) dialog.close();
  outsidePress = false;
});
dialog.addEventListener('close', () => {
  content.querySelectorAll('video').forEach(video => video.pause());
  content.querySelectorAll('iframe, cad-viewer').forEach(frame => frame.remove());
  document.documentElement.classList.remove('modal-is-open');
  document.querySelectorAll('.card-video').forEach(video => video.play().catch(() => {}));
  opener?.focus({ preventScroll: true });
});
