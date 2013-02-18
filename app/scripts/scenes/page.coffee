define [
    'scene'
    'sprite'
], (Scene, Sprite) ->
    class Page extends Scene
        constructor: (pageNumber) ->
            @page = new Sprite "page#{ pageNumber }", 0, 0

        draw: (batch) ->
            @page.draw batch

        update: (delta, mouse) ->
