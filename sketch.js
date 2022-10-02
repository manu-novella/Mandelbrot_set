var max_iterations = 50
var phase = 0
var max_iterations = 50

var complex_image

function setup() {
  let canvas = createCanvas(600, 600)
  pixelDensity(1)
  background(0)

  complex_image = iterate_complex_plane(max_iterations)
  display_complex_image(complex_image, max_iterations, phase)
  //noLoop
  
  //timestamp = Date.now().toString()
  //saveCanvas(canvas, "outputs/" + timestamp, "png")
}


function draw() {
  phase += 2
  display_complex_image(complex_image, max_iterations, phase)
}
