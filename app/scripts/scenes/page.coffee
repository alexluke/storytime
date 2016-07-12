define [
    'scene'
    'sprite'
    'sprites/play-button'
    'scenes/gameboard'
], (Scene, Sprite, PlayButton, Gameboard) ->
    class Page extends Scene
        constructor: (width, height, @pageNumber, @words) ->
            super width, height
            if @pageNumber == 'title'
                name = 'title'
            else
                name = "page#{ @pageNumber }"
            @page = new Sprite name, 0, 0
            @button = new PlayButton 0, @height - 58, @width

        draw: (batch) ->
            @page.draw batch
            if @pageNumber != 'title'
                @button.draw batch

        update: (delta, mouse) ->
            if mouse.leftButton
                if @button.contains mouse.x, mouse.y
                    @running = false
                    @nextScene = new Gameboard @width, @height, @words
                else
                    @running = false
