// Cube.js

class Cube {
    constructor() {
        this.type = 'cube';
        this.color = [1.0, 1.0, 1.0, 1.0];
        this.matrix = new Matrix4();
        this.textureNum = -2;
        this.allverts = new Float32Array([
        0, 0, 0, 1, 1, 0, 1, 0, 0,
        0, 0, 0, 0, 1, 0, 1, 1, 0,

        // Top of cube
        0, 1, 0, 0, 1, 1, 1, 1, 1,
        0, 1, 0, 1, 1, 1, 1, 1, 0,

        // Back of cube
        0, 0, 1, 1, 0, 1, 1, 1, 1,
        0, 0, 1, 1, 1, 1, 0, 1, 1,

        // Bottom of cube
        0, 0, 0, 1, 0, 0, 1, 0, 1,
        0, 0, 0, 1, 0, 1, 0, 0, 1,

        // Left of cube
        0, 0, 0, 0, 1, 1, 0, 1, 0,
        0, 0, 0, 0, 0, 1, 0, 1, 1,

        // Right of cube
        1, 0, 0, 1, 1, 0, 1, 1, 1,
        1, 0, 0, 1, 1, 1, 1, 0, 1,
   
        ]);

        this.alluv = new Float32Array([
        0, 0, 1, 1, 1, 0,
        0, 0, 0, 1, 1, 1,

        0, 0, 0, 1, 1, 1,
        0, 0, 1, 1, 1, 0,

        0, 0, 1, 0, 1, 1,
        0, 0, 1, 1, 0, 1,

        0, 0, 1, 0, 1, 1,
        0, 0, 1, 1, 0, 1,

        0, 0, 1, 1, 0, 1,
        0, 0, 0, 1, 1, 1,

        0, 0, 1, 1, 1, 0,
        0, 0, 1, 0, 1, 1,
        ]);

        this.allnormals = new Float32Array([
        // Front face (0, 0, -1)
        0, 0, -1, 0, 0, -1, 0, 0, -1,
        0, 0, -1, 0, 0, -1, 0, 0, -1,

        // Top face (0, 1, 0)
        0, 1, 0, 0, 1, 0, 0, 1, 0,
        0, 1, 0, 0, 1, 0, 0, 1, 0,

        // Back face (0, 0, 1)
        0, 0, 1, 0, 0, 1, 0, 0, 1,
        0, 0, 1, 0, 0, 1, 0, 0, 1,

        // Bottom face (0, -1, 0)
        0, -1, 0, 0, -1, 0, 0, -1, 0,
        0, -1, 0, 0, -1, 0, 0, -1, 0,

        // Left face (-1, 0, 0)
        -1, 0, 0, -1, 0, 0, -1, 0, 0,
        -1, 0, 0, -1, 0, 0, -1, 0, 0,

        // Right face (1, 0, 0)
        1, 0, 0, 1, 0, 0, 1, 0, 0,
        1, 0, 0, 1, 0, 0, 1, 0, 0,
        ]);
        
    }

    flipNormals() {
        for (let i = 0; i < this.allnormals.length; ++i) {
            this.allnormals[i] = -Math.abs(this.allnormals[i]);
        }
    }

    render() {
        var rgba = this.color;
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        gl.uniform1i(u_whichTexture, this.textureNum);

        // Front of cube
        drawTriangle3DUVNormal(new Float32Array([0, 0, 0, 1, 1, 0, 1, 0, 0]), new Float32Array([0, 0, 1, 1, 1, 0]), new Float32Array([0, 0, -1, 0, 0, -1, 0, 0, -1]));
        drawTriangle3DUVNormal(new Float32Array([0, 0, 0, 0, 1, 0, 1, 1, 0]), new Float32Array([0, 0, 0, 1, 1, 1]), new Float32Array([0, 0, -1, 0, 0, -1, 0, 0, -1]));

        // Top of cube
        drawTriangle3DUVNormal(new Float32Array([0, 1, 0, 0, 1, 1, 1, 1, 1]), new Float32Array([0, 0, 0, 1, 1, 1]), new Float32Array([0, 1, 0, 0, 1, 0, 0, 1, 0]));
        drawTriangle3DUVNormal(new Float32Array([0, 1, 0, 1, 1, 1, 1, 1, 0]), new Float32Array([0, 0, 1, 1, 1, 0]), new Float32Array([0, 1, 0, 0, 1, 0, 0, 1, 0]));

        // Back of cube
        drawTriangle3DUVNormal(new Float32Array([0, 0, 1, 1, 0, 1, 1, 1, 1]), new Float32Array([0, 0, 1, 0, 1, 1]), new Float32Array([1, 0, 0, 1, 0, 0, 1, 0, 0]));
        drawTriangle3DUVNormal(new Float32Array([0, 0, 1, 1, 1, 1, 0, 1, 1]), new Float32Array([0, 0, 1, 1, 0, 1]), new Float32Array([1, 0, 0, 1, 0, 0, 1, 0, 0]));

        // Bottom of cube
        drawTriangle3DUVNormal(new Float32Array([0, 0, 0, 1, 0, 0, 1, 0, 1]), new Float32Array([0, 0, 1, 0, 1, 1]), new Float32Array([-1, 0, 0, -1, 0, 0, -1, 0, 0]));
        drawTriangle3DUVNormal(new Float32Array([0, 0, 0, 1, 0, 1, 0, 0, 1]), new Float32Array([0, 0, 1, 1, 0, 1]), new Float32Array([-1, 0, 0, -1, 0, 0, -1, 0, 0]));

        // Left of cube
        drawTriangle3DUVNormal(new Float32Array([0, 0, 0, 0, 1, 1, 0, 1, 0]), new Float32Array([0, 0, 1, 1, 0, 1]), new Float32Array([0, -1, 0, 0, -1, 0, 0,-1, 0]));
        drawTriangle3DUVNormal(new Float32Array([0, 0, 0, 0, 0, 1, 0, 1, 1]), new Float32Array([0, 0, 0, 1, 1, 1]), new Float32Array([0, -1, 0, 0, -1, 0, 0,-1, 0]));

        // Right of cube
        drawTriangle3DUVNormal(new Float32Array([1, 0, 0, 1, 1, 0, 1, 1, 1]), new Float32Array([0, 0, 1, 1, 1, 0]), new Float32Array([0, -1, 0, 0, -1, 0, 0, -1, 0]));
        drawTriangle3DUVNormal(new Float32Array([1, 0, 0, 1, 1, 1, 1, 0, 1]), new Float32Array([0, 0, 1, 0, 1, 1]), new Float32Array([0, -1, 0, 0, -1, 0, 0, -1, 0]));
    }

    renderFast(){
        var rgba = this.color;
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        gl.uniform1i(u_whichTexture, this.textureNum);

        drawTriangle3DUVNormal(this.allverts, this.alluv, this.allnormals);
        
    }

}