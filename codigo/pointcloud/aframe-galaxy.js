
AFRAME.registerComponent('galaxy', {

      schema: {
          data: {type: 'string', default: ""},
          radius: {type: 'number', default: 10},
          sampling_rate: {type: 'number', default: 4},
          color_scale: {type: 'string', default: "interpolatePurples"},
          point_size: {type: 'number', default: 0.0025},
          opacity: {type: 'number', default: 0.2}
      },

     // spherical to cartesian conversion

     convert: function(lat, long, radius){

              let cosPhi = Math.cos(lat/180 * Math.PI);

              return {
                  x: radius * cosPhi * Math.cos(long/180 * Math.PI),
                  y: radius * Math.sin(lat/180 * Math.PI),
                  z: radius * cosPhi * Math.sin(long/180 * Math.PI),
              }

      },

      // filter by sample rate
      prepare_data: function()  {

          this.initial_data = this.initial_data.filter((galaxy,i) => {
             return (i%(this.data.sampling_rate) === 0);
          });

      },

      // Create the point cloud through THREE.js THREE.Points (old PointCloud)

      make_cloud: function(added_long, added_lat){

          let entity = document.createElement("a-entity");

          let geometry = new THREE.BufferGeometry();

          let positions = new Float32Array(this.initial_data.length*3);
          let colors = new Float32Array(this.initial_data.length*3);

          let lss_values = [];
          let lats = [];
          let longs = [];

          // Push values to build color scale extent (max & min)

          this.initial_data.map((galaxy) => {
              lss_values.push(parseFloat(galaxy.lsst_i));
              lats.push(parseFloat(galaxy.dec_gal));
              longs.push(parseFloat(galaxy.ra_gal));
          });

          let lss_extent = d3.extent(lss_values);

          // https://github.com/d3/d3-scale

          let color_scale = d3.scaleSequential([lss_extent[1], lss_extent[0]], d3[this.data.color_scale]);

          this.initial_data.map((galaxy, i) => {

             if(i%100000 === 0){
                 console.log("POINT NUMBER", i);
             }

             // Insert positions and colors into Float32Arrays

             let point = this.convert(+galaxy.dec_gal + added_lat, +galaxy.ra_gal + added_long, this.data.radius);

             positions[(i*3)] = point.x;
             positions[(i*3) + 1] = point.y;
             positions[(i*3) + 2] = point.z;

             let color = d3.color(color_scale(galaxy.lsst_i)).rgb();

             colors[(i*3)] = color.r/255.0;
             colors[(i*3) + 1] = color.g/255.0;
             colors[(i*3) + 2] = color.b/255.0;


             this.point_number++;


          });

          // Add position and color to the geometry, and the build the mesh, appending it to the entity

          geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
          geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));

          geometry.computeBoundingSphere();


          let material = new THREE.PointsMaterial({
              size: this.data.point_size,
              vertexColors: THREE.VertexColors,
              flatShading: true,
              fog: false,
              lights: false,
              opacity: this.data.opacity,
              transparent: true,
          });

          let pointMesh = new THREE.Points(geometry, material);

          entity.setObject3D('mesh', pointMesh);

          this.el.appendChild(entity);


      },

      init: function () {

          // Load data, prepare data and and launch update, since it's an asycnchronous load

          console.log("GALAXY: INIT");

          d3.csv(this.data.data).then(net_data => {

            console.log("GALAXY: LOADED DATA", net_data);

            this.initial_data = net_data;

            this.prepare_data();

            this.update();

        })
        .catch(error => {
            console.log("GALAXY: ERROR GETTING DATA", error, this.data.data);
        });


      },

      update: function (oldData) {

        console.log("GALAXY UPDATE:", this.data, d3);

        if(this.initial_data) {

            this.point_number = 0;

            console.log("GALAXY: THERE'S DATA");

            let startTime = new Date();

            this.make_cloud(0, 0);

            console.log("NUMBER OF POINTS", this.point_number);

            let endTime = new Date();

            console.log("ELAPSED TIME:", endTime - startTime);


        }

      },

      remove: function () { },

      tick: function (t) { },

      pause: function () { },

      play: function () { }

});

