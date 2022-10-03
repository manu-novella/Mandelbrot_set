var max_iterations = 500
var phase = 0
var zoom = 1
var zoom_inc = 0.01
var complex_plane_width_0 = 6
var complex_plane_height_0 = 6

var x_coord = -0.0452407411
var y_coord = 0.9868162204352258

function setup() {
  let canvas = createCanvas(609, 609)
  pixelDensity(1)
  //background(0)
  
  //noLoop
  
  //timestamp = Date.now().toString()
  //saveCanvas(canvas, "outputs/" + timestamp, "png")
}


function draw() {
  let complex_image = iterate_complex_plane(max_iterations, complex_plane_width_0, complex_plane_height_0, zoom, x_coord, y_coord)
  display_complex_image(complex_image, max_iterations, phase)
  phase += 0.2  //good idea to sync it with zoom_inc
  zoom += zoom * zoom_inc
}


