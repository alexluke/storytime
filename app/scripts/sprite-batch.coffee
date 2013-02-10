define [
    'renderers/webgl-renderer'
], (WebGLRenderer) ->
    class SpriteBatch
        constructor: (renderTarget) ->
            @drawing = false
            @renderer = new WebGLRenderer renderTarget
            @drawCount = 0
            @maxDraws = 1000
            @white =
                r: 1.0
                g: 1.0
                b: 1.0
                a: 1.0

        begin: ->
            if @drawing
                throw 'Already drawing'

            @drawing = true

        draw: (texture, x, y, color) ->
            if not @currentTexture? or texture.name != @currentTexture.name or @drawCount > @maxDraws
                @flush()
                @currentTexture = texture

            if not color?
                color = @white
            @renderer.draw texture, x, y, color
            @drawCount++

        end: ->
            if not @drawing
                throw 'Not drawing'

            @drawing = false
            @flush()

        flush: ->
            if @drawCount > 0
                @renderer.flush @currentTexture
                @drawCount = 0
