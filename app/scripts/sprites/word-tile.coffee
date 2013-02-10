define [
    'sprites/tile'
    'font-texture'
], (Tile, FontTexture) ->
    class WordTile extends Tile
        constructor: (word) ->
            super()
            @id = word
            @font = new FontTexture 'Ariel', 32, 'black', "rgba(#{ @color.r*255 }, #{ @color.g*255 }, #{ @color.b*255 }, #{ @color.a })"
            @font.setText word

        draw: (batch) ->
            super batch
            if @showFace
                textPos =
                    x: @x + @width / 2 - @font.width / 2
                    y: @y + @height / 2 - @font.height / 2
                batch.draw @font, textPos.x, textPos.y

