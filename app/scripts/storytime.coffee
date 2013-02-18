define [
    'game'
    'scenes/page'
    'scenes/pageGame'
    'timer'
], (Game, Page, PageGame, Timer) ->
    class Storytime extends Game
        init: ->
            @page = new Page 1
            @game = new PageGame @width, @height, [
                'sing'
                'a'
                'song'
                'of'
                'sixpence'
                'pocket'
                'full'
                'rye'
            ]

            @currentScene = @page

        draw: ->
            @spriteBatch.begin()
            @currentScene.draw @spriteBatch
            @spriteBatch.end()

        update: (delta) ->
            @currentScene.update delta, @mouse
            if @currentScene == @page and @mouse.leftButton
                Timer.in 1000, =>
                    @currentScene = @game
