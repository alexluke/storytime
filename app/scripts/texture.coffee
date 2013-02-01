define ->
    class Texture
        @textures = {}

        @load: (name) ->
            if name not in Texture.textures
                Texture.textures[name] = new Texture name
            return Texture.textures[name]

        constructor: (@name) ->
            # TODO: Spritemap
            @data = document.getElementById @name
            if not @data
                throw "Unknown texture #{ @name }"

            @width = @data.width
            @height = @data.height

        stData: ->
            return [
                0.0, 0.0
                1.0, 0.0
                0.0, 1.0
                0.0, 1.0
                1.0, 0.0
                1.0, 1.0
            ]

