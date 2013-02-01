define [
    'texture'
], (Texture) ->
    class Sprite
        constructor: (textureName, @x, @y) ->
            @alive = true
            @texture = Texture.load textureName
            @width ?= @texture.width
            @height ?= @texture.height

        draw: (batch) ->
            batch.draw @texture, @x, @y

        update: (delta) ->

        intersects: (otherSprite) ->
            withinX = @x + @width > otherSprite.x and @x < otherSprite.x + otherSprite.width
            withinY = @y + @height > otherSprite.y and @y < otherSprite.y + otherSprite.height
            return @alive and otherSprite.alive and withinX and withinY
