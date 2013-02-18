define [
    'scene'
    'sprite'
], (Scene, Sprite) ->
    class Page extends Scene
        constructor: (pageNumber) ->
            super()
            if pageNumber == 'title'
                name = 'title'
            else
                name = "page#{ pageNumber }"
            @page = new Sprite name, 0, 0

        draw: (batch) ->
            @page.draw batch

        update: (delta, mouse) ->
            if mouse.leftButton
                @running = false
