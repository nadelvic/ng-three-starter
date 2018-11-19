import * as THREE from 'three';
import { Group } from 'three';
//import spriteDisc from '../../assets/sprites/disc.png';

export class SubjectsScene extends Group { 
    
    private scene;
    
   constructor (){
       super()
       this.initSceneObjects();
       
   }

   initSceneObjects(): void{
    const sprite = new THREE.TextureLoader().load('../../assets/sprites/disc.png');
    const radius = .2;  

    const dotGeometry = new THREE.Geometry();
    dotGeometry.vertices.push(new THREE.Vector3( 0, 0, 0));
    const dotMaterial = new THREE.PointsMaterial( { size: .3, sizeAttenuation: true, map: sprite, alphaTest: 0.5, transparent: true } );
    dotMaterial.color.setRGB( 0.0, 0.4, 0.8);

    const surfaceSize = 40;
    const minX = -20;
    const minZ = -20;

    const numberPerLine = 40;
    const inc = surfaceSize / numberPerLine;

     //mesh.position.set(maxX,1, minz);
     for(let i = 0; i< numberPerLine; i++){
        for(let j = 0; j < numberPerLine; j++){
            let shift = 0;
            if(i%2 == 0) shift = inc / 2;        
            const dot = new THREE.Points( dotGeometry, dotMaterial );  
            dot.position.set(minX + inc * i,this.getPositionY(i,j), minZ + inc * j);
            super.add( dot );        
        }
    }
   }

    getPositionY(i,j){
        const r = 2;
        const a = 4;
        //return r * Math.cos(a * (j/surfaceSize + 0.5)) + r * Math.sin(a*(i/surfaceSize - 0.5));
        return 1/110 * (-i*i - j*j) + 22;
         
    }

    Fa(i,j){
        return i >= j;
    }

    Fb(i,j){
        return -i <= j - 40;
    }

    getPositionYP(i,j){
        
        const c = 1;
        const a = this.Fa(i,j);
        const b = this.Fb(i,j);
        console.log(a+' '+b);
        let pos = 0;
        //console.log(a());
        if(!a && !b) pos = i / c;
        else if(a && !b) pos = j / c;
        else if(a && b) pos =  -i / c;
        else  pos = -j/c;
        return pos + 5;
    }
	//scene.add(mesh);
	
	update(time) {
        //update1(time);	
    }

    update1(time,mesh){
        const scale = 1;//Math.sin(time)+2;
        mesh.position.set(5*Math.sin(time/10),3*Math.cos(time/10),-20)
		mesh.scale.set(scale, scale, scale);
    }
   
}