define [
    'sprite'
    'font-texture'
], (Sprite, FontTexture) ->
    class PlayButton extends Sprite
        constructor: (x, y, @width) ->
            @texture = new FontTexture 'Ariel', 50, 'black'
            @texture.setText 'PLAY'
            super null, x, y
            console.log @width

        draw: (batch) ->
            batch.draw @texture, @x + @width / 2 - @texture.width / 2, @y, @color
