/* 
An imaginary number z, in the form of (a + bi), when squared, z^2, becomes (a^2-b^2 + 2abi). a can certainly
be interpreted as the x coordinate and b, as the y coordinate.
The Mandelbrot set is constituted by those imaginary numbers that don't go to infinity when applied the function
f(z) = z^2 + c, where z is an imaginary variable and c is the original value of the imaginary number passed to
the function.
*/

function iterate_complex_plane(max_iterations, complex_plane_width_0, complex_plane_height_0, zoom, x_coord, y_coord) {

    //initial coordinates
    a_0_0 = 0  //viewport's upper left corner x coordinate
    a_max_0 = complex_plane_width_0  //viewport's upper right corner x coordinate
    b_0_0 = 0  //viewport's upper left corner y coordinate
    b_max_0 = complex_plane_height_0  //viewport's lower left corner y coordinate

    //viewport's lengths calculation
    l_a_0 = complex_plane_width_0
    l_b_0 = complex_plane_height_0
    l_a_1 = complex_plane_width_0 / zoom
    l_b_1 = complex_plane_height_0 / zoom
    
    //viewport length difference after zoom
    a_length_diff = (l_a_0 - l_a_1)
    b_length_diff = (l_b_0 - l_b_1)

    //subsequent coordinates calculation
    a_0_1 = a_0_0 + a_length_diff / 2 - complex_plane_width_0 / 2 + x_coord
    a_max_1 = a_max_0 - a_length_diff / 2 - complex_plane_width_0 / 2 + x_coord
    b_0_1 = b_0_0 + b_length_diff / 2 - complex_plane_height_0 / 2 + y_coord
    b_max_1 = b_max_0 - b_length_diff / 2 - complex_plane_height_0 / 2 + y_coord

    //create data structure to store iteration outputs
    let complex_image = new Array(width)
    for (let column = 0; column < width; column++) {
        complex_image[column] = new Array(height)
    }

    //max absolute value around Mandelbrot set
    let max_value = 2

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {

            //transform canvas coordinates to complex plane coordinates
            let a = map(x, 0, width, a_0_1, a_max_1)
            let b = map(y, 0, height, b_0_1, b_max_1)

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

                //if point diverges, stop calculating
                if (modulus > max_value) {
                    break
                }
            }

            //store iteration in which divergence was confirmed for each complex number
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
                hue_ = (hue_ + phase) % 360 //the color changes gradually
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