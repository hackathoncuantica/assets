
AFRAME.registerComponent('galaxias', {

      schema: {
          data: {type: 'string', default: ""},
          sampling_rate: {type: 'number', default: 1},
          radius: {type: 'number', default: 0.010},
          min_radius: {type: 'number', default:0.005},
          max_radius: {type: 'number', default:0.010},
          size: {type: 'number', default: 0.01},
          width: {type: 'number', default: 1},
          height: {type: 'number', default:1},
          depth: {type:'number', default: 0.5}
      },

      // filter by sample rate
      prepare_data: function()  {

          this.initial_data = this.initial_data.filter((galaxy,i) => {
             return (i%(this.data.sampling_rate) === 0);
          });

      },

      // Create the point cloud through THREE.js pointcloud

      make_cloud_sprites: function(){

          console.log("MAKING CLOUD", this.initial_data);

          let max_mins = {ra:[], dec:[], z: [], brightness: []};

          this.initial_data.map((galaxy) => {

              max_mins.ra.push(galaxy.ra);
              max_mins.dec.push(galaxy.dec);
              max_mins.z.push(galaxy.zb);
              max_mins.brightness.push(galaxy.i_auto);

          });

          max_mins.ra = d3.extent(max_mins.ra);
          max_mins.dec = d3.extent(max_mins.dec);
          max_mins.z = d3.extent(max_mins.z);
          max_mins.brightness = d3.extent(max_mins.brightness);

          let scales = {
              ra: d3.scaleLinear().domain(max_mins.ra).range([-this.data.width/2,this.data.width/2]),
              dec: d3.scaleLinear().domain(max_mins.dec).range([-this.data.height/2,this.data.height/2]),
              z: d3.scaleLinear().domain(max_mins.z).range([-this.data.depth/2,this.data.depth/2]),
              brightness: d3.scaleLinear().domain(max_mins.brightness).range([1,0])

          };

          console.log("MAXMINS", max_mins);



          let types = {
              elliptical: {sprite: 'img/elliptical.jpg', ids: {min:0, max:0}},
              spiral: {sprite: 'img/spiral.jpg', ids: {min: 1, max:2}},
              irregular: {sprite: 'img/irregular.jpg', ids: {min:3, max:9999999}}
          };


          for (let [key, value] of Object.entries(types)){
              console.log(key,value);

              let entity = document.createElement("a-entity");

              let textureLoader = new THREE.TextureLoader();

              let sprite = textureLoader.load(value.sprite);

              let geometry = new THREE.BufferGeometry();
              let vertices = [];


              this.initial_data.map((galaxy) => {

                  let my_type = +galaxy.best_run;

                  if((my_type>=value.ids.min) && (my_type<=value.ids.max)){
                      vertices.push(scales.ra(galaxy.ra), scales.dec(galaxy.dec), scales.z(galaxy.zb));
                  }

                  geometry.addAttribute('position', new THREE.Float32BufferAttribute( vertices, 3 ) );

              });

              let material = new THREE.PointsMaterial( { size: this.data.size, map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent: true, opacity: 0.75} );

              let pointMesh = new THREE.Points( geometry, material);

              entity.setObject3D('mesh', pointMesh);


              this.el.appendChild(entity);
          }




          // this.initial_data.map((galaxy) => {
          //
          //     let sphere = document.createElement("a-sphere");
          //
          //     sphere.setAttribute("position", {
          //         x:scales.ra(galaxy.ra),
          //         y: scales.dec(galaxy.dec),
          //         z: scales.z(galaxy.zb)
          //     });
          //
          //     sphere.setAttribute("radius", this.data.radius);
          //
          //     let color;
          //
          //     let my_type = +galaxy.best_run;
          //
          //     if(my_type === 0){
          //         color = d3.hsl("red");
          //     }
          //     else {
          //         if ((my_type === 1) || (my_type === 2)) {
          //             color = d3.hsl("green");
          //         }
          //         else {
          //             color = d3.hsl("grey");
          //         }
          //     }
          //
          //
          //     color.l = scales.brightness(galaxy.i_auto);
          //
          //     sphere.setAttribute("material", {color: color.toString(), shader: "flat"});
          //     sphere.setAttribute("segments-height", 4);
          //     sphere.setAttribute("segments-width", 4);
          //
          //       // let geometry = new THREE.SphereGeometry( 5, 32, 32 );
          //       // let material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
          //       // let sphere = new THREE.Mesh( geometry, material );
          //       // scene.add( sphere );
          //
          //     entity.appendChild(sphere);
          //
          // });
          //



          // this.el.appendChild(entity);


      },

      // Create the point cloud through THREE.js spheres

      make_cloud: function(){

          let entity = document.createElement("a-entity");

          console.log("MAKING CLOUD", this.initial_data);

          let max_mins = {ra:[], dec:[], z: [], brightness: []};

          this.initial_data.map((galaxy) => {

              max_mins.ra.push(galaxy.ra);
              max_mins.dec.push(galaxy.dec);
              max_mins.z.push(galaxy.zb);
              max_mins.brightness.push(galaxy.i_auto);

          });

          max_mins.ra = d3.extent(max_mins.ra);
          max_mins.dec = d3.extent(max_mins.dec);
          max_mins.z = d3.extent(max_mins.z);
          max_mins.brightness = d3.extent(max_mins.brightness);

          let scales = {
              ra: d3.scaleLinear().domain(max_mins.ra).range([-this.data.width/2,this.data.width/2]),
              dec: d3.scaleLinear().domain(max_mins.dec).range([-this.data.height/2,this.data.height/2]),
              z: d3.scaleLinear().domain(max_mins.z).range([-this.data.depth/2,this.data.depth/2]),
              brightness: d3.scaleLinear().domain(max_mins.brightness).range([1,0])

          };

          console.log("MAXMINS", max_mins);



          this.initial_data.map((galaxy) => {

              let sphere = document.createElement("a-sphere");

              sphere.setAttribute("position", {
                  x:scales.ra(galaxy.ra),
                  y: scales.dec(galaxy.dec),
                  z: scales.z(galaxy.zb)
              });

              sphere.setAttribute("radius", this.data.radius);

              let color;

              let my_type = +galaxy.best_run;

              if(my_type === 0){
                  color = d3.hsl("red");
              }
              else {
                  if ((my_type === 1) || (my_type === 2)) {
                      color = d3.hsl("green");
                  }
                  else {
                      color = d3.hsl("grey");
                  }
              }


              color.l = scales.brightness(galaxy.i_auto);

              sphere.setAttribute("material", {color: color.toString(), shader: "flat"});
              sphere.setAttribute("segments-height", 4);
              sphere.setAttribute("segments-width", 4);

                // let geometry = new THREE.SphereGeometry( 5, 32, 32 );
                // let material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
                // let sphere = new THREE.Mesh( geometry, material );
                // scene.add( sphere );

              entity.appendChild(sphere);

          });




          this.el.appendChild(entity);


      },

      init: function () {

          // Load data, prepare data and and launch update, since it's an asycnchronous load

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

            let startTime = new Date();

            this.make_cloud_sprites();

            let endTime = new Date();

            console.log("ELAPSED TIME:", endTime - startTime);


        }

      },

      remove: function () { },

      tick: function (t) { },

      pause: function () { },

      play: function () { }

});

