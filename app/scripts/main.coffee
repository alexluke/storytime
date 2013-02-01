define [
    'sprite-batch'
    'sprite'
], (SpriteBatch, Sprite) ->
    window.addEventListener 'load', ->
        canvas = document.getElementById 'storytime'
        sprite = new Sprite 'title', 0, 0
        batch = new SpriteBatch canvas
        batch.begin()
        sprite.draw batch
        batch.end()
