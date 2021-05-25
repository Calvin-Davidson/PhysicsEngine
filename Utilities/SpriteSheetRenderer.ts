class SpriteSheetRenderer {
    Image : HTMLImageElement;
    imageRows : number;
    imageColumns : number;
    totalImages : number;

    private readonly spriteWidth : number;
    private readonly spriteHeight : number;

    constructor(image, image_rows, image_columns, totalImages) {
        this.Image = image;
        this.imageRows = image_rows;
        this.imageColumns = image_columns;
        this.totalImages = totalImages;

        this.spriteWidth = this.Image.width / image_rows;
        this.spriteHeight = this.Image.height / image_columns;
    }

    DrawSprite(context, x, y, spriteNumber) {
        if (this.totalImages < spriteNumber) {
            throw new Error("InvalidArgumentException, spriteNumber is to big");
        }

        let spriteRow, spriteColumn;

        spriteRow = spriteNumber % this.imageRows;
        spriteColumn = Math.floor(spriteNumber / this.imageRows);

        let sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight;
        sx = (spriteRow * this.spriteWidth);
        sy = (spriteColumn * this.spriteHeight);
        sWidth = this.spriteWidth;
        sHeight = this.spriteHeight;
        dx = x;
        dy = y;
        dWidth = this.spriteWidth;
        dHeight = this.spriteHeight;
        return context.drawImage(this.Image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }

    GetSpriteDrawData(spriteNumber) {
        let spriteRow = spriteNumber % this.imageRows;
        let spriteColumn = Math.floor(spriteNumber / this.imageRows);

        let Data = {
            sx: undefined,
            sy: undefined,
            sWidth: undefined,
            sHeight: undefined,
            dWidth: undefined,
            dHeight: undefined
        };

        Data.sx = (spriteRow * this.spriteWidth);
        Data.sy = (spriteColumn * this.spriteHeight);
        Data.sWidth = this.spriteWidth;
        Data.sHeight = this.spriteHeight;
        Data.dWidth = this.spriteWidth;
        Data.dHeight = this.spriteHeight;
        return Data;
    }
}


