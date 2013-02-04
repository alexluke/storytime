define [
    'renderers/webgl-renderer'
], (WebGLRenderer) ->
    class SpriteBatch
        constructor: (renderTarget) ->
            @drawing = false
            @renderer = new WebGLRenderer renderTarget
            @drawCount = 0
            @maxDraws = 1000

        begin: ->
            if @drawing
                throw 'Already drawing'

            @drawing = true

        draw: (texture, x, y) ->
            if @currentTexture and texture.name != @currentTexture.name or @drawCount > @maxDraws
                @flush()
                @currentTexture = texture
            @renderer.draw texture, x, y
            @drawCount++

        end: ->
            if not @drawing
                throw 'Not drawing'

            @drawing = false
            @flush()

        flush: ->
            if @drawCount > 0
                @renderer.flush()
                @drawCount = 0