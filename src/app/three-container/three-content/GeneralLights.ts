import * as THREE from 'three';
import { Group, Light, PointLight } from 'three';


export class GeneralLights extends Group {

    private lights: Array<Light> = new Array<Light>();

    constructor(){
        super();
        const firstLight = this.createPointLight("#FAFAFA",1,0,0,0);
        //const secondLight = this.createPointLight("#0088FF",1, 2.0,2.0,2.0);
        this.lights.forEach(light => super.add(light));
        super.add(this.lights);
    }

    createPointLight(
        hexaColor: string,
        alpha: number,
        positionX: number,
        positionY: number, 
        positionZ: number
        ){
        const newLight = new PointLight(hexaColor,alpha);
        newLight.position.x = positionX;
        newLight.position.y = positionY;
        newLight.position.z = positionZ;
        this.lights.push(newLight);
        return newLight;
    }


	update(time) {
		//update1(time);
    }
    
    animate(time){
        //this.light.intensity = (Math.sin(time/10)+1.5)/1.5;
		//this.light.color.setHSL( Math.sin(time/10), 0.5, 0.5 );    
    }

}