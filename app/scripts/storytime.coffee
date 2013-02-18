define [
    'game'
    'scenes/page'
], (Game, Page) ->
    class Storytime extends Game
        init: ->
            @page = new Page @width, @height, [
                'sing'
                'a'
                'song'
                'of'
                'sixpence'
                'pocket'
                'full'
                'rye'
            ]

        draw: ->
            @spriteBatch.begin()
            @page.draw @spriteBatch
            @spriteBatch.end()

        update: (delta) ->
            @page.update delta, @mouse
