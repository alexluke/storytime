define [
    'scene'
    'sprite'
    'sprites/play-button'
], (Scene, Sprite, PlayButton) ->
    class Page extends Scene
        constructor: (width, height, pageNumber, words) ->
            super width, height
            if pageNumber == 'title'
                name = 'title'
            else
                name = "page#{ pageNumber }"
            @page = new Sprite name, 0, 0
            @button = new PlayButton 0, @height - 58, @width

        draw: (batch) ->
            @page.draw batch
            if @page.texture.name != 'title'
                @button.draw batch

        update: (delta, mouse) ->
            if mouse.leftButton
                @running = false
