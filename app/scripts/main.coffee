define [
    'storytime'
], (Storytime) ->
    window.addEventListener 'load', ->
        canvas = document.getElementById 'storytime'
        game = new Storytime canvas
        game.start()
