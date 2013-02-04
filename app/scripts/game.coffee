define [
    'requestAnimationFrame'
    'sprite-batch'
], (requestAnimationFrame, SpriteBatch) ->
    class Game
        constructor: (renderTarget) ->
            @spriteBatch = new SpriteBatch renderTarget
            @x = renderTarget.offsetLeft
            @y = renderTarget.offsetTop
            @width = renderTarget.width
            @height = renderTarget.height

            @mouse =
                x: 0
                y: 0
                leftButton: false
                middleButton: false
                rightButton: false

            @init()

        start: ->
            document.addEventListener 'mousemove', (e) =>
                @mouse.x = e.pageX - @x
                @mouse.y = e.pageY - @y

            document.addEventListener 'mousedown', (e) =>
                e.preventDefault()
                if e.button == 0
                    @mouse.leftButton = true
                else if e.button == 1
                    @mouse.middleButton = true
                else if e.button == 2
                    @mouse.rightButton = true

            document.addEventListener 'mouseup', (e) =>
                e.preventDefault()
                if e.button == 0
                    @mouse.leftButton = false
                else if e.button == 1
                    @mouse.middleButton = false
                else if e.button == 2
                    @mouse.rightButton = false

            drawTick = =>
                @draw()
                requestAnimationFrame drawTick
            requestAnimationFrame drawTick

            @lastUpdate = (new Date).getTime()
            updateTick = =>
                now = (new Date).getTime()
                delta = (now - @lastUpdate) / 1000
                @lastUpdate = now
                @update delta, now
            setInterval updateTick, 1000 / 60

        init: ->
        draw: ->
        update: ->
