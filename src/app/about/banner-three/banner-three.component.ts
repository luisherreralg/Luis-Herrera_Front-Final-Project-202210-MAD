/* istanbul ignore file */
/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @angular-eslint/no-input-rename */
/* eslint-disable @typescript-eslint/no-this-alias */

import {
  Component,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

@Component({
  selector: 'app-banner-three',
  templateUrl: './banner-three.component.html',
})
export class BannerThreeComponent implements AfterViewInit {
  @ViewChild('canvas') public canvasRef!: ElementRef;

  //* Stage Properties

  @Input() public fieldOfView = 1;

  @Input('nearClipping') public nearClippingPane = 2;

  @Input('farClipping') public farClippingPane = 2000;

  //? Scene properties
  public camera!: THREE.PerspectiveCamera;

  public controls!: OrbitControls;

  public ambientLight!: THREE.AmbientLight;

  public light1!: THREE.PointLight;

  public light2!: THREE.PointLight;

  public light3!: THREE.PointLight;

  public light4!: THREE.PointLight;

  public model: any;

  public directionalLight!: THREE.DirectionalLight;

  //? Helper Properties (public Properties);

  public get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  public loaderGLTF = new GLTFLoader();

  public renderer!: THREE.WebGLRenderer;

  public scene!: THREE.Scene;

  /**
   *Animate the model
   *
   * @public
   * @memberof ModelComponent
   */
  public animateModel() {
    if (this.model) {
      this.model.rotation.z += 0;
      this.model.rotation.y += 0.001;
    }
  }

  /**
   *create controls
   *
   * @public
   * @memberof ModelComponent
   */
  public createControls = () => {
    const renderer = new CSS2DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '800px';
    document.body.appendChild(renderer.domElement);
    this.controls = new OrbitControls(this.camera, renderer.domElement);
    this.controls.autoRotate = true;
    this.controls.enableZoom = false;
    this.controls.enablePan = false;
    this.controls.update();
  };

  /**
   * Create the scene
   *
   * @public
   * @memberof CubeComponent
   */
  public createScene() {
    //* Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff); //0x000000
    this.loaderGLTF.load('assets/3d-model/scene.gltf', (gltf: GLTF) => {
      this.model = gltf.scene.children[0];
      this.model.scale.set(0.3, 0.3, 0.3);
      const box = new THREE.Box3().setFromObject(this.model);
      box.getCenter(this.model.position); // this re-sets the mesh position
      this.model.position.multiplyScalar(-1);
      this.scene.add(this.model);
    });

    //*Camera
    const aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    );
    this.camera.position.x = 500;
    this.camera.position.y = 20;
    this.camera.position.z = 0;
    this.ambientLight = new THREE.AmbientLight(0x00000, 100);
    this.scene.add(this.ambientLight);
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    this.directionalLight.position.set(0, 1, 0);
    this.directionalLight.castShadow = true;
    this.scene.add(this.directionalLight);
    this.light1 = new THREE.PointLight(0xffffff, 0.2);
    this.light1.position.set(0, 200, 400);
    this.scene.add(this.light1);
    this.light2 = new THREE.PointLight(0xffffff, 0.5);
    this.light2.position.set(500, 100, 0);
    this.scene.add(this.light2);
    this.light3 = new THREE.PointLight(0xffffff, 0.2);
    this.light3.position.set(0, 100, -500);
    this.scene.add(this.light3);
    this.light4 = new THREE.PointLight(0xffffff, 0.5);
    this.light4.position.set(-500, 0, 500);
    this.scene.add(this.light4);
  }

  public getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  /**
   * Start the rendering loop
   *
   * @public
   * @memberof CubeComponent
   */
  public startRenderingLoop() {
    //* Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    const component: BannerThreeComponent = this;

    (function render() {
      component.renderer.render(component.scene, component.camera);
      component.animateModel();
      requestAnimationFrame(render);
    })();
  }

  ngAfterViewInit() {
    this.createScene();
    this.startRenderingLoop();
    this.createControls();
  }
}
