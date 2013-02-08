define [
    'sprite'
], (Sprite) ->
    class Tile extends Sprite
        @colors = [
            {r: 70/255, g: 255/255, b: 61/255, a: 1.0}
            {r: 255/255, g: 121/255, b: 66/255, a: 1.0}
            {r: 144/255, g: 92/255, b: 232/255, a: 1.0}
            {r: 35/255, g: 153/255, b: 255/255, a: 1.0}
        ]
        constructor: (@word) ->
            super "tile", 0, 0
            index = Math.floor Math.random() * Tile.colors.length
            @color = Tile.colors[index]

