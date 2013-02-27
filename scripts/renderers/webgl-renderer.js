(function() {

  define(function() {
    var WebGLRenderer;
    return WebGLRenderer = (function() {

      function WebGLRenderer(canvas) {
        try {
          this.gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        } catch (e) {

        }
        if (!this.gl) {
          throw 'Cannot init WebGL';
        }
        this.width = canvas.width;
        this.height = canvas.height;
        this.vertexData = [];
        this.colorData = [];
        this.initShaders();
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
      }

      WebGLRenderer.prototype.initShaders = function() {
        var fragmentShader, program, shaderProgram, vertexShader;
        vertexShader = this._compileShader('vertex-shader');
        fragmentShader = this._compileShader('fragment-shader');
        if (!vertexShader || !fragmentShader) {
          throw "Missing shaders";
        }
        program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);
        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
          throw "Cannot link shader program: " + this.gl.getShaderInfoLog(program);
        }
        shaderProgram = program;
        this.gl.useProgram(shaderProgram);
        this.shaderAttributes = {
          a_position: this.gl.getAttribLocation(shaderProgram, 'a_position'),
          a_texCoord: this.gl.getAttribLocation(shaderProgram, 'a_texCoord'),
          a_color: this.gl.getAttribLocation(shaderProgram, 'a_color'),
          u_resolution: this.gl.getUniformLocation(shaderProgram, 'u_resolution')
        };
        return this.gl.uniform2f(this.shaderAttributes.u_resolution, this.width, this.height);
      };

      WebGLRenderer.prototype._compileShader = function(id) {
        var currentChild, shader, shaderScript, source;
        shaderScript = document.getElementById(id);
        if (!shaderScript) {
          return null;
        }
        shader = (function() {
          switch (shaderScript.type) {
            case 'x-shader/x-fragment':
              return this.gl.createShader(this.gl.FRAGMENT_SHADER);
            case 'x-shader/x-vertex':
              return this.gl.createShader(this.gl.VERTEX_SHADER);
          }
        }).call(this);
        source = '';
        currentChild = shaderScript.firstChild;
        while (currentChild) {
          if (currentChild.nodeType === currentChild.TEXT_NODE) {
            source += currentChild.textContent;
          }
          currentChild = currentChild.nextSibling;
        }
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
          throw ("Cannot compile shader " + id + ": ") + this.gl.getShaderInfoLog(shader);
        }
        return shader;
      };

      WebGLRenderer.prototype._addVertex = function(xy, rgba) {
        this.vertexData.push.apply(this.vertexData, xy);
        return this.colorData.push.apply(this.colorData, rgba);
      };

      WebGLRenderer.prototype.draw = function(texture, x, y, color) {
        var colorData, key, value, x1, x2, y1, y2;
        x1 = x;
        x2 = x + texture.width;
        y1 = y;
        y2 = y + texture.height;
        colorData = (function() {
          var _results;
          _results = [];
          for (key in color) {
            value = color[key];
            _results.push(value);
          }
          return _results;
        })();
        this._addVertex([x1, y1], colorData);
        this._addVertex([x2, y1], colorData);
        this._addVertex([x1, y2], colorData);
        this._addVertex([x1, y2], colorData);
        this._addVertex([x2, y1], colorData);
        return this._addVertex([x2, y2], colorData);
      };

      WebGLRenderer.prototype.flush = function(texture) {
        var buffer, colorBuffer, i, st, tex, texCoordBuffer, texCoordData, _i, _ref;
        if (this.vertexData.length === 0) {
          return;
        }
        texCoordData = [];
        st = texture.stData();
        for (i = _i = 0, _ref = this.vertexData.length / st.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          texCoordData.push.apply(texCoordData, st);
        }
        texCoordBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, texCoordBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(texCoordData), this.gl.STATIC_DRAW);
        this.gl.enableVertexAttribArray(this.shaderAttributes.a_texCoord);
        this.gl.vertexAttribPointer(this.shaderAttributes.a_texCoord, 2, this.gl.FLOAT, false, 0, 0);
        tex = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, texture.data);
        buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.enableVertexAttribArray(this.shaderAttributes.a_position);
        this.gl.vertexAttribPointer(this.shaderAttributes.a_position, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertexData), this.gl.STATIC_DRAW);
        colorBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);
        this.gl.enableVertexAttribArray(this.shaderAttributes.a_color);
        this.gl.vertexAttribPointer(this.shaderAttributes.a_color, 4, this.gl.FLOAT, false, 0, 0);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.colorData), this.gl.STATIC_DRAW);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexData.length / 2);
        this.vertexData.length = 0;
        this.colorData.length = 0;
        this.gl.deleteBuffer(texCoordBuffer);
        this.gl.deleteTexture(tex);
        this.gl.deleteBuffer(buffer);
        return this.gl.deleteBuffer(colorBuffer);
      };

      return WebGLRenderer;

    })();
  });

}).call(this);
