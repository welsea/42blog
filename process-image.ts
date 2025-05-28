import sharp from 'sharp';
import { promises as fs, constants } from 'fs';
import path from 'path';
import { glob } from 'glob';

const IMAGE_VARIANTS = {
	thumbnail: { width: 300, height: 300, quality: 80 },
	large: { width: 1600, height: null, quality: 95 },
	// Keep original for full resolution viewing
	original: { width: null, height: null, quality: 95 }
};

async function fileExists(filePath: string): Promise<boolean> {
	try {
		await fs.access(filePath, constants.F_OK)
		return true;
	} catch {
		return false;
	}
}
async function generateResponsiveImages(filePath: string) {
	const dir = path.dirname(filePath);
	const fileName = path.basename(filePath);
	const name = path.parse(fileName).name;

	console.log('processing');
	for (const [variantName, config] of Object.entries(IMAGE_VARIANTS)) {
		const outName = `${name}-${variantName}.webp`;
		const outPath = path.join(dir, outName);

		if (await fileExists(outPath)) {
			console.log(`  ✓ ${outName} already exists, skipping`);
			continue;
		}

		console.log(`  🔄 Generating ${outName}`);
		try {
			// file doesn't exist, generate
			let pipeline = sharp(filePath);
			if (variantName === 'thumbnail') {
				pipeline.resize(config.width, config.height, {
					fit: 'cover',
					position: 'center'
				});
			} else if (variantName === 'original') {
				// Keep original size but convert to WebP
				// No resizing needed
			} else if (config.width || config.height) {
				pipeline = pipeline.resize(config.width, config.height, {
					fit: 'inside',
					withoutEnlargement: true
				});
			}
			pipeline = pipeline.webp({
				quality: config.quality,
				effort: 6 // Higher effort = better compression
			});
			await pipeline.toFile(outPath);
			console.log(`  ✅ Generated ${outName}`);
		} catch (error) {
			console.error(`  ❌ Error generating ${outName}:`, error);
		}
	}
}

async function findAllImages(): Promise<string[]> {
	const dir = 'src/posts';
	if (!(await fileExists(dir))) {
		console.log(`Posts directory ${dir} doesn't exist`);
		return [];
	}

	const imageExtensions = ['jpg', 'jpeg', 'png', 'webp'];
	const patterns = imageExtensions.map((ext) => `${dir}/**/*.${ext}`);

	let allImages: string[] = [];

	for (const pattern of patterns) {
		const files = await glob(pattern, {
			ignore: ['**/*-thumbnail.*', '**/*-large.*', '**/*-original.*', '**/*.md']
		});
		allImages = allImages.concat(files);
	}

    const images = Array.from(new Set(allImages))
	return images
}

async function main() {
	const uniqueImages = await findAllImages();
	if (uniqueImages.length === 0) {
		console.log('No images found in posts directory');
		return;
	}

	console.log(`📸 Found ${uniqueImages.length} images to process:`);
	uniqueImages.forEach((img) => console.log(`  - ${img}`));
	console.log('');

	// Process each image
	for (const imagePath of uniqueImages) {
		await generateResponsiveImages(imagePath);
		console.log(''); // Empty line for readability
	}

	console.log('✅ All images processed!');
}

main().catch(console.error);
