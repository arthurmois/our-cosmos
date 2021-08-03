class Planet
{

    constructor(radius,direction,dist_from_sun,color,texture_img)
    {
        this.r = radius*scale;
        this.dir  = direction.normalize();
        this.dist = dist_from_sun*scale;


        //THREE code
        this.planet_geo = new THREE.SphereGeometry(this.r,100,100);
        const texture = new THREE.TextureLoader().load( texture_img );
        this.planet_material = new THREE.MeshBasicMaterial( { map: texture } );
        this.planet = new THREE.Mesh( this.planet_geo, this.planet_material );

        this.position = this.dir;
        this.position.multiplyScalar(this.dist)

        this.planet.translateX(this.position.x);
        this.planet.translateZ(this.position.z);

    }



    setScale(x, y, z) 
    {
        this.scale[0] = x;
        this.scale[1] = y;
        this.scale[2] = z;
    }

    setRotate(x, y, z) 
    {
        this.rotate[0] = x;
        this.rotate[1] = y;
        this.rotate[2] = z;
    }

    setTranslate(x, y, z) 
    {
        this.translate[0] = x;
        this.translate[1] = y;
        this.translate[2] = z;
    }
} 