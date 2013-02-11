define [
    'texture'
    'sprites/tile'
], (Texture, Tile) ->
    class ImageTile extends Tile
        @images = [
            'bird'
            'jester'
            'queen'
            'king'
        ]

        constructor: (image) ->
            super()
            @id = "pic_#{ image }"
            @image = new Texture image

        draw: (batch) ->
            super batch
            if @showFace
                pos =
                    x: @x + @width / 2 - @image.width / 2
                    y: @y + @height / 2 - @image.height / 2
                batch.draw @image, pos.x, pos.y

