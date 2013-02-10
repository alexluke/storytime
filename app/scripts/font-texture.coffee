define [
    'texture'
    'renderers/canvas-font-renderer'
], (Texture, CanvasFontRenderer) ->
    class FontTexture extends Texture
        constructor: (@family, @size, @color, @bgColor) ->
            @renderer = new CanvasFontRenderer @family, @size, @color, @bgColor

        setText: (text) ->
            @renderer.drawText text
            @data = @renderer.canvas
            @width = @data.width
            @height = @data.height

