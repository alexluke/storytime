define [
    'game'
    'sprite'
], (Game, Sprite) ->
    class Storytime extends Game
        init: ->
            @sprite = new Sprite 'title', 0, 0

        draw: ->
            @spriteBatch.begin()
            @sprite.draw @spriteBatch
            @spriteBatch.end()
