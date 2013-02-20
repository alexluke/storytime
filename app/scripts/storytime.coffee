define [
    'game'
    'scenes/page'
    'scenes/gameboard'
    'timer'
], (Game, Page, Gameboard, Timer) ->
    class Storytime extends Game
        @words = [
            []
            ['sing', 'a', 'song', 'of', 'sixpence', 'pocket', 'full', 'rye']
            ['four', 'and', 'twenty', 'black', 'birds', 'baked', 'in', 'a', 'pie']
            ['when', 'the', 'pie', 'was', 'open\'d', 'birds', 'began', 'to', 'sing']
            ['was\'nt', 'that', 'a', 'dainty', 'dish', 'to', 'set', 'before', 'the', 'king']
            ['the', 'king', 'was', 'in', 'his', 'counting', 'house', 'out', 'money']
            ['the', 'queen', 'was', 'in', 'parlow', 'eating', 'bread', 'and', 'honey']
            ['the', 'maid', 'was', 'in', 'garden', 'hanging', 'out', 'clothes']
            ['there', 'came', 'a', 'little', 'black', 'bird', 'and', 'nipp\'d', 'off', 'her', 'nose']
        ]
        init: ->
            @scenes = []
            @scenes.push new Page @width, @height, 'title'

            for i in [1..8]
                @scenes.push new Page @width, @height, i, Storytime.words[i]

            @currentSceneNumber = 0
            @currentScene = @scenes[@currentSceneNumber]

        draw: ->
            @spriteBatch.begin()
            @currentScene.draw @spriteBatch
            @spriteBatch.end()

        update: (delta) ->
            @currentScene.update delta, @mouse
            if not @currentScene.running and not @transitioning
                if @currentScene.nextScene?
                    nextScene = @currentScene.nextScene
                else
                    @currentSceneNumber++
                    if @currentSceneNumber >= @scenes.length
                        @currentSceneNumber = 0
                    nextScene = @scenes[@currentSceneNumber]

                @transitioning = true
                Timer.in 1000, =>
                    @currentScene = nextScene
                    @transitioning = false
