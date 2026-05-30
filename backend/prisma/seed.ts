import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const hiraganaCards = [
	// Level 1: Vowels
	{
		level: 1,
		character: "あ",
		romaji: "a",
		reading: "あ",
		meaning: "vowel",
		tags: ["hiragana", "vowels"],
	},
	{
		level: 1,
		character: "い",
		romaji: "i",
		reading: "い",
		meaning: "vowel",
		tags: ["hiragana", "vowels"],
	},
	{
		level: 1,
		character: "う",
		romaji: "u",
		reading: "う",
		meaning: "vowel",
		tags: ["hiragana", "vowels"],
	},
	{
		level: 1,
		character: "え",
		romaji: "e",
		reading: "え",
		meaning: "vowel",
		tags: ["hiragana", "vowels"],
	},
	{
		level: 1,
		character: "お",
		romaji: "o",
		reading: "お",
		meaning: "vowel",
		tags: ["hiragana", "vowels"],
	},

	// Level 2: K-row
	{
		level: 2,
		character: "か",
		romaji: "ka",
		reading: "かー",
		meaning: "ka",
		tags: ["hiragana", "consonants"],
	},
	{
		level: 2,
		character: "き",
		romaji: "ki",
		reading: "きー",
		meaning: "ki",
		tags: ["hiragana", "consonants"],
	},
	{
		level: 2,
		character: "く",
		romaji: "ku",
		reading: "くー",
		meaning: "ku",
		tags: ["hiragana", "consonants"],
	},
	{
		level: 2,
		character: "け",
		romaji: "ke",
		reading: "けー",
		meaning: "ke",
		tags: ["hiragana", "consonants"],
	},
	{
		level: 2,
		character: "こ",
		romaji: "ko",
		reading: "こー",
		meaning: "ko",
		tags: ["hiragana", "consonants"],
	},

	// Level 3: S-row
	{
		level: 3,
		character: "さ",
		romaji: "sa",
		reading: "さー",
		meaning: "sa",
		tags: ["hiragana", "consonants"],
	},
	{
		level: 3,
		character: "し",
		romaji: "shi",
		reading: "しー",
		meaning: "shi",
		tags: ["hiragana", "consonants"],
	},
	{
		level: 3,
		character: "す",
		romaji: "su",
		reading: "すー",
		meaning: "su",
		tags: ["hiragana", "consonants"],
	},
	{
		level: 3,
		character: "せ",
		romaji: "se",
		reading: "せー",
		meaning: "se",
		tags: ["hiragana", "consonants"],
	},
	{
		level: 3,
		character: "そ",
		romaji: "so",
		reading: "そー",
		meaning: "so",
		tags: ["hiragana", "consonants"],
	},

	// Level 4: T-row and N
	{
		level: 4,
		character: "た",
		romaji: "ta",
		reading: "たー",
		meaning: "ta",
		tags: ["hiragana", "consonants"],
	},
	{
		level: 4,
		character: "ち",
		romaji: "chi",
		reading: "ちー",
		meaning: "chi",
		tags: ["hiragana", "consonants"],
	},
	{
		level: 4,
		character: "つ",
		romaji: "tsu",
		reading: "つー",
		meaning: "tsu",
		tags: ["hiragana", "consonants"],
	},
	{
		level: 4,
		character: "て",
		romaji: "te",
		reading: "てー",
		meaning: "te",
		tags: ["hiragana", "consonants"],
	},
	{
		level: 4,
		character: "と",
		romaji: "to",
		reading: "とー",
		meaning: "to",
		tags: ["hiragana", "consonants"],
	},

	// Level 5: N-row and special
	{
		level: 5,
		character: "な",
		romaji: "na",
		reading: "なー",
		meaning: "na",
		tags: ["hiragana", "consonants"],
	},
	{
		level: 5,
		character: "に",
		romaji: "ni",
		reading: "にー",
		meaning: "ni",
		tags: ["hiragana", "consonants"],
	},
	{
		level: 5,
		character: "ぬ",
		romaji: "nu",
		reading: "ぬー",
		meaning: "nu",
		tags: ["hiragana", "consonants"],
	},
	{
		level: 5,
		character: "ね",
		romaji: "ne",
		reading: "ねー",
		meaning: "ne",
		tags: ["hiragana", "consonants"],
	},
	{
		level: 5,
		character: "の",
		romaji: "no",
		reading: "のー",
		meaning: "no",
		tags: ["hiragana", "consonants"],
	},
];

const katakanaCards = [
	// Level 6: Vowels
	{
		level: 6,
		character: "ア",
		romaji: "a",
		reading: "ア",
		meaning: "vowel",
		tags: ["katakana", "vowels"],
	},
	{
		level: 6,
		character: "イ",
		romaji: "i",
		reading: "イ",
		meaning: "vowel",
		tags: ["katakana", "vowels"],
	},
	{
		level: 6,
		character: "ウ",
		romaji: "u",
		reading: "ウ",
		meaning: "vowel",
		tags: ["katakana", "vowels"],
	},
	{
		level: 6,
		character: "エ",
		romaji: "e",
		reading: "エ",
		meaning: "vowel",
		tags: ["katakana", "vowels"],
	},
	{
		level: 6,
		character: "オ",
		romaji: "o",
		reading: "オ",
		meaning: "vowel",
		tags: ["katakana", "vowels"],
	},

	// Level 7: K-row
	{
		level: 7,
		character: "カ",
		romaji: "ka",
		reading: "カー",
		meaning: "ka",
		tags: ["katakana", "consonants"],
	},
	{
		level: 7,
		character: "キ",
		romaji: "ki",
		reading: "キー",
		meaning: "ki",
		tags: ["katakana", "consonants"],
	},
	{
		level: 7,
		character: "ク",
		romaji: "ku",
		reading: "クー",
		meaning: "ku",
		tags: ["katakana", "consonants"],
	},
	{
		level: 7,
		character: "ケ",
		romaji: "ke",
		reading: "ケー",
		meaning: "ke",
		tags: ["katakana", "consonants"],
	},
	{
		level: 7,
		character: "コ",
		romaji: "ko",
		reading: "コー",
		meaning: "ko",
		tags: ["katakana", "consonants"],
	},

	// Level 8: S-row
	{
		level: 8,
		character: "サ",
		romaji: "sa",
		reading: "サー",
		meaning: "sa",
		tags: ["katakana", "consonants"],
	},
	{
		level: 8,
		character: "シ",
		romaji: "shi",
		reading: "シー",
		meaning: "shi",
		tags: ["katakana", "consonants"],
	},
	{
		level: 8,
		character: "ス",
		romaji: "su",
		reading: "スー",
		meaning: "su",
		tags: ["katakana", "consonants"],
	},
	{
		level: 8,
		character: "セ",
		romaji: "se",
		reading: "セー",
		meaning: "se",
		tags: ["katakana", "consonants"],
	},
	{
		level: 8,
		character: "ソ",
		romaji: "so",
		reading: "ソー",
		meaning: "so",
		tags: ["katakana", "consonants"],
	},

	// Level 9: T-row
	{
		level: 9,
		character: "タ",
		romaji: "ta",
		reading: "ター",
		meaning: "ta",
		tags: ["katakana", "consonants"],
	},
	{
		level: 9,
		character: "チ",
		romaji: "chi",
		reading: "チー",
		meaning: "chi",
		tags: ["katakana", "consonants"],
	},
	{
		level: 9,
		character: "ツ",
		romaji: "tsu",
		reading: "ツー",
		meaning: "tsu",
		tags: ["katakana", "consonants"],
	},
	{
		level: 9,
		character: "テ",
		romaji: "te",
		reading: "テー",
		meaning: "te",
		tags: ["katakana", "consonants"],
	},
	{
		level: 9,
		character: "ト",
		romaji: "to",
		reading: "トー",
		meaning: "to",
		tags: ["katakana", "consonants"],
	},

	// Level 10: N-row
	{
		level: 10,
		character: "ナ",
		romaji: "na",
		reading: "ナー",
		meaning: "na",
		tags: ["katakana", "consonants"],
	},
	{
		level: 10,
		character: "ニ",
		romaji: "ni",
		reading: "ニー",
		meaning: "ni",
		tags: ["katakana", "consonants"],
	},
	{
		level: 10,
		character: "ヌ",
		romaji: "nu",
		reading: "ヌー",
		meaning: "nu",
		tags: ["katakana", "consonants"],
	},
	{
		level: 10,
		character: "ネ",
		romaji: "ne",
		reading: "ネー",
		meaning: "ne",
		tags: ["katakana", "consonants"],
	},
	{
		level: 10,
		character: "ノ",
		romaji: "no",
		reading: "ノー",
		meaning: "no",
		tags: ["katakana", "consonants"],
	},
];

async function main() {
	try {
		console.log("🌱 Starting database seed...\n");

		// Seed Hiragana
		console.log("📝 Seeding Hiragana cards...");
		for (const card of hiraganaCards) {
			await prisma.card.create({
				data: {
					type: "HIRAGANA",
					level: card.level,
					character: card.character,
					romaji: card.romaji,
					reading: card.reading,
					meaning: card.meaning,
					frequency: "COMMON",
					tags: card.tags,
				},
			});
		}
		console.log(`✅ Created ${hiraganaCards.length} Hiragana cards\n`);

		// Seed Katakana
		console.log("📝 Seeding Katakana cards...");
		for (const card of katakanaCards) {
			await prisma.card.create({
				data: {
					type: "KATAKANA",
					level: card.level,
					character: card.character,
					romaji: card.romaji,
					reading: card.reading,
					meaning: card.meaning,
					frequency: "COMMON",
					tags: card.tags,
				},
			});
		}
		console.log(`✅ Created ${katakanaCards.length} Katakana cards\n`);

		const totalCards = await prisma.card.count();
		console.log(`✨ Seed complete! Total cards in database: ${totalCards}`);
	} catch (error) {
		console.error("❌ Seed failed:", error);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

main();
