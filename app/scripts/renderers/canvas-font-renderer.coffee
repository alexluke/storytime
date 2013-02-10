define ->
    class CanvasFontRenderer
        constructor: (@fontFamily, @fontSize, @color, @bgColor) ->
            @canvas = document.createElement 'canvas'
            @canvas.style.display = 'none'
            document.body.appendChild @canvas

            @ctx = @canvas.getContext '2d'
            @ctx.font = "#{ @fontSize }px #{ @fontFamily }"

            if not @color?
                @color = 'black'
            if not @bgColor?
                @bgColor = 'rgba(0, 0, 0, 0)'

        drawText: (text) ->
            size = @ctx.measureText text
            @canvas.width = size.width + 5
            @canvas.height = @fontSize * 1.5

            @ctx.fillStyle = @bgColor
            @ctx.fillRect 0, 0, @canvas.width, @canvas.height

            @ctx.fillStyle = @color
            @ctx.textAlign = 'center'
            @ctx.textBaseline = 'middle'
            @ctx.font = "#{ @fontSize }px #{ @fontFamily }"
            @ctx.fillText text, @canvas.width / 2, @fontSize / 2 + 5
