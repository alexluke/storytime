define [
    'game'
    'sprite'
], (Game, Sprite) ->
    class TestGame extends Game
        init: ->
            @sprite = new Sprite 'title', 0, 0

        draw: ->
            @spriteBatch.begin()
            @sprite.draw @spriteBatch
            @spriteBatch.end()

    window.addEventListener 'load', ->
        canvas = document.getElementById 'storytime'
        game = new TestGame canvas
        game.start()
