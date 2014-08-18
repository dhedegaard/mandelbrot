/*global $*/
(function() {
	/* Returns a number, or undefined if unable to parse. */
	var getMax = function() {
		var $max = $('#max');
		var max = parseInt($max.val(), 10);
		if (isNaN(max)) {
			return undefined;
		} else {
			return max;
		}
	};

	/* Generates and draws the mandelbrot based on the number of iterations. */
	var generate = function(max) {
		if (max === undefined) {
			alert('The number of iterations is not a number!');
			return;
		}

		if (max < 1) {
			alert('The number of iterations cannot be less than 1!');
			return;
		}

		var add_color = Math.floor(max / 10);
		var $canvas = $('#canvas');
		var c = document.getElementById('canvas');
		var ctx = c.getContext("2d");
		var width = Math.floor(parseInt($canvas.attr('width'), 10) / 0.8);
		var height = parseInt($canvas.attr('height'), 10);
		for (var row = 0; row < height; row++) {
			for (var col = 0; col < width; col++) {
				var c_re = (col - width / 2.0) * 4.0 / width;
				var c_im = (row - height / 2.0) * 4.0 / width;
				var x = 0,
					y = 0;
				var iteration = 0;
				while (x * x + y * y <= 4 && iteration < max) {
					var x_new = x * x - y * y + c_re;
					y = 2 * x * y + c_im;
					x = x_new;
					iteration++;
				}

				/* Make some pretty colors based on the number of iterations. */
				if (iteration === max) {
					ctx.fillStyle = '#000';
				} else {
					var color = Math.floor((max - iteration + add_color) / max * 255);
					ctx.fillStyle = 'rgb(' + color + ', ' + color + ', 255)';
				}
				ctx.fillRect(col, row, 1, 1);
			}
		}
	};

	$(function() {
		generate(getMax());

		$('#regenerate').click(function() {
			generate(getMax());
		});

		$('#max').keypress(function(e) {
			if (e.keyCode === 13) {
				$('#regenerate').click();
			}
		});
	});
})();