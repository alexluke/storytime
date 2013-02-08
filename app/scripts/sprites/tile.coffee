define [
    'sprite'
], (Sprite) ->
    class Tile extends Sprite
        constructor: (@word) ->
            super "tile", 0, 0
            @color =
                r: Math.random()
                g: Math.random()
                b: Math.random()
                a: 1.0

