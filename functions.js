/* 
An imaginary number z, in the form of (a + bi), when squared, z^2, becomes (a^2-b^2 + 2abi). a can certainly
be interpreted as the x coordinate and b, as the y coordinate.
The Mandelbrot set is constituted by those imaginary numbers that don't go to infinity when applied the function
f(z) = z^2 + c, where z is an imaginary variable and c is the original value of the imaginary number passed to
the function.
*/

function iterate_complex_plane(max_iterations) {

    //create data structure to store iteration outputs
    let complex_image = new Array(width)
    for (let column = 0; column < width; column++) {
        complex_image[column] = new Array(height)
    }

    //max value in javascript, so pixels can be painted later according to range
    let max_value = 1.7e+308

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {

            //transform canvas coordinates to complex plane coordinates
            let a = map(x, 0, width, -2/1, 1/1)
            let b = map(y, 0, height, -1.5/1, 1.5/1)
            let c_a = a //original real component of the point being iterated over
            let c_b = b //original imaginary component of the point being iterated over

            let i
            for (i = 0; i < max_iterations; i++) {
                let a_next = a*a - b*b
                let b_next = 2*a*b

                a = a_next + c_a
                b = b_next + c_b

                //calculate modulus value of complex number
                modulus = Math.sqrt(a*a + b*b)
                if (modulus > max_value) {
                    break
                }
            }

            //store iteration in which "infinity" was reached for each complex number
            complex_image[x][y] = i
        }
    }

    return complex_image
}


function display_complex_image(complex_image, max_iterations, phase) {
    
    colorMode(HSB)

    loadPixels()

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {

            value = complex_image[x][y]
            idx = (x + y * width) * 4
            
            //if the point belongs in the Mandelbrot set
            if (value == max_iterations) {
                //paint it black
                pixels[idx + 0] = 0
                pixels[idx + 1] = 0
                pixels[idx + 2] = 0
                pixels[idx + 3] = 255
            } else {
                //paint it a color depending how fast it diverges
                let hue_ = map(value, 0, max_iterations, 0, 360)
                //let phase = 300   //"degrees" in the cyclical hue wheel
                hue_ = (hue_ + phase) % 360
                let color_ = color(hue_, 100, 100, 1)
                pixels[idx + 0] = red(color_)
                pixels[idx + 1] = green(color_)
                pixels[idx + 2] = blue(color_)
                pixels[idx + 3] = 255 //opacity
            }
        }
    }

    updatePixels()
}