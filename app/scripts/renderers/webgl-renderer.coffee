define ->
    class WebGLRenderer
        constructor: (canvas) ->
            try
                @gl = canvas.getContext('webgl') or canvas.getContext('experimental-webgl')
            catch e

            if not @gl
                throw 'Cannot init WebGL'

            @width = canvas.width
            @height = canvas.height

            @vertexData = []
            @colorData = []
            @initShaders()
            @gl.enable(@gl.BLEND)
            @gl.blendFunc @gl.SRC_ALPHA, @gl.ONE_MINUS_SRC_ALPHA
            @gl.clearColor(0.0, 0.0, 0.0, 1.0)

        initShaders: ->
            vertexShader = @_compileShader 'vertex-shader'
            fragmentShader = @_compileShader 'fragment-shader'
            if not vertexShader or not fragmentShader
                throw "Missing shaders"

            program = @gl.createProgram()
            @gl.attachShader program, vertexShader
            @gl.attachShader program, fragmentShader
            @gl.linkProgram program

            if not @gl.getProgramParameter program, @gl.LINK_STATUS
                throw "Cannot link shader program: " + @gl.getShaderInfoLog program

            shaderProgram = program
            @gl.useProgram shaderProgram
            @shaderAttributes =
                a_position: @gl.getAttribLocation shaderProgram, 'a_position'
                a_texCoord: @gl.getAttribLocation shaderProgram, 'a_texCoord'
                a_color: @gl.getAttribLocation shaderProgram, 'a_color'
                u_resolution: @gl.getUniformLocation shaderProgram, 'u_resolution'
            @gl.uniform2f @shaderAttributes.u_resolution, @width, @height

        _compileShader: (id) ->
            shaderScript = document.getElementById id
            if not shaderScript
                return null

            shader = switch shaderScript.type
                when 'x-shader/x-fragment'
                    @gl.createShader @gl.FRAGMENT_SHADER
                when 'x-shader/x-vertex'
                    @gl.createShader @gl.VERTEX_SHADER

            source = ''
            currentChild = shaderScript.firstChild

            while currentChild
                if currentChild.nodeType == currentChild.TEXT_NODE
                    source += currentChild.textContent
                currentChild = currentChild.nextSibling

            @gl.shaderSource shader, source
            @gl.compileShader shader

            if not @gl.getShaderParameter shader, @gl.COMPILE_STATUS
                throw "Cannot compile shader #{ id }: " + @gl.getShaderInfoLog shader

            return shader

        _addVertex: (xy, rgba) ->
            @vertexData.push.apply @vertexData, xy
            @colorData.push.apply @colorData, rgba

        draw: (texture, x, y, color) ->
            x1 = x
            x2 = x + texture.width
            y1 = y
            y2 = y + texture.height

            colorData = (value for key, value of color)
            @_addVertex [x1, y1], colorData
            @_addVertex [x2, y1], colorData
            @_addVertex [x1, y2], colorData
            @_addVertex [x1, y2], colorData
            @_addVertex [x2, y1], colorData
            @_addVertex [x2, y2], colorData

        flush: (texture) ->
            if @vertexData.length == 0
                return

            texCoordData = []
            st = texture.stData()
            for i in [0...@vertexData.length / st.length]
                texCoordData.push.apply texCoordData, st

            texCoordBuffer = @gl.createBuffer()
            @gl.bindBuffer @gl.ARRAY_BUFFER, texCoordBuffer
            @gl.bufferData @gl.ARRAY_BUFFER, new Float32Array(texCoordData), @gl.STATIC_DRAW
            @gl.enableVertexAttribArray @shaderAttributes.a_texCoord
            @gl.vertexAttribPointer @shaderAttributes.a_texCoord, 2, @gl.FLOAT, false, 0, 0

            tex = @gl.createTexture()
            @gl.bindTexture @gl.TEXTURE_2D, tex

            @gl.texParameteri @gl.TEXTURE_2D, @gl.TEXTURE_WRAP_S, @gl.CLAMP_TO_EDGE
            @gl.texParameteri @gl.TEXTURE_2D, @gl.TEXTURE_WRAP_T, @gl.CLAMP_TO_EDGE
            @gl.texParameteri @gl.TEXTURE_2D, @gl.TEXTURE_MIN_FILTER, @gl.NEAREST
            @gl.texParameteri @gl.TEXTURE_2D, @gl.TEXTURE_MAG_FILTER, @gl.NEAREST

            @gl.texImage2D @gl.TEXTURE_2D, 0, @gl.RGBA, @gl.RGBA, @gl.UNSIGNED_BYTE, texture.data

            buffer = @gl.createBuffer()
            @gl.bindBuffer @gl.ARRAY_BUFFER, buffer
            @gl.enableVertexAttribArray @shaderAttributes.a_position
            @gl.vertexAttribPointer @shaderAttributes.a_position, 2, @gl.FLOAT, false, 0, 0

            @gl.bufferData @gl.ARRAY_BUFFER, new Float32Array(@vertexData), @gl.STATIC_DRAW

            colorBuffer = @gl.createBuffer()
            @gl.bindBuffer @gl.ARRAY_BUFFER, colorBuffer
            @gl.enableVertexAttribArray @shaderAttributes.a_color
            @gl.vertexAttribPointer @shaderAttributes.a_color, 4, @gl.FLOAT, false, 0, 0
            @gl.bufferData @gl.ARRAY_BUFFER, new Float32Array(@colorData), @gl.STATIC_DRAW

            @gl.drawArrays @gl.TRIANGLES, 0, @vertexData.length / 2
            @vertexData.length = 0
            @colorData.length = 0

            @gl.deleteBuffer texCoordBuffer
            @gl.deleteTexture tex
            @gl.deleteBuffer buffer
            @gl.deleteBuffer colorBuffer

