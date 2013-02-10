define [
    'game'
    'sprites/page'
], (Game, Page) ->
    class Storytime extends Game
        init: ->
            @page = new Page 1, [
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
