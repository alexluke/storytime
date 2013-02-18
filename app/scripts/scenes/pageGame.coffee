define [
    'scene'
    'sprites/word-tile'
    'sprites/image-tile'
    'timer'
], (Scene, WordTile, ImageTile, Timer) ->
    class PageGame extends Scene
        constructor: (width, height, words) ->
            super width, height
            @tiles = []
            @canClick = true
            @currentTile = false
            for word in words
                for i in [0..1]
                    @tiles.push new WordTile word
            images = ImageTile.images.slice 0
            while @tiles.length < 20
                imageIndex = Math.floor Math.random() * images.length
                image = images[imageIndex]
                images.splice imageIndex, 1
                for i in [0..1]
                    @tiles.push new ImageTile image

            @_shuffleTiles()
            padding = 22
            cols = 4
            rows = 5
            bufferX = (@width - (padding * (cols-1) + @tiles[0].width * cols)) / 2
            bufferY = (@height - (padding * (rows-1) + @tiles[0].height * rows)) / 2
            for y in [0...rows]
                for x in [0...cols]
                    index = x + y * cols
                    @tiles[index].x = bufferX + x * (@tiles[index].width + padding)
                    @tiles[index].y = bufferY + y * (@tiles[index].height + padding)


        draw: (batch) ->
            for tile in @tiles
                if tile.alive
                    tile.draw batch
            return

        update: (delta, mouse) ->
            if @canClick and not @hasClicked and mouse.leftButton
                @canClick = false
                @hasClicked = true
                for tile in @tiles
                    if tile.contains mouse.x, mouse.y
                        tile.flip()
                        if @currentTile
                            otherTile = @currentTile
                            if @currentTile.id == tile.id and @currentTile != tile
                                Timer.in 1000, =>
                                    otherTile.alive = false
                                    tile.alive = false
                                    @canClick = true
                            else
                                Timer.in 1000, =>
                                    otherTile.flip()
                                    tile.flip()
                                    @canClick = true
                            @currentTile = false
                        else
                            @currentTile = tile
                            @canClick = true
                        break

            if not mouse.leftButton
                @hasClicked = false

            if not @stillHasTiles()
                @running = false

        stillHasTiles: ->
            for tile in @tiles
                if tile.alive
                    return true

            return false


        _shuffleTiles: ->
            i = @tiles.length

            while --i
                j = Math.floor Math.random() * (i + 1)
                [@tiles[i], @tiles[j]] = [@tiles[j], @tiles[i]]
