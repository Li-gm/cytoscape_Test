<template>
  <div>
    <div ref="networkContainer" id="networkContainer"></div>
    <div style="text-align: center;margin-top: 30px">
      <Button type="primary" size="large" @click="JumpPage">查看复杂的网络图</Button>
    </div>
  </div>
</template>

<script>
  import cytoscape from 'cytoscape'
  let cy;
  let list = [
    {
      "selector": "core",
      "style": {
        "selection-box-color": "#AAD8FF",
        "selection-box-border-color": "#8BB0D0",
        "selection-box-opacity": "0.5"
      }
    }, {
      "selector": "node",
      "style": {
        "width": "8px",
        "height": "8px",
        "content": "data(name)",
        "font-size": "4px",
        "text-valign": "center",
        "text-halign": "center",
        "background-color": "#2c3ef5",
        "text-outline-color": "#555",
        "text-outline-width": "1px",
        "color": "#fff",
        "overlay-padding": "1px",
        "z-index": "10"
      }
    }, {
      "selector": "node[?attr]",
      "style": {
        "shape": "rectangle",
        "background-color": "#aaa",
        "text-outline-color": "#aaa",
        "width": "16px",
        "height": "16px",
        "font-size": "6px",
        "z-index": "1"
      }
    }, {
      "selector": "node:selected",
      "style": {
        "border-width": "6px",
        "border-color": "#AAD8FF",
        "border-opacity": "0.5",
        "background-color": "#77828C",
        "text-outline-color": "#77828C"
      }
    }, {
      "selector": "edge",
      "style": {
        "curve-style": "bezier",
        'control-point-step-size':20,
        "haystack-radius": "0.5",
        "opacity": "0.4",
        "line-color": "#bbb",
        "width": "mapData(weight, 0, 1, 1, 8)",
        "overlay-padding": "3px"
      }
    }, {
      "selector": "node.unhighlighted",
      "style": {
        "opacity": "0.2"
      }
    }, {
      "selector": "edge.unhighlighted",
      "style": {
        "opacity": "0.05"
      }
    }, {
      "selector": ".highlighted",
      "style": {
        "z-index": "999999"
      }
    }, {
      "selector": "node.highlighted",
      "style": {
        "border-width": "6px",
        "border-color": "#AAD8FF",
        "border-opacity": "0.5",
        "background-color": "#394855",
        "text-outline-color": "#394855"
      }
    }, {
      "selector": "edge.filtered",
      "style": {
        "opacity": "0"
      }
    }, {
      "selector": "edge[group='coexp']",
      "style": {
        "line-color": "#9134d5"
      }
    }, {
      "selector": "edge[group='select_net']",
      "style": {
        "line-color": "#42da5a"
      }
    },{
      "selector": "edge[group='base_net']",
      "style": {
        "line-color": "#dabe25"
      }
    }];
  let data = [
    {
      "data": {
        "id": "605755",
        "name": "ENSMUSG00000076492",
      },
      "group": "nodes",
    },
    {
      "data": {
        "id": "611408",
        "name": "ENSMUSG00000076604",
      },
      "group": "nodes",
    },
    {
      "data": {
        "id": "612341",
        "name": "ENSMUSG00000093346",
      },
      "group": "nodes",
    },
    {
      "data": {
        "source": "611408",
        "target": "605755",
        "weight": 0.0055478187,
        "group": "coexp",
        "id": "e0"
      },
      "group": "edges",
      "classes": ""
    },
    {
      "data": {
        "source": "612341",
        "target": "611408",
        "weight": 0.012590342,
        "group": "coexp",
        "id": "e1"
      },
      "group": "edges",
      "classes": ""
    },
    {
      "data": {
        "source": "612341",
        "target": "605755",
        "weight": 0.0089772185,
        "group": "coexp",
        "id": "e2"
      },
      "group": "edges",
      "classes": ""
    },
    {
      "data": {
        "source": "611408",
        "target": "605755",
        "weight": 0.0055292076,
        "group": "coexp",
        "id": "e3"
      },
      "group": "edges",
      "classes": ""
    },
    {
      "data": {
        "source": "605755",
        "target": "611408",
        "weight": 0.005184464,
        "group": "coexp",
        "id": "e4"
      },
      "group": "edges",
      "classes": ""
    },
    {
      "data": {
        "source": "605755",
        "target": "612341",
        "weight": 0.008174375,
        "group": "coexp",
        "id": "e5"
      },
      "group": "edges",
      "classes": ""
    },
    {
      "data": {
        "source": "605755",
        "target": "612341",
        "weight": 0.019493334,
        "group": "spd",
        "id": "e592"
      },
      "group": "edges",
      "classes": ""
    },
  ];
  export default {
    name: "index",
    data(){
      return{

      }
    },
    mounted(){
      this.renderCytoScape(data);
    },
    methods:{
      JumpPage(){
        this.$router.push({path:'/network'})
      },
      renderCytoScape(dataList) {
        cy = cytoscape({
          container: document.getElementById('networkContainer'),
          style:list,
          userZoomingEnabled: true,
          panningEnabled: true,
          userPanningEnabled: true,
          layout: {
            name: 'cose',
            stiffness: 0,
            // maxSimulationTime:500
          },
          zoom: 1,
          minZoom: 1e-50,
          maxZoom: 1e50,
          elements: dataList,
        });
        cy.panzoom({
          zoomFactor: 0.05, // zoom factor per zoom tick
          zoomDelay: 45, // how many ms between zoom ticks
          minZoom: 0.1, // min zoom level
          maxZoom: 10, // max zoom level
          fitPadding: 50, // padding when fitting
          panSpeed: 10, // how many ms in between pan ticks
          panDistance: 10, // max pan distance per tick
          panDragAreaSize: 75, // the length of the pan drag box in which the vector for panning is calculated (bigger = finer control of pan speed and direction)
          panMinPercentSpeed: 0.25, // the slowest speed we can pan by (as a percent of panSpeed)
          panInactiveArea: 8, // radius of inactive area in pan drag box
          panIndicatorMinOpacity: 0.5, // min opacity of pan indicator (the draggable nib); scales from this to 1.0
          zoomOnly: false, // a minimal version of the ui only with zooming (useful on systems with bad mousewheel resolution)
          fitSelector: undefined, // selector of elements to fit
          animateOnFit: function () { // whether to animate on fit
            return false;
          },
          fitAnimationDuration: 1000, // duration of animation on fit
          // icon class names
          //sliderHandleIcon: 'fa fa-minus',
          sliderHandleIcon: 'ivu-icon ivu-icon-ios-remove',
          zoomInIcon: 'ivu-icon ivu-icon-ios-add',
          //zoomOutIcon: 'fa fa-minus',
          zoomOutIcon: 'ivu-icon ivu-icon-ios-remove"',
          //resetIcon: 'fa fa-expand'
          resetIcon: 'ivu-icon ivu-icon-ios-resize'
        });
      },
    }
  }
</script>

<style scoped>
  #networkContainer {
    width: 90%;
    height: 700px;
    background-color: #ffffff;
    border: 1px solid #ddd;
    margin-top: 10px;
    margin-left: 5%;
  }
</style>
