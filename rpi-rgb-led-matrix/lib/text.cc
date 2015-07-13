// -*- mode: c++; c-basic-offset: 2; indent-tabs-mode: nil; -*-
// Small example how write text.
//
// This code is public domain
// (but note, that the led-matrix library this depends on is GPL v2)

#include "led-matrix.h"
#include "graphics.h"

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

using namespace rgb_matrix;

extern "C" {
	static bool parseColor(Color *c, const char *str) {
		return sscanf(str, "%hhu,%hhu,%hhu", &c->r, &c->g, &c->b) == 3;
	}

	char* sayHello()
	{
		return "hello";
	}

	void displayText(char *str) {
		Color color(255, 255, 0);
		const char *bdf_font_file = "fonts/8x13B.bdf";
		int rows = 16;
		int chain = 1;
		int parallel = 1;
		int x_orig = 0;
		int y_orig = -1;

		/*
		 * Load font. This needs to be a filename with a bdf bitmap font.
		 */
		rgb_matrix::Font font;
		if (!font.LoadFont(bdf_font_file)) {
			fprintf(stderr, "Couldn't load font '%s'\n", bdf_font_file);
		}

		/*
		 * Set up GPIO pins. This fails when not running as root.
		 */
		GPIO io;
		if (!io.Init())
			return;

		/*
		 * Set up the RGBMatrix. It implements a 'Canvas' interface.
		 */
		RGBMatrix *canvas = new RGBMatrix(&io, rows, chain, parallel);

		bool all_extreme_colors = true;
		all_extreme_colors &= color.r == 0 || color.r == 255;
		all_extreme_colors &= color.g == 0 || color.g == 255;
		all_extreme_colors &= color.b == 0 || color.b == 255;
		if (all_extreme_colors)
			canvas->SetPWMBits(1);

		const int x = x_orig;
		int y = y_orig;

		rgb_matrix::DrawText(canvas, font, x, y + font.baseline(), color, str);

		// Finished. Shut down the RGB matrix.
		canvas->Clear();
		delete canvas;
	}
}
