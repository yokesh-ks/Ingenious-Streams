const https = require("node:https");
const fs = require("node:fs");
const path = require("node:path");

const M3U_URL =
	"https://raw.githubusercontent.com/yokesh-ks/iptv/master/streams/in.m3u";
const OUTPUT_FILE = path.join(__dirname, "../data/channels.json");

// Category mapping patterns
const CATEGORY_PATTERNS = {
	news: [
		"aaj tak",
		"abp",
		"india news",
		"republic",
		"times now",
		"ndtv",
		"news18",
		"zee news",
		"news24",
		"tv9",
		"dd news",
		"news",
		"cnbc",
		"et now",
	],
	entertainment: [
		"colors",
		"star plus",
		"sony",
		"zee tv",
		"&tv",
		"sab",
		"star bharat",
		"dangal",
		"rishtey",
		"shemaroo",
		"entertainment",
	],
	movies: [
		"cinema",
		"movies",
		"movie",
		"gold",
		"max",
		"pix",
		"flix",
		"bollywood",
		"pictures",
	],
	music: [
		"music",
		"9xm",
		"9x jalwa",
		"b4u",
		"mtv",
		"vh1",
		"mastii",
		"sangeet",
		"hungama",
		"zoom",
	],
	sports: [
		"sport",
		"cricket",
		"football",
		"tennis",
		"espn",
		"star sports",
		"sony ten",
		"eurosport",
	],
	kids: [
		"kids",
		"nick",
		"pogo",
		"disney",
		"cartoon",
		"discovery kids",
		"hungama tv",
		"sony yay",
	],
	devotional: [
		"aastha",
		"sanskar",
		"bhakti",
		"devotional",
		"god",
		"spiritual",
		"iskcon",
		"shubh",
	],
	regional: [
		"tamil",
		"telugu",
		"kannada",
		"malayalam",
		"marathi",
		"bangla",
		"bengali",
		"punjabi",
		"gujarati",
		"odia",
		"assamese",
		"urdu",
	],
};

// Curated featured channels (manually selected for Home screen)
const FEATURED_CHANNELS = [
	"Aaj Tak",
	"ABP News",
	"NDTV India",
	"Zee News",
	"India TV",
	"Colors HD",
	"Star Plus HD",
	"Sony TV HD",
	"Zee TV HD",
	"Zee Cinema HD",
	"Star Gold HD",
	"Sony Max HD",
	"&pictures HD",
	"9XM",
	"MTV Beats HD",
	"Star Sports 1 HD",
	"Sony Ten 1 HD",
	"Discovery Channel",
	"National Geographic",
	"Sony Sab HD",
	"Star Bharat HD",
];

function categorizeChannel(channelName) {
	const lowerName = channelName.toLowerCase();

	for (const [category, patterns] of Object.entries(CATEGORY_PATTERNS)) {
		for (const pattern of patterns) {
			if (lowerName.includes(pattern)) {
				return category;
			}
		}
	}

	return "entertainment"; // Default category
}

function extractQuality(info) {
	const qualityMatch = info.match(/\b(\d+p)\b/i);
	return qualityMatch ? qualityMatch[1] : undefined;
}

function extractLanguage(info) {
	const languages = [
		"Hindi",
		"English",
		"Tamil",
		"Telugu",
		"Kannada",
		"Malayalam",
		"Bengali",
		"Marathi",
		"Punjabi",
		"Gujarati",
	];
	for (const lang of languages) {
		if (info.toLowerCase().includes(lang.toLowerCase())) {
			return lang;
		}
	}
	return "Hindi"; // Default
}

function createChannelId(name) {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9\s]/g, "")
		.replace(/\s+/g, "-")
		.substring(0, 50);
}

function parseM3U(content) {
	const lines = content.split("\n").filter((line) => line.trim());
	const channels = [];
	const categories = new Set();

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i].trim();

		if (line.startsWith("#EXTINF:")) {
			// Parse #EXTINF line
			const nameMatch = line.match(/,(.+)$/);
			const tvgIdMatch = line.match(/tvg-id="([^"]+)"/);
			const logoMatch = line.match(/tvg-logo="([^"]+)"/);
			const _groupMatch = line.match(/group-title="([^"]+)"/);

			if (nameMatch && i + 1 < lines.length) {
				const channelName = nameMatch[1].trim();
				const streamUrl = lines[i + 1].trim();

				// Skip if URL is not valid
				if (!streamUrl.startsWith("http")) {
					continue;
				}

				const categoryId = categorizeChannel(channelName);
				categories.add(categoryId);

				const channelId = createChannelId(channelName);
				const quality = extractQuality(line);
				const language = extractLanguage(channelName);

				// Check if featured
				const isFeatured = FEATURED_CHANNELS.some(
					(fc) =>
						channelName.toLowerCase().includes(fc.toLowerCase()) ||
						fc.toLowerCase().includes(channelName.toLowerCase()),
				);

				channels.push({
					id: channelId,
					name: channelName,
					categoryId,
					streamUrl,
					quality,
					tvgId: tvgIdMatch ? tvgIdMatch[1] : undefined,
					logo: logoMatch ? logoMatch[1] : undefined,
					language,
					isFeatured,
					isActive: true,
					requiresAuth: false,
					geoBlocked: false,
					is24x7: true,
					httpReferrer: null,
					userAgent: null,
					displayOrder: isFeatured ? 1 : 2,
				});

				i++; // Skip URL line
			}
		}
	}

	return { channels, categories: Array.from(categories) };
}

function createCategoryDefinitions(categories) {
	const categoryDefs = {
		news: { name: "News", icon: "newspaper", order: 1 },
		entertainment: { name: "Entertainment", icon: "tv", order: 2 },
		movies: { name: "Movies", icon: "film", order: 3 },
		music: { name: "Music", icon: "music.note", order: 4 },
		sports: { name: "Sports", icon: "sportscourt", order: 5 },
		kids: { name: "Kids", icon: "figure.2.and.child.holdinghands", order: 6 },
		devotional: { name: "Devotional", icon: "heart.circle", order: 7 },
		regional: { name: "Regional", icon: "globe", order: 8 },
	};

	return categories
		.map((catId) => ({
			id: catId,
			...categoryDefs[catId],
		}))
		.sort((a, b) => a.order - b.order);
}

// Download M3U file
function downloadM3U(url) {
	return new Promise((resolve, reject) => {
		https
			.get(url, (res) => {
				let data = "";

				res.on("data", (chunk) => {
					data += chunk;
				});

				res.on("end", () => {
					resolve(data);
				});
			})
			.on("error", (err) => {
				reject(err);
			});
	});
}

async function main() {
	try {
		console.log("Downloading M3U file from:", M3U_URL);
		const m3uContent = await downloadM3U(M3U_URL);

		console.log("Parsing M3U content...");
		const { channels, categories } = parseM3U(m3uContent);

		console.log(
			`Found ${channels.length} channels in ${categories.length} categories`,
		);

		const categoryDefinitions = createCategoryDefinitions(categories);
		const featuredChannelIds = channels
			.filter((ch) => ch.isFeatured)
			.map((ch) => ch.id);

		console.log(`Featured channels: ${featuredChannelIds.length}`);

		const channelData = {
			version: "1.0.0",
			lastUpdated: new Date().toISOString().split("T")[0],
			categories: categoryDefinitions,
			channels,
			featured: featuredChannelIds,
		};

		// Ensure data directory exists
		const dataDir = path.dirname(OUTPUT_FILE);
		if (!fs.existsSync(dataDir)) {
			fs.mkdirSync(dataDir, { recursive: true });
		}

		// Write JSON file
		fs.writeFileSync(OUTPUT_FILE, JSON.stringify(channelData, null, 2));

		console.log(`\nSuccessfully created channels.json at: ${OUTPUT_FILE}`);
		console.log("\nSummary:");
		console.log(`- Total channels: ${channels.length}`);
		console.log(`- Featured channels: ${featuredChannelIds.length}`);
		console.log(
			`- Categories: ${categoryDefinitions.map((c) => c.name).join(", ")}`,
		);

		// Show category breakdown
		console.log("\nChannel count by category:");
		categoryDefinitions.forEach((cat) => {
			const count = channels.filter((ch) => ch.categoryId === cat.id).length;
			console.log(`  ${cat.name}: ${count}`);
		});
	} catch (error) {
		console.error("Error:", error.message);
		process.exit(1);
	}
}

main();
