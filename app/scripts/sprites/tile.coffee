define [
    'sprite'
], (Sprite) ->
    class Tile extends Sprite
        constructor: (@word) ->
            super "tile", 0, 0
