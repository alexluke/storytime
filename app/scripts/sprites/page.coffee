define [
    'sprite'
    'sprites/tile'
], (Sprite, Tile) ->
    class Page extends Sprite
        constructor: (pageNumber, words) ->
            super "page#{ pageNumber }", 0, 0
            @tiles = []
            for word in words
                for i in [0..1]
                    @tiles.push new Tile word
            for i in [@tiles.length...20]
                @tiles.push new Tile '[pic]'

            @_shuffleTiles()
            padding = 20
            bufferX = (768 - (padding * 3 + @tiles[0].width * 4)) / 2
            bufferY = (1024 - (padding * 4 + @tiles[0].height * 5)) / 2
            for y in [0...5]
                for x in [0...4]
                    index = x + y * 4
                    @tiles[index].x = bufferX + x * (@tiles[index].width + padding)
                    @tiles[index].y = bufferY + y * (@tiles[index].height + padding)


        draw: (batch) ->
            super batch
            for tile in @tiles
                tile.draw batch
            return

        _shuffleTiles: ->
            i = @tiles.length

            while --i
                j = Math.floor Math.random() * (i + 1)
                [@tiles[i], @tiles[j]] = [@tiles[j], @tiles[i]]
