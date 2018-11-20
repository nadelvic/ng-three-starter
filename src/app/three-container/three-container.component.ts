import { 
  Component, 
  OnInit, 
  ViewChild, 
  ElementRef,
  HostListener, 
  Directive,
  EventEmitter,
  Output } from '@angular/core';
import { WindowRef } from '../service/window-ref.service';

import {
  PerspectiveCamera, 
  Scene, 
  Vector3,
  WebGLRenderer, 
  Clock,
  PointLight
} from 'three';
import * as THREE from 'three';
import { AnimationService } from '../service/animation.service';
import { CameraScene } from './three-content/CameraScene';
import { GeneralLights } from './three-content/GeneralLights';
import { SubjectsScene } from './three-content/SubjectsScene';

@Component({
  selector: 'three-container',
  templateUrl: './three-container.component.html',
  styleUrls: ['./three-container.component.less'],
  providers: [AnimationService]
})
export class ThreeContainerComponent implements OnInit {

  //@Output() inCanvas: EventEmitter<boolean> = new EventEmitter<false>();

  private renderer: WebGLRenderer;
  private scene: Scene;
  private camera: PerspectiveCamera;
  private cameraScene: CameraScene;
  private clock: Clock
  //private pivot: Vector3;
  public mouse: {x: number,y: number};

  //private elementRoot: ElementRef;

  @ViewChild('canvas') private elementCanvas: ElementRef;
  private canvas: HTMLCanvasElement;

  constructor(private winRef: WindowRef,public animationService: AnimationService) {
    //this.elementRoot = element;
   }

  ngOnInit() {
    this.clock = new Clock();
    this.canvas = this.elementCanvas.nativeElement;
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      45, 
      this.canvas.offsetWidth / this.canvas.offsetHeight, 
      0.1, 
      1000);
    this.cameraScene = new CameraScene(this.camera,this.canvas);
    this.renderer = new WebGLRenderer({antialias: true, alpha: false});
    this.renderer.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0xf1f1f1,1);
    this.canvas.appendChild(this.renderer.domElement);
    this.mouse = {
      x: 0,y:0
    }

    /* not use here no data is loaded nor 3D files.
    Promise.all([
      
      WindLayer.getAssets(),
      TempLayer.getAssets(),
      
    ]).then(() => {
      //this.displayThreeContent();
    }); */
  }
  ngAfterViewInit() {
    //this.threeEntryPoint = new ThreeEntryPoint(this.canvas, this.winRef, this.animationService );
    this.displayThreeContent();
    this.mouse.x = 0;
    this.mouse.y = 0;
  }

  createSceneSubjects(scene) { 
    const sceneSubjects = [
        //new GeneralLights(scene)
        //new SceneSubject(scene)
    ];
    return sceneSubjects;
  }

  displayThreeContent(){
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
		const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    //this.scene.add( cube );
    const lights  = new GeneralLights();
    const objects = new SubjectsScene();
    this.scene.add(objects);
    this.scene.add(lights);
    console.log(objects);
    this.animationService.add(this.animate.bind(this));
  }

  animate() {
    const elapsedTime = this.clock.getElapsedTime();
    this.renderer.render(this.scene, this.camera);
    this.cameraScene.animate(elapsedTime);
    this.cameraScene.pointerEffect(this.mouse);
    
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.canvas = this.elementCanvas.nativeElement;
    this.camera.aspect = this.canvas.offsetWidth / this.canvas.offsetHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight);
  }


  /**
   * TODO : Improve this function to have a clear centering along with the mouse
   * taking in account only the bounding  canvas of threejs.
   * @param event
   */
  @HostListener('window:mousemove', ['$event'])
  mouseMoveOnCanvas(event){
    const rect = {
      top: 0, left: 0,width: 0,height: 0;
    }
    const mouse = {
      clientX: 0, clientY: 0
    }
    //console.log(this.winRef.nativeWindow)
    rect.top = this.winRef.nativeWindow.screenTop;
    rect.left = this.winRef.nativeWindow.screenLeft; 
    rect.width = this.winRef.nativeWindow.outerWidth;
    rect.height = this.winRef.nativeWindow.outerHeight;
    event.preventDefault();
    const clientY = event.clientY - rect.top;
    const clientX = event.clientX - rect.left;
    //mouse.clientX = (clientX / this.canvas.clientWidth) * 2 - 1;
    mouse.clientX = (clientX / rect.width)*2 - 1;
    mouse.clientY = (clientY / rect.height)*2 + 0;
    //mouse.clientY = (clientY / this.canvas.clientHeight)*2 - 1;
    //console.log(mouse.x+'|'+mouse.y);
    //console.log(mouse);
    this.mouse.x = mouse.clientX;
    this.mouse.y = mouse.clientY;
    return mouse; 
  }

}
