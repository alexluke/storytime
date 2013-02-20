define [
    'texture'
], (Texture) ->
    class Sprite
        constructor: (textureName, @x, @y) ->
            @alive = true
            @texture ?= Texture.load textureName
            @width ?= @texture.width
            @height ?= @texture.height
            @color =
                r: 1.0
                g: 1.0
                b: 1.0
                a: 1.0

        draw: (batch) ->
            batch.draw @texture, @x, @y, @color

        update: (delta) ->

        intersects: (otherSprite) ->
            withinX = @x + @width > otherSprite.x and @x < otherSprite.x + otherSprite.width
            withinY = @y + @height > otherSprite.y and @y < otherSprite.y + otherSprite.height
            return @alive and otherSprite.alive and withinX and withinY

        contains: (x, y) ->
            withinX = x > @x and x < @x + @width
            withinY = y > @y and y < @y + @height
            return @alive and withinX and withinY
