import * as THREE from 'three';
import { Group, PerspectiveCamera } from 'three';

export const CameraConfig = {
    // Coordinate x of the point looked by the camera
    lookPointX : 0,
    // Coordniate y of the point looked by the camera
    lookPointY : 0,
    // Coordinate z  of the point looked by the camera
    lookPointZ : 0,
    // Distance between the looked point and the camera itself;
    distance: 45,
    // Default vertical (phi) angle from the Y AXIS (going up) of the position of the camera.
    phi0: Math.PI * 92 / 180,
    // Range of movement along the  (phi) vertical angle.
    phiRange: Math.PI * 5 / 180,
    // Default horizontal angle
    theta0: Math.PI / 4,
    //  Range of movement along the (theta) horizontal angle.
    thetaRange: Math.PI *  10 / 180
}

export class CameraScene {

    private initialPosition = this.getCoordinates(0,-.2,CameraConfig);

    constructor(private camera: PerspectiveCamera, private canvas: HTMLCanvasElement){
        //controls.update() must be called after any manual changes to the camera's transform
        this.camera.position.set(this.initialPosition.x,this.initialPosition.y,this.initialPosition.z);
        this.camera.lookAt(new THREE.Vector3(0,0,0));
    }
   
    animate(time){
        //this.updateCamera(time)
    }

    clickMovement(){}

    /**
     * This methods moves the camera position along the movement of the cursor within the canvas.
     * @param {*} mouse Mouse object conaining the coordinate of the pointer in the canvas.
     */
    pointerEffect(mouse: {x: number,y: number}){
        const coord = this.getCoordinates(mouse.x,mouse.y,CameraConfig);
        const inertia = 0.05;
        this.camera.position.x += ( coord.x - this.camera.position.x ) * inertia;
        this.camera.position.y += ( - coord.y - this.camera.position.y ) * inertia;
        this.camera.position.z += ( coord.z - this.camera.position.z ) * inertia;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
    }


    /**
     * Fonction that compute the position of the camera around a specific point.
     * @param {*} xPos  Cursor Position x Coordinate
     * @param {*} yPos  Cursor Position y Coordinate
     * @param {*} config
     */
    getCoordinates(xPos,yPos,config){
        const phi = config.phi0 + yPos* config.phiRange;
        const theta = config.theta0 + xPos * config.thetaRange; 
        const r = config.distance;
        const coord = {
            x: r * Math.cos(theta)*Math.sin(phi),
            y: r * Math.cos(phi),
            z: r * Math.sin(phi)*Math.sin(theta)
        };
        return coord;
    }




    updateCamera(time){
        const angle = 1 / 4  * time;
        const dist = 30;
        this.camera.position.set(dist * Math.sin(angle),10,dist * Math.cos(angle));
        this.camera.lookAt(new THREE.Vector3(0,0,0));

    }
}