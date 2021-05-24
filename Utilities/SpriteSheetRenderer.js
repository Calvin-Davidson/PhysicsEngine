class SpriteSheetRenderer {
	constructor(image, image_rows, image_columns, totalImages) {
		this.Image = image;
		this.imageRows = image_rows;
		this.ImageColumns = image_columns;
		this.TotalImages = totalImages;

		this.SpriteWidth = this.Image.width / image_rows;
		this.SpriteHeight = this.Image.height / image_columns;
	}

	DrawSprite(context, x, y, spriteNumber) {
		if (this.TotalImages < spriteNumber) {
			throw new Error("InvalidArgumentException, spriteNumber is to big");
		}

		let spriteRow, spriteColumn;

		spriteRow = spriteNumber % this.imageRows;
		spriteColumn = Math.floor(spriteNumber / this.imageRows);

		let sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight;
		sx = (spriteRow * this.SpriteWidth);
		sy = (spriteColumn * this.SpriteHeight);
		sWidth = this.SpriteWidth;
		sHeight = this.SpriteHeight;
		dx = x;
		dy = y;
		dWidth = this.SpriteWidth;
		dHeight = this.SpriteHeight;
		return context.drawImage(this.Image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
	}

	GetSpriteDrawData(spriteNumber) {
		let spriteRow = spriteNumber % this.imageRows;
		let spriteColumn = Math.floor(spriteNumber / this.imageRows);

		let Data = {};
		Data.sx = (spriteRow * this.SpriteWidth);
		Data.sy = (spriteColumn * this.SpriteHeight);
		Data.sWidth = this.SpriteWidth;
		Data.sHeight = this.SpriteHeight;
		Data.dWidth = this.SpriteWidth;
		Data.dHeight = this.SpriteHeight;
		return Data;
	}
}


