define [
    'game'
    'sprite'
], (Game, Sprite) ->
    class Storytime extends Game
        init: ->
            @pages = []
            @currentPage = 0
            @pages.push new Sprite 'title', 0, 0
            for i in [1..8]
                @pages.push new Sprite "page#{ i }", 0, 0

        draw: ->
            @spriteBatch.begin()
            @pages[@currentPage].draw @spriteBatch
            @spriteBatch.end()

        update: (delta) ->
            if @mouse.leftButton and not @hasClicked
                @currentPage++
                @hasClicked = true
                if @currentPage >= @pages.length
                    @currentPage = 0

            if not @mouse.leftButton
                @hasClicked = false
