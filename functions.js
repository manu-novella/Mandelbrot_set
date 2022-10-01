/* 
An imaginary number z, in the form of (a + bi), when squared, z^2, becomes (a^2-b^2 + 2abi). a can certainly
be interpreted as the x coordinate and b, as the y coordinate.
The Mandelbrot set is constituted by those imaginary numbers that don't go to infinity when applied the function
f(z) = z^2 + c, where z is an imaginary variable and c is the original value of the imaginary number passed to
the function.
*/

function iterate_complex_plane() {

    loadPixels()

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {

            //transform canvas coordinates to complex plane coordinates
            let a = map(x, 0, width, -2, 1)
            let b = map(y, 0, height, -1.5, 1.5)
            let c_a = a //original real component of the point being iterated over
            let c_b = b //original imaginary component of the point being iterated over

            let max_iterations = 400
            let threshold_value = 16
            let iteration

            for (iteration = 0; iteration < max_iterations; iteration++) {
                let a_next = a*a - b*b
                let b_next = 2*a*b

                a = a_next + c_a
                b = b_next + c_b

                //if the point in the complex plane goes to infinity
                if (abs(a + b) > threshold_value) {
                    break
                }
            }

            //if the point goes to infinity faster, it'll be darker
            let brightness = map(iteration+30, 0, max_iterations, 0, 255, true)

            //if the point absolutely goes to infinity, be it dark
            if(iteration == max_iterations) {
                brightness = 0
            }

            let pixel_idx = (y * width + x) * 4
            pixels[pixel_idx + 0] = brightness
            pixels[pixel_idx + 1] = brightness
            pixels[pixel_idx + 2] = brightness
            pixels[pixel_idx + 3] = 255

        }
    }

    updatePixels()
}