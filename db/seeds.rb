# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
FolderDeck.destroy_all
Folder.destroy_all
CardStudy.destroy_all
Card.destroy_all
DeckStudy.destroy_all
Deck.destroy_all
User.destroy_all

#demo_user------------------------------
demo_user = User.create(
  username: "DemoUser",
  email: "DemoUser@qsflash.com",
  password: "DemoUser9999",
  account_type: "student",
  night_mode: false
)

#demo_user------------------------------
mrBeau = User.create(
  username: "mrBeau",
  email: "mrBeau@qsflash.com",
  password: "mrBeau",
  account_type: "student",
  night_mode: false
)

#demo_user------------------------------
steph_curry = User.create(
  username: "StephCurry",
  email: "StephCurry@qsflash.com",
  password: "StephCurry",
  account_type: "student",
  night_mode: false
)

#demo_user------------------------------
pbj = User.create(
  username: "PBJTime",
  email: "PBJTime@qsflash.com",
  password: "PBJTime",
  account_type: "student",
  night_mode: false
)

#nba deck--------------------------------
nba_deck = Deck.create(
  title: "NBA Teams",
  description: "Match the city with its team",
  visibility: "Everyone",
  editability: "Just me",
  card_count: 30,
  owner_id: steph_curry.id
)

#nba cards----------------------------
nba_card1 = Card.create(
  term: "Atlanta",
  definition: "Hawks",
  order: 1,
  deck_id: nba_deck.id
)

nba_card2 = Card.create(
  term: "Boston",
  definition: "Celtics",
  order: 2,
  deck_id: nba_deck.id
)

nba_card3 = Card.create(
  term: "Brooklyn",
  definition: "Nets",
  order: 3,
  deck_id: nba_deck.id
)

nba_card4 = Card.create(
  term: "Charlotte",
  definition: "Hornets",
  order: 4,
  deck_id: nba_deck.id
)

nba_card5 = Card.create(
  term: "Chicago",
  definition: "Bulls",
  order: 5,
  deck_id: nba_deck.id
)

nba_card6 = Card.create(
  term: "Cleveland",
  definition: "Cavaliers",
  order: 6,
  deck_id: nba_deck.id
)

nba_card7 = Card.create(
  term: "Dallas",
  definition: "Mavericks",
  order: 7,
  deck_id: nba_deck.id
)

nba_card8 = Card.create(
  term: "Denver",
  definition: "Nuggets",
  order: 8,
  deck_id: nba_deck.id
)

nba_card9 = Card.create(
  term: "Detroit",
  definition: "Pistons",
  order: 9,
  deck_id: nba_deck.id
)

nba_card10 = Card.create(
  term: "Golden State",
  definition: "Warriors",
  order: 10,
  deck_id: nba_deck.id
)

nba_card11 = Card.create(
  term: "Houston",
  definition: "Rockets",
  order: 11,
  deck_id: nba_deck.id
)

nba_card12 = Card.create(
  term: "Indiana",
  definition: "Pacers",
  order: 12,
  deck_id: nba_deck.id
)

nba_card13 = Card.create(
  term: "Los Angeles",
  definition: "Clippers",
  order: 13,
  deck_id: nba_deck.id
)

nba_card14 = Card.create(
  term: "Los Angeles",
  definition: "Lakers",
  order: 14,
  deck_id: nba_deck.id
)

nba_card15 = Card.create(
  term: "Memphis",
  definition: "Grizzlies",
  order: 15,
  deck_id: nba_deck.id
)

nba_card16 = Card.create(
  term: "Miami",
  definition: "Heat",
  order: 16,
  deck_id: nba_deck.id
)

nba_card17 = Card.create(
  term: "Milwaukee",
  definition: "Bucks",
  order: 17,
  deck_id: nba_deck.id
)

nba_card18 = Card.create(
  term: "Minnesota",
  definition: "Timberwolves",
  order: 18,
  deck_id: nba_deck.id
)

nba_card19 = Card.create(
  term: "New Orleans",
  definition: "Pelicans",
  order: 19,
  deck_id: nba_deck.id
)

nba_card20 = Card.create(
  term: "New York",
  definition: "Knicks",
  order: 20,
  deck_id: nba_deck.id
)

nba_card21 = Card.create(
  term: "Oklahoma City",
  definition: "Thunder",
  order: 21,
  deck_id: nba_deck.id
)

nba_card22 = Card.create(
  term: "Orlando",
  definition: "Magic",
  order: 22,
  deck_id: nba_deck.id
)

nba_card23 = Card.create(
  term: "Philadelphia",
  definition: "76ers",
  order: 23,
  deck_id: nba_deck.id
)

nba_card24 = Card.create(
  term: "Phoenix",
  definition: "Suns",
  order: 24,
  deck_id: nba_deck.id
)

nba_card25 = Card.create(
  term: "Portland",
  definition: "Trail Blazers",
  order: 25,
  deck_id: nba_deck.id
)

nba_card26 = Card.create(
  term: "Sacramento",
  definition: "Kings",
  order: 26,
  deck_id: nba_deck.id
)

nba_card27 = Card.create(
  term: "San Antonio",
  definition: "Spurs",
  order: 27,
  deck_id: nba_deck.id
)

nba_card28 = Card.create(
  term: "Toronto",
  definition: "Raptors",
  order: 28,
  deck_id: nba_deck.id
)
nba_card29 = Card.create(
  term: "Utah",
  definition: "Jazz",
  order: 29,
  deck_id: nba_deck.id
)
nba_card30 = Card.create(
  term: "Washington",
  definition: "Wizards",
  order: 30,
  deck_id: nba_deck.id
)

#revolutionary way deck--------------------------------
war_deck = Deck.create(
  title: "Revolutionary War",
  description: "Important events before and during the revolutionary war",
  visibility: "Everyone",
  editability: "Just me",
  card_count: 17,
  owner_id: demo_user.id
)

#revolutionary war cards-------------------------
war_card1 = Card.create(
  term: "The Stamp Act",
  definition: "(March 22, 1765) - Britain sets a tax that requires a stamp on all public documents like newspapers or legal documents. The colonists did not like having this tax placed on them. This led to unrest in the colonies and the Stamp Act Congress (October 1765).",
  order: 1,
  deck_id: war_deck.id
)

war_card2 = Card.create(
  term: "The Boston Massacre",
  definition: "(March 5, 1770 - 5 Boston colonists are shot by British troops.",
  order: 2,
  deck_id: war_deck.id
)

war_card3 = Card.create(
  term: "The Boston Tea Party",
  definition: "(Dec. 16, 1773) - Angry with a new tax on tea, some Boston colonists calling themselves the Sons of Liberty board British ships and dump crates of tea into the Boston Harbor.",
  order: 3,
  deck_id: war_deck.id
)

war_card4 = Card.create(
  term: "The First Continental Congress Meets",
  definition: "(Sept. 1774) - Representatives from the colonies get together to unite and oppose British taxes.",
  order: 4,
  deck_id: war_deck.id
)

war_card5 = Card.create(
  term: "Paul Revere's Ride",
  definition: "(April 18, 1775) - The Revolutionary War starts and Paul Revere makes his famous ride to warn the colonists that the 'British are coming'.",
  order: 5,
  deck_id: war_deck.id
)

war_card6 = Card.create(
  term: "Battle of Lexington and Concord",
  definition: "(April 19, 1775) - The actual fighting starts with the first 'shot heard around the world'. The Americans win as the British retreat.",
  order: 6,
  deck_id: war_deck.id
)

war_card7 = Card.create(
  term: "Capture of Fort Ticonderoga",
  definition: "(May 10, 1775) - The Green Mountain Boys led by Ethan Allen and Benedict Arnold capture Fort Ticonderoga from the British.",
  order: 7,
  deck_id: war_deck.id
)

war_card8 = Card.create(
  term: "Battle of Bunker Hill",
  definition: "(June 16, 1775) - Major battle where William Prescott told the American troops 'don't fire until you see the whites of their eyes'.",
  order: 8,
  deck_id: war_deck.id
)

war_card9 = Card.create(
  term: "The Declaration of Independence is Adopted",
  definition: "(July 4, 1776) - The Continental Congress agrees to Thomas Jefferson's Declaration of Independence.",
  order: 9,
  deck_id: war_deck.id
)

war_card10 = Card.create(
  term: "George Washington Crosses the Delaware",
  definition: "(Dec. 25, 1776) - George Washington and his troops cross the Delaware River on Christmas night and surprise the enemy.",
  order: 10,
  deck_id: war_deck.id
)

war_card11 = Card.create(
  term: "America Chooses a Flag",
  definition: "(June 14, 1777) - The Continental Congress adopts the 'Stars and Stripes' Flag sewn by Betsy Ross.",
  order: 11,
  deck_id: war_deck.id
)

war_card12 = Card.create(
  term: "Battles of Saratoga",
  definition: "(September 19 - October 17, 1777) - British General John Burgoyne surrenders his army to the Americans after suffering defeat at the Battles of Saratoga.",
  order: 12,
  deck_id: war_deck.id
)

war_card13 = Card.create(
  term: "Valley Forge",
  definition: "(Winter of 1777-1778) - The Continental army under George Washington spends the winter training at Valley Forge.",
  order: 13,
  deck_id: war_deck.id
)

war_card14 = Card.create(
  term: "Alliance with France",
  definition: "(Feb. 16, 1778) - France recognized the United States as an independent country with the Treaty of Alliance.",
  order: 14,
  deck_id: war_deck.id
)

war_card15 = Card.create(
  term: "Articles of Confederation",
  definition: "(March 2, 1781) - Defined the official government of the United States.",
  order: 15,
  deck_id: war_deck.id
)

war_card16 = Card.create(
  term: "Battle of Yorktown",
  definition: "(Oct. 19, 1781) - The last major battle of the American Revolutionary War. British General Cornwallis' surrender at Yorktown was the unofficial end to the war.",
  order: 16,
  deck_id: war_deck.id
)

war_card17 = Card.create(
  term: "Treaty of Paris",
  definition: "(Sept. 3, 1783) - Treaty that officially ended the war.",
  order: 17,
  deck_id: war_deck.id
)

#superpowers deck--------------------------------
superpowers_deck = Deck.create(
  title: "Superpowers",
  description: "Most Popular Marvel Characters & Their Powers",
  visibility: "Everyone",
  editability: "Just me",
  card_count: 16,
  owner_id: demo_user.id
)

#superpowers cards------------------------------
superpowers_card1 = Card.create(
  term: "Captain America",
  definition: "Strength, agility, stamina, healing ability, expert tactician, martial artist, indestructible shield.",
  order: 1,
  deck_id: superpowers_deck.id
)

superpowers_card2 = Card.create(
  term: "Black Panther",
  definition: "Enhanced senses, superhuman condition, speed, martial artist, magical resistance, Vibranium-assisted outfit.",
  order: 2,
  deck_id: superpowers_deck.id
)

superpowers_card3 = Card.create(
  term: "Wolverine",
  definition: "Reflexes, agility, senses, retractable adamantium-plated bone claws, regeneration, indestructible skeleton.",
  order: 3,
  deck_id: superpowers_deck.id
)

superpowers_card4 = Card.create(
  term: "Spider-Man",
  definition: "Strength, jumping, leaping, speed, “danger sense” precognition, custom web-shooters.",
  order: 4,
  deck_id: superpowers_deck.id
)

superpowers_card5 = Card.create(
  term: "Hulk",
  definition: "Strength, speed, stamina, durability, regeneration, nigh invulnerability, breathing underwater.",
  order: 5,
  deck_id: superpowers_deck.id
)

superpowers_card6 = Card.create(
  term: "Loki",
  definition: "Strength; stamina, speed, genius, mastery of magic and illusion, energy projection, shapeshifting.",
  order: 6,
  deck_id: superpowers_deck.id
)

superpowers_card7 = Card.create(
  term: "Captain Marvel",
  definition: "Strength, speed, stamina, resistant to most toxins, energy absorption and manipulation.",
  order: 7,
  deck_id: superpowers_deck.id
)

superpowers_card8 = Card.create(
  term: "Doctor Strange",
  definition: "A Cloak of Levitation that allows him to fly, skilled athletic and martial artist, conjurer of magical energy shield, wind & flame projection, telekinesis, hypnotism, jumps through dimensions.",
  order: 8,
  deck_id: superpowers_deck.id
)

superpowers_card9 = Card.create(
  term: "The Thing",
  definition: "Strength, durability, rock-like skin, enhanced lung capacity.",
  order: 9,
  deck_id: superpowers_deck.id
)
superpowers_card10 = Card.create(
  term: "Deadpool",
  definition: "Smart-mouth, extreme regeneration and healing power, trained assassin, immune to telepathic powers, immortal.",
  order: 10,
  deck_id: superpowers_deck.id
)
superpowers_card11 = Card.create(
  term: "Storm",
  definition: "Power over the weather, skilled thief, excellent with handguns and knives, ability to see in darkness.",
  order: 11,
  deck_id: superpowers_deck.id
)
superpowers_card12 = Card.create(
  term: "Iron Man",
  definition: "Genius-level intellect, multiple powered armor suits, ability to fly.",
  order: 12,
  deck_id: superpowers_deck.id
)
superpowers_card13 = Card.create(
  term: "Professor X",
  definition: "Telepathy, can cause paralysis, memory loss, mental illusions, create mind bolts of psychic energy.",
  order: 13,
  deck_id: superpowers_deck.id
)
superpowers_card14 = Card.create(
  term: "Thanos",
  definition: "Strength, speed, durability, energy manipulation, telepathy, powers based on the Infinity Stones.",
  order: 14,
  deck_id: superpowers_deck.id
)
superpowers_card15 = Card.create(
  term: "Thor",
  definition: "Strength, speed, stamina, durability, weather manipulation, flight (via Mjolnir), dense skin and bones with a resistance to injury.",
  order: 15,
  deck_id: superpowers_deck.id
)
superpowers_card16 = Card.create(
  term: "Ant-Man",
  definition: "Genius-level intellect, size-changing via Pym Particles, telepathic communication with insects, dimension-hopping.",
  order: 16,
  deck_id: superpowers_deck.id
)

#poker deck--------------------------------
poker_deck = Deck.create(
  title: "Poker Hands",
  description: "Royal flush",
  visibility: "Just me",
  editability: "Just me",
  card_count: 10,
  owner_id: demo_user.id
)

#poker cards-----------------------------
poker_card1 = Card.create(
  term: "Royal flush",
  definition: "A, K, Q, J, 10, all the same suit.",
  order: 1,
  deck_id: poker_deck.id
)
poker_card2 = Card.create(
  term: "Straight flush",
  definition: "Five cards in a sequence, all in the same suit.",
  order: 2,
  deck_id: poker_deck.id
)
poker_card3 = Card.create(
  term: "Four of a kind",
  definition: "All four cards of the same rank.",
  order: 3,
  deck_id: poker_deck.id
)
poker_card4 = Card.create(
  term: "Full house",
  definition: "Three of a kind with a pair.",
  order: 4,
  deck_id: poker_deck.id
)
poker_card5 = Card.create(
  term: "Flush",
  definition: "Any five cards of the same suit, but not in a sequence.",
  order: 5,
  deck_id: poker_deck.id
)
poker_card6 = Card.create(
  term: "Straight",
  definition: "Five cards in a sequence, but not of the same suit.",
  order: 6,
  deck_id: poker_deck.id
)
poker_card7 = Card.create(
  term: "Three of a kind",
  definition: "Three cards of the same rank.",
  order: 7,
  deck_id: poker_deck.id
)
poker_card8 = Card.create(
  term: "Two pair",
  definition: "Two different pairs.",
  order: 8,
  deck_id: poker_deck.id
)
poker_card9 = Card.create(
  term: "Pair",
  definition: "Two cards of the same rank.",
  order: 9,
  deck_id: poker_deck.id
)
poker_card10 = Card.create(
  term: "High Card",
  definition: "When you haven't made any hands, the highest card plays.",
  order: 10,
  deck_id: poker_deck.id
)

#tempo deck--------------------------------
tempo_deck = Deck.create(
  title: "Tempo Markings",
  description: "The speed of a song or piece of music",
  visibility: "Everyone",
  editability: "Just me",
  card_count: 21,
  owner_id: mrBeau.id
)

#tempo cards-------------------------------
tempo_card1 = Card.create(
  term: "Larghissimo",
  definition: "very, very slow (19 BPM and under)",
  order: 1,
  deck_id: tempo_deck.id
)
tempo_card2 = Card.create(
  term: "Grave",
  definition: "slow and solemn (20–40 BPM)",
  order: 2,
  deck_id: tempo_deck.id
)
tempo_card3 = Card.create(
  term: "Lento",
  definition: "slowly (40–45 BPM)",
  order: 3,
  deck_id: tempo_deck.id
)
tempo_card4 = Card.create(
  term: "Largo",
  definition: "wide (45–50 BPM)",
  order: 4,
  deck_id: tempo_deck.id
)
tempo_card5 = Card.create(
  term: "Larghetto",
  definition: "quite broadly (50–55 BPM)",
  order: 5,
  deck_id: tempo_deck.id
)
tempo_card6 = Card.create(
  term: "Adagio",
  definition: "slow and stately (55–65 BPM)",
  order: 6,
  deck_id: tempo_deck.id
)
tempo_card7 = Card.create(
  term: "Adagietto",
  definition: "quite slow (65–69 BPM)",
  order: 7,
  deck_id: tempo_deck.id
)
tempo_card8 = Card.create(
  term: "Andante moderato",
  definition: "a bit slower than andante (69–72 BPM)",
  order: 8,
  deck_id: tempo_deck.id
)
tempo_card9 = Card.create(
  term: "Andante",
  definition: "at a walking pace (73–77 BPM)",
  order: 9,
  deck_id: tempo_deck.id
)
tempo_card10 = Card.create(
  term: "Andantino",
  definition: "quite faster than andante (but some cases it means a bit slower than andante) (78–83 BPM)",
  order: 10,
  deck_id: tempo_deck.id
)
tempo_card11 = Card.create(
  term: "Marcia moderato",
  definition: "moderately, in the style of a march (83–85 BPM)",
  order: 11,
  deck_id: tempo_deck.id
)
tempo_card12 = Card.create(
  term: "Moderato",
  definition: "moderately (86–97 BPM)",
  order: 12,
  deck_id: tempo_deck.id
)
tempo_card13 = Card.create(
  term: "Allegretto",
  definition: "moderately fast (98–109 BPM)",
  order: 13,
  deck_id: tempo_deck.id
)
tempo_card14 = Card.create(
  term: "Allegro Moderato",
  definition: "moderately cheerful (116–120 bpm)",
  order: 14,
  deck_id: tempo_deck.id
)
tempo_card15 = Card.create(
  term: "Allegro",
  definition: "fast, quickly and bright (109–132 BPM)",
  order: 15,
  deck_id: tempo_deck.id
)
tempo_card16 = Card.create(
  term: "Vivace",
  definition: "lively and fast (132–140 BPM)",
  order: 16,
  deck_id: tempo_deck.id
)
tempo_card17 = Card.create(
  term: "Vivacissimo",
  definition: "very fast and lively (140–150 BPM)",
  order: 17,
  deck_id: tempo_deck.id
)
tempo_card18 = Card.create(
  term: "Allegrissimo",
  definition: "very fast (150–167 BPM)",
  order: 18,
  deck_id: tempo_deck.id
)
tempo_card19 = Card.create(
  term: "Presto",
  definition: "extremely fast (168–177 BPM)",
  order: 19,
  deck_id: tempo_deck.id
)
tempo_card20 = Card.create(
  term: "Prestissimo",
  definition: "even faster than Presto (178 BPM and over)",
  order: 20,
  deck_id: tempo_deck.id
)

tempo_card21 = Card.create(
  term: "",
  definition: "",
  order: 21,
  deck_id: tempo_deck.id
)

#spelling bee deck-------------------------------------------
spelling_deck = Deck.create(
  title: "Spelling Bee Words",
  description: "To help me winning the school spelling bee!",
  visibility: "Everyone",
  editability: "Just me",
  card_count: 8,
  owner_id: mrBeau.id
)

#spelling bee cards-----------------------------------------
spelling_card1 = Card.create(
  term: "Auxiliary",
  definition: "someone or something used in a supporting role",
  order: 1,
  deck_id: spelling_deck.id
)
spelling_card2 = Card.create(
  term: "Camouflage",
  definition: "the process of making something less obvious",
  order: 2,
  deck_id: spelling_deck.id
)
spelling_card3 = Card.create(
  term: "Entrepreneur",
  definition: "a person who takes an idea, product, or service, and introduces it to the marketplace",
  order: 3,
  deck_id: spelling_deck.id
)
spelling_card4 = Card.create(
  term: "Hootenanny",
  definition: "a casual performance by folk singers",
  order: 4,
  deck_id: spelling_deck.id
)
spelling_card5 = Card.create(
  term: "Inexorable",
  definition: "a stubborn or inflexible person",
  order: 5,
  deck_id: spelling_deck.id
)
spelling_card6 = Card.create(
  term: "Occasionally",
  definition: "sometimes",
  order: 6,
  deck_id: spelling_deck.id
)
spelling_card7 = Card.create(
  term: "Prescience",
  definition: "the power to know something before it happens",
  order: 7,
  deck_id: spelling_deck.id
)
spelling_card8 = Card.create(
  term: "Superintendent",
  definition: "a person in charge of a department or institution",
  order: 8,
  deck_id: spelling_deck.id
)

#civil war deck-------------------------------------------
civil_war_deck = Deck.create(
  title: "Causes of the Civil War",
  description: "Main reasons the Civil War Started",
  visibility: "Everyone",
  editability: "Just me",
  card_count: 4,
  owner_id: pbj.id
)

#civil war cards-----------------------------------------
civil_war_card1 = Card.create(
  term: "Economy",
  definition: "The southern economy depended on cotton and, consequently, on slave labor.",
  order: 1,
  deck_id: civil_war_deck.id
)
civil_war_card2 = Card.create(
  term: "States' Rights vs. Federal Rights",
  definition: "The southern states wanted to be able to nullify federal acts.",
  order: 2,
  deck_id: civil_war_deck.id
)
civil_war_card3 = Card.create(
  term: "Slavery",
  definition: "This is a broad category that contains two contributing factors: slave and non-slave states, and the abolitionist movement in the North.",
  order: 3,
  deck_id: civil_war_deck.id
)
civil_war_card4 = Card.create(
  term: "Election of Abraham Lincoln",
  definition: "Lincoln won the North and his opponent won the South. The country was divided.",
  order: 4,
  deck_id: civil_war_deck.id
)

#baseball deck-------------------------------------------
baseball_deck = Deck.create(
  title: "MLB Career WAR Leaders",
  description: "Baseball wins above replacement",
  visibility: "Everyone",
  editability: "Just me",
  card_count: 10,
  owner_id: pbj.id
)

#baseball cards-----------------------------------------
baseball_card1 = Card.create(
  term: "Babe Ruth",
  definition: "182.5",
  order: 1,
  deck_id: baseball_deck.id
)
baseball_card2 = Card.create(
  term: "Walter Johnson",
  definition: "164.5",
  order: 2,
  deck_id: baseball_deck.id
)
baseball_card3 = Card.create(
  term: "Cy Young",
  definition: "163.8",
  order: 3,
  deck_id: baseball_deck.id
)
baseball_card4 = Card.create(
  term: "Barry Bonds",
  definition: "162.8",
  order: 4,
  deck_id: baseball_deck.id
)
baseball_card5 = Card.create(
  term: "Willie Mays",
  definition: "156.2",
  order: 5,
  deck_id: baseball_deck.id
)
baseball_card6 = Card.create(
  term: "Ty Cobb",
  definition: "151.0",
  order: 6,
  deck_id: baseball_deck.id
)
baseball_card7 = Card.create(
  term: "Hank Aaron",
  definition: "143.1",
  order: 7,
  deck_id: baseball_deck.id
)
baseball_card8 = Card.create(
  term: "Roger Clemons",
  definition: "139.2",
  order: 8,
  deck_id: baseball_deck.id
)
baseball_card9 = Card.create(
  term: "Tris Speaker",
  definition: "134.2",
  order: 9,
  deck_id: baseball_deck.id
)
baseball_card10 = Card.create(
  term: "Honus Wagner",
  definition: "130.8",
  order: 10,
  deck_id: baseball_deck.id
)

#deck studies--------------------------------------------------
du_deck_study1 = DeckStudy.create(
  progress: 28,
  rating: nil,
  deck_id: nba_deck.id,
  studier_id: demo_user.id
)

du_deck_study2 = DeckStudy.create(
  progress: 5,
  rating: nil,
  deck_id: war_deck.id,
  studier_id: demo_user.id
)

du_deck_study3 = DeckStudy.create(
  progress: 1,
  rating: nil,
  deck_id: superpowers_deck.id,
  studier_id: demo_user.id
)

du_deck_study4 = DeckStudy.create(
  progress: 1,
  rating: nil,
  deck_id: poker_deck.id,
  studier_id: demo_user.id
)

du_deck_study5 = DeckStudy.create(
  progress: 9,
  rating: 4,
  deck_id: tempo_deck.id,
  studier_id: demo_user.id
)

du_deck_study6 = DeckStudy.create(
  progress: 1,
  rating: nil,
  deck_id: spelling_deck.id,
  studier_id: demo_user.id
)

mb_deck_study1 = DeckStudy.create(
  progress: 1,
  rating: nil,
  deck_id: tempo_deck.id,
  studier_id: mrBeau.id
)

mb_deck_study2 = DeckStudy.create(
  progress: 1,
  rating: nil,
  deck_id: spelling_deck.id,
  studier_id: mrBeau.id
)

mb_deck_study3 = DeckStudy.create(
  progress: 23,
  rating: 4,
  deck_id: nba_deck.id,
  studier_id: mrBeau.id
)

mb_deck_study4 = DeckStudy.create(
  progress: 1,
  rating: 4,
  deck_id: baseball_deck.id,
  studier_id: mrBeau.id
)

mb_deck_study5 = DeckStudy.create(
  progress: 1,
  rating: 5,
  deck_id: war_deck.id,
  studier_id: mrBeau.id
)

sc_deck_study1 = DeckStudy.create(
  progress: 10,
  rating: nil,
  deck_id: nba_deck.id,
  studier_id: steph_curry.id
)

sc_deck_study2 = DeckStudy.create(
  progress: 1,
  rating: nil,
  deck_id: superpowers_deck.id,
  studier_id: steph_curry.id
)

sc_deck_study3 = DeckStudy.create(
  progress: 1,
  rating: 5,
  deck_id: baseball_deck.id,
  studier_id: steph_curry.id
)

pbj_deck_study1 = DeckStudy.create(
  progress: 1,
  rating: nil,
  deck_id: civil_war_deck.id,
  studier_id: pbj.id
)
pbj_deck_study2 = DeckStudy.create(
  progress: 1,
  rating: nil,
  deck_id: baseball_deck.id,
  studier_id: pbj.id
)

#folders-------------------------------------------

du_folder1 = Folder.create(
  title: "Schoolwork",
  description: "Decks for my classes",
  owner_id: demo_user.id,
  deck_count: 0
)

du_folder2 = Folder.create(
  title: "Fun and Games",
  description: "Just for fun",
  owner_id: demo_user.id,
  deck_count: 0
)

sc_folder1 = Folder.create(
  title: "Sports",
  description: "Only sports decks allowed",
  owner_id: steph_curry.id,
  deck_count: 0
)

#folder decks--------------------------------------

du_folder1_deck1 = FolderDeck.create(
  deck_id: spelling_deck.id,
  folder_id: du_folder1.id
)
du_folder1_deck2 = FolderDeck.create(
  deck_id: tempo_deck.id,
  folder_id: du_folder1.id
)
du_folder1_deck3 = FolderDeck.create(
  deck_id: war_deck.id,
  folder_id: du_folder1.id
)
du_folder2_deck1 = FolderDeck.create(
  deck_id: poker_deck.id,
  folder_id: du_folder2.id
)
du_folder2_deck2 = FolderDeck.create(
  deck_id: superpowers_deck.id,
  folder_id: du_folder2.id
)
du_folder2_deck3 = FolderDeck.create(
  deck_id: nba_deck.id,
  folder_id: du_folder2.id
)
du_folder2_deck4 = FolderDeck.create(
  deck_id: tempo_deck.id,
  folder_id: du_folder2.id
)

sc_folder1_deck1 = FolderDeck.create(
  deck_id: baseball_deck.id,
  folder_id: sc_folder1.id
)
sc_folder1_deck2 = FolderDeck.create(
  deck_id: nba_deck.id,
  folder_id: sc_folder1.id
)

#card studies--------------------------------------
nba_du_cs1 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card1.id,
  studier_id: demo_user.id,
  deck_id: nba_deck.id
)
nba_du_cs2 = CardStudy.create(
  starred: true,
  correctness_count: -3,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card2.id,
  studier_id: demo_user.id,
  deck_id: nba_deck.id
)
nba_du_cs3 = CardStudy.create(
  starred: false,
  correctness_count: 2,
  learn_count: 2,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card3.id,
  studier_id: demo_user.id,
  deck_id: nba_deck.id
)
nba_du_cs4 = CardStudy.create(
  starred: false,
  correctness_count: 3,
  learn_count: 1,
  write_count: 0,
  spell_count: 2,
  test_count: 0,
  card_id: nba_card4.id,
  studier_id: demo_user.id,
  deck_id: nba_deck.id
)
nba_du_cs5 = CardStudy.create(
  starred: false,
  correctness_count: -1,
  learn_count: 1,
  write_count: 0,
  spell_count: 1,
  test_count: 0,
  card_id: nba_card5.id,
  studier_id: demo_user.id,
  deck_id: nba_deck.id
)
nba_du_cs6 = CardStudy.create(
  starred: false,
  correctness_count: -1,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card6.id,
  studier_id: demo_user.id,
  deck_id: nba_deck.id
)
nba_du_cs7 = CardStudy.create(
  starred: false,
  correctness_count: 1,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card7.id,
  studier_id: demo_user.id,
  deck_id: nba_deck.id
)
nba_du_cs8 = CardStudy.create(
  starred: false,
  correctness_count: 3,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card8.id,
  studier_id: demo_user.id,
  deck_id: nba_deck.id
)
nba_du_cs9 = CardStudy.create(
  starred: false,
  correctness_count: -2,
  learn_count: 0,
  write_count: 0,
  spell_count: 1,
  test_count: 0,
  card_id: nba_card9.id,
  studier_id: demo_user.id,
  deck_id: nba_deck.id
)
nba_du_cs10 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 2,
  write_count: 0,
  spell_count: 2,
  test_count: 0,
  card_id: nba_card10.id,
  studier_id: demo_user.id,
  deck_id: nba_deck.id
)
nba_du_cs11 = CardStudy.create(
  starred: true,
  correctness_count: -3,
  learn_count: 1,
  write_count: 0,
  spell_count: 1,
  test_count: 0,
  card_id: nba_card11.id,
  studier_id: demo_user.id,
  deck_id: nba_deck.id
)
nba_du_cs12 = CardStudy.create(
  starred: true,
  correctness_count: -4,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card12.id,
  studier_id: demo_user.id,
  deck_id: nba_deck.id
)
nba_du_cs13 = CardStudy.create(
  starred: false,
  correctness_count: 1,
  learn_count: 1,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card13.id,
  studier_id: demo_user.id,
  deck_id: nba_deck.id
)
nba_du_cs14 = CardStudy.create(
  starred: false,
  correctness_count: 5,
  learn_count: 2,
  write_count: 0,
  spell_count: 2,
  test_count: 0,
  card_id: nba_card14.id,
  studier_id: demo_user.id,
  deck_id: nba_deck.id
)
nba_du_cs15 = CardStudy.create(
  starred: false,
  correctness_count: -2,
  learn_count: 1,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card15.id,
  studier_id: demo_user.id,
  deck_id: nba_deck.id
)
nba_du_cs16 = CardStudy.create(
  starred: true,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 1,
  test_count: 0,
  card_id: nba_card16.id,
  studier_id: demo_user.id,
  deck_id: nba_deck.id
)
nba_du_cs17 = CardStudy.create(
  starred: false,
  correctness_count: 3,
  learn_count: 2,
  write_count: 0,
  spell_count: 1,
  test_count: 0,
  card_id: nba_card17.id,
  studier_id: demo_user.id,
  deck_id: nba_deck.id
)
nba_du_cs18 = CardStudy.create(
  starred: false,
  correctness_count: 2,
  learn_count: 1,
  write_count: 0,
  spell_count: 1,
  test_count: 0,
  card_id: nba_card18.id,
  studier_id: demo_user.id,
  deck_id: nba_deck.id
)
nba_du_cs19 = CardStudy.create(
  starred: true,
  correctness_count: 4,
  learn_count: 2,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card19.id,
  studier_id: demo_user.id,
  deck_id: nba_deck.id
)
nba_du_cs20 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 2,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card20.id,
  studier_id: demo_user.id,
  deck_id: nba_deck.id
)
nba_du_cs21 = CardStudy.create(
  starred: true,
  correctness_count: -2,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card21.id,
  studier_id: demo_user.id,
  deck_id: nba_deck.id
)

nba_du_cs22 = CardStudy.create(
  starred: true,
  correctness_count: 1,
  learn_count: 2,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card22.id,
  studier_id: demo_user.id,
  deck_id: nba_deck.id
)
nba_du_cs23 = CardStudy.create(
  starred: true,
  correctness_count: 6,
  learn_count: 2,
  write_count: 0,
  spell_count: 2,
  test_count: 0,
  card_id: nba_card23.id,
  studier_id: demo_user.id,
  deck_id: nba_deck.id
)
nba_du_cs24 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card24.id,
  studier_id: demo_user.id,
  deck_id: nba_deck.id
)
nba_du_cs25 = CardStudy.create(
  starred: false,
  correctness_count: -3,
  learn_count: 0,
  write_count: 0,
  spell_count: 1,
  test_count: 0,
  card_id: nba_card25.id,
  studier_id: demo_user.id,
  deck_id: nba_deck.id
)
nba_du_cs26 = CardStudy.create(
  starred: true,
  correctness_count: -4,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card26.id,
  studier_id: demo_user.id,
  deck_id: nba_deck.id
)
nba_du_cs27 = CardStudy.create(
  starred: false,
  correctness_count: 4,
  learn_count: 2,
  write_count: 0,
  spell_count: 2,
  test_count: 0,
  card_id: nba_card27.id,
  studier_id: demo_user.id,
  deck_id: nba_deck.id
)
nba_du_cs28 = CardStudy.create(
  starred: true,
  correctness_count: -6,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card28.id,
  studier_id: demo_user.id,
  deck_id: nba_deck.id
)
nba_du_cs29 = CardStudy.create(
  starred: false,
  correctness_count: -5,
  learn_count: 0,
  write_count: 0,
  spell_count: 1,
  test_count: 0,
  card_id: nba_card29.id,
  studier_id: demo_user.id,
  deck_id: nba_deck.id
)
nba_du_cs30 = CardStudy.create(
  starred: false,
  correctness_count: 1,
  learn_count: 1,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card30.id,
  studier_id: demo_user.id,
  deck_id: nba_deck.id
)
#beau nba-----------------
nba_beau_cs1 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card1.id,
  studier_id: mrBeau.id,
  deck_id: nba_deck.id
)
nba_beau_cs2 = CardStudy.create(
  starred: true,
  correctness_count: -10,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card2.id,
  studier_id: mrBeau.id,
  deck_id: nba_deck.id
)
nba_beau_cs3 = CardStudy.create(
  starred: false,
  correctness_count: 1,
  learn_count: 1,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card3.id,
  studier_id: mrBeau.id,
  deck_id: nba_deck.id
)
nba_beau_cs4 = CardStudy.create(
  starred: false,
  correctness_count: 3,
  learn_count: 1,
  write_count: 0,
  spell_count: 1,
  test_count: 0,
  card_id: nba_card4.id,
  studier_id: mrBeau.id,
  deck_id: nba_deck.id
)
nba_beau_cs5 = CardStudy.create(
  starred: false,
  correctness_count: -1,
  learn_count: 1,
  write_count: 0,
  spell_count: 1,
  test_count: 0,
  card_id: nba_card5.id,
  studier_id: mrBeau.id,
  deck_id: nba_deck.id
)
nba_beau_cs6 = CardStudy.create(
  starred: false,
  correctness_count: -1,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card6.id,
  studier_id: mrBeau.id,
  deck_id: nba_deck.id
)
nba_beau_cs7 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card7.id,
  studier_id: mrBeau.id,
  deck_id: nba_deck.id
)
nba_beau_cs8 = CardStudy.create(
  starred: false,
  correctness_count: 3,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card8.id,
  studier_id: mrBeau.id,
  deck_id: nba_deck.id
)
nba_beau_cs9 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 1,
  test_count: 0,
  card_id: nba_card9.id,
  studier_id: mrBeau.id,
  deck_id: nba_deck.id
)
nba_beau_cs10 = CardStudy.create(
  starred: false,
  correctness_count: -1,
  learn_count: 1,
  write_count: 0,
  spell_count: 1,
  test_count: 0,
  card_id: nba_card10.id,
  studier_id: mrBeau.id,
  deck_id: nba_deck.id
)
nba_beau_cs11 = CardStudy.create(
  starred: false,
  correctness_count: -3,
  learn_count: 1,
  write_count: 0,
  spell_count: 1,
  test_count: 0,
  card_id: nba_card11.id,
  studier_id: mrBeau.id,
  deck_id: nba_deck.id
)
nba_beau_cs12 = CardStudy.create(
  starred: false,
  correctness_count: -4,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card12.id,
  studier_id: mrBeau.id,
  deck_id: nba_deck.id
)
nba_beau_cs13 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 1,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card13.id,
  studier_id: mrBeau.id,
  deck_id: nba_deck.id
)
nba_beau_cs14 = CardStudy.create(
  starred: false,
  correctness_count: 5,
  learn_count: 2,
  write_count: 0,
  spell_count: 2,
  test_count: 0,
  card_id: nba_card14.id,
  studier_id: mrBeau.id,
  deck_id: nba_deck.id
)
nba_beau_cs15 = CardStudy.create(
  starred: false,
  correctness_count: -2,
  learn_count: 1,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card15.id,
  studier_id: mrBeau.id,
  deck_id: nba_deck.id
)
nba_beau_cs16 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 1,
  test_count: 0,
  card_id: nba_card16.id,
  studier_id: mrBeau.id,
  deck_id: nba_deck.id
)
nba_beau_cs17 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 2,
  write_count: 0,
  spell_count: 1,
  test_count: 0,
  card_id: nba_card17.id,
  studier_id: mrBeau.id,
  deck_id: nba_deck.id
)
nba_beau_cs18 = CardStudy.create(
  starred: false,
  correctness_count: 3,
  learn_count: 0,
  write_count: 0,
  spell_count: 1,
  test_count: 0,
  card_id: nba_card18.id,
  studier_id: mrBeau.id,
  deck_id: nba_deck.id
)
nba_beau_cs19 = CardStudy.create(
  starred: false,
  correctness_count: 4,
  learn_count: 2,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card19.id,
  studier_id: mrBeau.id,
  deck_id: nba_deck.id
)
nba_beau_cs20 = CardStudy.create(
  starred: false,
  correctness_count: 1,
  learn_count: 2,
  write_count: 0,
  spell_count: 2,
  test_count: 0,
  card_id: nba_card20.id,
  studier_id: mrBeau.id,
  deck_id: nba_deck.id
)
nba_beau_cs21 = CardStudy.create(
  starred: false,
  correctness_count: -2,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card21.id,
  studier_id: mrBeau.id,
  deck_id: nba_deck.id
)

nba_beau_cs22 = CardStudy.create(
  starred: false,
  correctness_count: 1,
  learn_count: 2,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card22.id,
  studier_id: mrBeau.id,
  deck_id: nba_deck.id
)
nba_beau_cs23 = CardStudy.create(
  starred: false,
  correctness_count: 7,
  learn_count: 2,
  write_count: 0,
  spell_count: 2,
  test_count: 0,
  card_id: nba_card23.id,
  studier_id: mrBeau.id,
  deck_id: nba_deck.id
)
nba_beau_cs24 = CardStudy.create(
  starred: false,
  correctness_count: -4,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card24.id,
  studier_id: mrBeau.id,
  deck_id: nba_deck.id
)
nba_beau_cs25 = CardStudy.create(
  starred: false,
  correctness_count: -3,
  learn_count: 0,
  write_count: 0,
  spell_count: 1,
  test_count: 0,
  card_id: nba_card25.id,
  studier_id: mrBeau.id,
  deck_id: nba_deck.id
)
nba_beau_cs26 = CardStudy.create(
  starred: false,
  correctness_count: 4,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card26.id,
  studier_id: mrBeau.id,
  deck_id: nba_deck.id
)
nba_beau_cs27 = CardStudy.create(
  starred: false,
  correctness_count: 4,
  learn_count: 1,
  write_count: 0,
  spell_count: 2,
  test_count: 0,
  card_id: nba_card27.id,
  studier_id: mrBeau.id,
  deck_id: nba_deck.id
)
nba_beau_cs28 = CardStudy.create(
  starred: false,
  correctness_count: -3,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card28.id,
  studier_id: mrBeau.id,
  deck_id: nba_deck.id
)
nba_beau_cs29 = CardStudy.create(
  starred: false,
  correctness_count: -5,
  learn_count: 0,
  write_count: 0,
  spell_count: 1,
  test_count: 0,
  card_id: nba_card29.id,
  studier_id: mrBeau.id,
  deck_id: nba_deck.id
)
nba_beau_cs30 = CardStudy.create(
  starred: false,
  correctness_count: 1,
  learn_count: 1,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card30.id,
  studier_id: mrBeau.id,
  deck_id: nba_deck.id
)

#sc nba-----------------
nba_sc_cs1 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card1.id,
  studier_id: steph_curry.id,
  deck_id: nba_deck.id
)
nba_sc_cs2 = CardStudy.create(
  starred: true,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card2.id,
  studier_id: steph_curry.id,
  deck_id: nba_deck.id
)
nba_sc_cs3 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card3.id,
  studier_id: steph_curry.id,
  deck_id: nba_deck.id
)
nba_sc_cs4 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card4.id,
  studier_id: steph_curry.id,
  deck_id: nba_deck.id
)
nba_sc_cs5 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card5.id,
  studier_id: steph_curry.id,
  deck_id: nba_deck.id
)
nba_sc_cs6 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card6.id,
  studier_id: steph_curry.id,
  deck_id: nba_deck.id
)
nba_sc_cs7 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card7.id,
  studier_id: steph_curry.id,
  deck_id: nba_deck.id
)
nba_sc_cs8 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card8.id,
  studier_id: steph_curry.id,
  deck_id: nba_deck.id
)
nba_sc_cs9 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card9.id,
  studier_id: steph_curry.id,
  deck_id: nba_deck.id
)
nba_sc_cs10 = CardStudy.create(
  starred: false,
  correctness_count: 30,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card10.id,
  studier_id: steph_curry.id,
  deck_id: nba_deck.id
)
nba_sc_cs11 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card11.id,
  studier_id: steph_curry.id,
  deck_id: nba_deck.id
)
nba_sc_cs12 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card12.id,
  studier_id: steph_curry.id,
  deck_id: nba_deck.id
)
nba_sc_cs13 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card13.id,
  studier_id: steph_curry.id,
  deck_id: nba_deck.id
)
nba_sc_cs14 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card14.id,
  studier_id: steph_curry.id,
  deck_id: nba_deck.id
)
nba_sc_cs15 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card15.id,
  studier_id: steph_curry.id,
  deck_id: nba_deck.id
)
nba_sc_cs16 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card16.id,
  studier_id: steph_curry.id,
  deck_id: nba_deck.id
)
nba_sc_cs17 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card17.id,
  studier_id: steph_curry.id,
  deck_id: nba_deck.id
)
nba_sc_cs18 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card18.id,
  studier_id: steph_curry.id,
  deck_id: nba_deck.id
)
nba_sc_cs19 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card19.id,
  studier_id: steph_curry.id,
  deck_id: nba_deck.id
)
nba_sc_cs20 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card20.id,
  studier_id: steph_curry.id,
  deck_id: nba_deck.id
)
nba_sc_cs21 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card21.id,
  studier_id: steph_curry.id,
  deck_id: nba_deck.id
)

nba_sc_cs22 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card22.id,
  studier_id: steph_curry.id,
  deck_id: nba_deck.id
)
nba_sc_cs23 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card23.id,
  studier_id: steph_curry.id,
  deck_id: nba_deck.id
)
nba_sc_cs24 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card24.id,
  studier_id: steph_curry.id,
  deck_id: nba_deck.id
)
nba_sc_cs25 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card25.id,
  studier_id: steph_curry.id,
  deck_id: nba_deck.id
)
nba_sc_cs26 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card26.id,
  studier_id: steph_curry.id,
  deck_id: nba_deck.id
)
nba_sc_cs27 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card27.id,
  studier_id: steph_curry.id,
  deck_id: nba_deck.id
)
nba_sc_cs28 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card28.id,
  studier_id: steph_curry.id,
  deck_id: nba_deck.id
)
nba_sc_cs29 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card29.id,
  studier_id: steph_curry.id,
  deck_id: nba_deck.id
)
nba_sc_cs30 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: nba_card30.id,
  studier_id: steph_curry.id,
  deck_id: nba_deck.id
)

#war card studies------------------------------
war_du_cs1 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: war_card1.id,
  studier_id: demo_user.id,
  deck_id: war_deck.id
)
war_du_cs2 = CardStudy.create(
  starred: true,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: war_card2.id,
  studier_id: demo_user.id,
  deck_id: war_deck.id
)
war_du_cs3 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: war_card3.id,
  studier_id: demo_user.id,
  deck_id: war_deck.id
)
war_du_cs4 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: war_card4.id,
  studier_id: demo_user.id,
  deck_id: war_deck.id
)
war_du_cs5 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: war_card5.id,
  studier_id: demo_user.id,
  deck_id: war_deck.id
)
war_du_cs6 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: war_card6.id,
  studier_id: demo_user.id,
  deck_id: war_deck.id
)
war_du_cs7 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: war_card7.id,
  studier_id: demo_user.id,
  deck_id: war_deck.id
)
war_du_cs8 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: war_card8.id,
  studier_id: demo_user.id,
  deck_id: war_deck.id
)
war_du_cs9 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: war_card9.id,
  studier_id: demo_user.id,
  deck_id: war_deck.id
)
war_du_cs10 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: war_card10.id,
  studier_id: demo_user.id,
  deck_id: war_deck.id
)
war_du_cs11 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: war_card11.id,
  studier_id: demo_user.id,
  deck_id: war_deck.id
)
war_du_cs12 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: war_card12.id,
  studier_id: demo_user.id,
  deck_id: war_deck.id
)
war_du_cs13 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: war_card13.id,
  studier_id: demo_user.id,
  deck_id: war_deck.id
)
war_du_cs14 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: war_card14.id,
  studier_id: demo_user.id,
  deck_id: war_deck.id
)
war_du_cs15 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: war_card15.id,
  studier_id: demo_user.id,
  deck_id: war_deck.id
)
war_du_cs16 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: war_card16.id,
  studier_id: demo_user.id,
  deck_id: war_deck.id
)

war_du_cs17 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: war_card17.id,
  studier_id: demo_user.id,
  deck_id: war_deck.id
)

#superpowers card studies------------------------------
superpowers_du_cs1 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: superpowers_card1.id,
  studier_id: demo_user.id,
  deck_id: superpowers_deck.id
)
superpowers_du_cs2 = CardStudy.create(
  starred: true,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: superpowers_card2.id,
  studier_id: demo_user.id,
  deck_id: superpowers_deck.id
)
superpowers_du_cs3 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: superpowers_card3.id,
  studier_id: demo_user.id,
  deck_id: superpowers_deck.id
)
superpowers_du_cs4 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: superpowers_card4.id,
  studier_id: demo_user.id,
  deck_id: superpowers_deck.id
)
superpowers_du_cs5 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: superpowers_card5.id,
  studier_id: demo_user.id,
  deck_id: superpowers_deck.id
)
superpowers_du_cs6 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: superpowers_card6.id,
  studier_id: demo_user.id,
  deck_id: superpowers_deck.id
)
superpowers_du_cs7 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: superpowers_card7.id,
  studier_id: demo_user.id,
  deck_id: superpowers_deck.id
)
superpowers_du_cs8 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: superpowers_card8.id,
  studier_id: demo_user.id,
  deck_id: superpowers_deck.id
)
superpowers_du_cs9 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: superpowers_card9.id,
  studier_id: demo_user.id,
  deck_id: superpowers_deck.id
)
superpowers_du_cs10 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: superpowers_card10.id,
  studier_id: demo_user.id,
  deck_id: superpowers_deck.id
)
superpowers_du_cs11 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: superpowers_card11.id,
  studier_id: demo_user.id,
  deck_id: superpowers_deck.id
)
superpowers_du_cs12 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: superpowers_card12.id,
  studier_id: demo_user.id,
  deck_id: superpowers_deck.id
)
superpowers_du_cs13 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: superpowers_card13.id,
  studier_id: demo_user.id,
  deck_id: superpowers_deck.id
)
superpowers_du_cs14 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: superpowers_card14.id,
  studier_id: demo_user.id,
  deck_id: superpowers_deck.id
)
superpowers_du_cs15 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: superpowers_card15.id,
  studier_id: demo_user.id,
  deck_id: superpowers_deck.id
)
superpowers_du_cs16 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: superpowers_card16.id,
  studier_id: demo_user.id,
  deck_id: superpowers_deck.id
)

superpowers_du_cs1 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: superpowers_card1.id,
  studier_id: steph_curry.id,
  deck_id: superpowers_deck.id
)
superpowers_du_cs2 = CardStudy.create(
  starred: true,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: superpowers_card2.id,
  studier_id: steph_curry.id,
  deck_id: superpowers_deck.id
)
superpowers_du_cs3 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: superpowers_card3.id,
  studier_id: steph_curry.id,
  deck_id: superpowers_deck.id
)
superpowers_du_cs4 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: superpowers_card4.id,
  studier_id: steph_curry.id,
  deck_id: superpowers_deck.id
)
superpowers_du_cs5 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: superpowers_card5.id,
  studier_id: steph_curry.id,
  deck_id: superpowers_deck.id
)
superpowers_du_cs6 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: superpowers_card6.id,
  studier_id: steph_curry.id,
  deck_id: superpowers_deck.id
)
superpowers_du_cs7 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: superpowers_card7.id,
  studier_id: steph_curry.id,
  deck_id: superpowers_deck.id
)
superpowers_du_cs8 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: superpowers_card8.id,
  studier_id: steph_curry.id,
  deck_id: superpowers_deck.id
)
superpowers_du_cs9 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: superpowers_card9.id,
  studier_id: steph_curry.id,
  deck_id: superpowers_deck.id
)
superpowers_du_cs10 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: superpowers_card10.id,
  studier_id: steph_curry.id,
  deck_id: superpowers_deck.id
)
superpowers_du_cs11 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: superpowers_card11.id,
  studier_id: steph_curry.id,
  deck_id: superpowers_deck.id
)
superpowers_du_cs12 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: superpowers_card12.id,
  studier_id: steph_curry.id,
  deck_id: superpowers_deck.id
)
superpowers_du_cs13 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: superpowers_card13.id,
  studier_id: steph_curry.id,
  deck_id: superpowers_deck.id
)
superpowers_du_cs14 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: superpowers_card14.id,
  studier_id: steph_curry.id,
  deck_id: superpowers_deck.id
)
superpowers_du_cs15 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: superpowers_card15.id,
  studier_id: steph_curry.id,
  deck_id: superpowers_deck.id
)
superpowers_du_cs16 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: superpowers_card16.id,
  studier_id: steph_curry.id,
  deck_id: superpowers_deck.id
)

#poker card studies----------------------------------
poker_du_cs1 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: poker_card1.id,
  studier_id: demo_user.id,
  deck_id: poker_deck.id
)
poker_du_cs2 = CardStudy.create(
  starred: true,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: poker_card2.id,
  studier_id: demo_user.id,
  deck_id: poker_deck.id
)
poker_du_cs3 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: poker_card3.id,
  studier_id: demo_user.id,
  deck_id: poker_deck.id
)
poker_du_cs4 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: poker_card4.id,
  studier_id: demo_user.id,
  deck_id: poker_deck.id
)
poker_du_cs5 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: poker_card5.id,
  studier_id: demo_user.id,
  deck_id: poker_deck.id
)
poker_du_cs6 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: poker_card6.id,
  studier_id: demo_user.id,
  deck_id: poker_deck.id
)
poker_du_cs7 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: poker_card7.id,
  studier_id: demo_user.id,
  deck_id: poker_deck.id
)
poker_du_cs8 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: poker_card8.id,
  studier_id: demo_user.id,
  deck_id: poker_deck.id
)
poker_du_cs9 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: poker_card9.id,
  studier_id: demo_user.id,
  deck_id: poker_deck.id
)
poker_du_cs10 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: poker_card10.id,
  studier_id: demo_user.id,
  deck_id: poker_deck.id
)

#tempo studies----------------------------------
tempo_du_cs1 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card1.id,
  studier_id: demo_user.id,
  deck_id: tempo_deck.id
)
tempo_du_cs2 = CardStudy.create(
  starred: true,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card2.id,
  studier_id: demo_user.id,
  deck_id: tempo_deck.id
)
tempo_du_cs3 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card3.id,
  studier_id: demo_user.id,
  deck_id: tempo_deck.id
)
tempo_du_cs4 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card4.id,
  studier_id: demo_user.id,
  deck_id: tempo_deck.id
)
tempo_du_cs5 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card5.id,
  studier_id: demo_user.id,
  deck_id: tempo_deck.id
)
tempo_du_cs6 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card6.id,
  studier_id: demo_user.id,
  deck_id: tempo_deck.id
)
tempo_du_cs7 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card7.id,
  studier_id: demo_user.id,
  deck_id: tempo_deck.id
)
tempo_du_cs8 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card8.id,
  studier_id: demo_user.id,
  deck_id: tempo_deck.id
)
tempo_du_cs9 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card9.id,
  studier_id: demo_user.id,
  deck_id: tempo_deck.id
)
tempo_du_cs10 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card10.id,
  studier_id: demo_user.id,
  deck_id: tempo_deck.id
)
tempo_du_cs11 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card11.id,
  studier_id: demo_user.id,
  deck_id: tempo_deck.id
)
tempo_du_cs12 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card12.id,
  studier_id: demo_user.id,
  deck_id: tempo_deck.id
)
tempo_du_cs13 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card13.id,
  studier_id: demo_user.id,
  deck_id: tempo_deck.id
)
tempo_du_cs14 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card14.id,
  studier_id: demo_user.id,
  deck_id: tempo_deck.id
)
tempo_du_cs15 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card15.id,
  studier_id: demo_user.id,
  deck_id: tempo_deck.id
)
tempo_du_cs16 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card16.id,
  studier_id: demo_user.id,
  deck_id: tempo_deck.id
)
tempo_du_cs17 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card17.id,
  studier_id: demo_user.id,
  deck_id: tempo_deck.id
)
tempo_du_cs18 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card18.id,
  studier_id: demo_user.id,
  deck_id: tempo_deck.id
)
tempo_du_cs19 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card19.id,
  studier_id: demo_user.id,
  deck_id: tempo_deck.id
)
tempo_du_cs20 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card20.id,
  studier_id: demo_user.id,
  deck_id: tempo_deck.id
)
tempo_du_cs21 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card21.id,
  studier_id: demo_user.id,
  deck_id: tempo_deck.id
)

tempo_du_cs1 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card1.id,
  studier_id: mrBeau.id,
  deck_id: tempo_deck.id
)
tempo_du_cs2 = CardStudy.create(
  starred: true,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card2.id,
  studier_id: mrBeau.id,
  deck_id: tempo_deck.id
)
tempo_du_cs3 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card3.id,
  studier_id: mrBeau.id,
  deck_id: tempo_deck.id
)
tempo_du_cs4 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card4.id,
  studier_id: mrBeau.id,
  deck_id: tempo_deck.id
)
tempo_du_cs5 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card5.id,
  studier_id: mrBeau.id,
  deck_id: tempo_deck.id
)
tempo_du_cs6 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card6.id,
  studier_id: mrBeau.id,
  deck_id: tempo_deck.id
)
tempo_du_cs7 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card7.id,
  studier_id: mrBeau.id,
  deck_id: tempo_deck.id
)
tempo_du_cs8 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card8.id,
  studier_id: mrBeau.id,
  deck_id: tempo_deck.id
)
tempo_du_cs9 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card9.id,
  studier_id: mrBeau.id,
  deck_id: tempo_deck.id
)
tempo_du_cs10 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card10.id,
  studier_id: mrBeau.id,
  deck_id: tempo_deck.id
)
tempo_du_cs11 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card11.id,
  studier_id: mrBeau.id,
  deck_id: tempo_deck.id
)
tempo_du_cs12 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card12.id,
  studier_id: mrBeau.id,
  deck_id: tempo_deck.id
)
tempo_du_cs13 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card13.id,
  studier_id: mrBeau.id,
  deck_id: tempo_deck.id
)
tempo_du_cs14 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card14.id,
  studier_id: mrBeau.id,
  deck_id: tempo_deck.id
)
tempo_du_cs15 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card15.id,
  studier_id: mrBeau.id,
  deck_id: tempo_deck.id
)
tempo_du_cs16 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card16.id,
  studier_id: mrBeau.id,
  deck_id: tempo_deck.id
)
tempo_du_cs17 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card17.id,
  studier_id: mrBeau.id,
  deck_id: tempo_deck.id
)
tempo_du_cs18 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card18.id,
  studier_id: mrBeau.id,
  deck_id: tempo_deck.id
)
tempo_du_cs19 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card19.id,
  studier_id: mrBeau.id,
  deck_id: tempo_deck.id
)
tempo_du_cs20 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card20.id,
  studier_id: mrBeau.id,
  deck_id: tempo_deck.id
)
tempo_du_cs21 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: tempo_card21.id,
  studier_id: mrBeau.id,
  deck_id: tempo_deck.id
)

#spelling card studies-----------------------------
spelling_du_cs1 = CardStudy.create(
  starred: false,
  correctness_count: -1,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: spelling_card1.id,
  studier_id: demo_user.id,
  deck_id: spelling_deck.id
)
spelling_du_cs2 = CardStudy.create(
  starred: true,
  correctness_count: -3,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: spelling_card2.id,
  studier_id: demo_user.id,
  deck_id: spelling_deck.id
)
spelling_du_cs3 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: spelling_card3.id,
  studier_id: demo_user.id,
  deck_id: spelling_deck.id
)
spelling_du_cs4 = CardStudy.create(
  starred: false,
  correctness_count: 2,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: spelling_card4.id,
  studier_id: demo_user.id,
  deck_id: spelling_deck.id
)
spelling_du_cs5 = CardStudy.create(
  starred: false,
  correctness_count: 3,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: spelling_card5.id,
  studier_id: demo_user.id,
  deck_id: spelling_deck.id
)
spelling_du_cs6 = CardStudy.create(
  starred: false,
  correctness_count: 1,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: spelling_card6.id,
  studier_id: demo_user.id,
  deck_id: spelling_deck.id
)
spelling_du_cs7 = CardStudy.create(
  starred: false,
  correctness_count: 4,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: spelling_card7.id,
  studier_id: demo_user.id,
  deck_id: spelling_deck.id
)
spelling_du_cs8 = CardStudy.create(
  starred: false,
  correctness_count: -2,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: spelling_card8.id,
  studier_id: demo_user.id,
  deck_id: spelling_deck.id
)

spelling_du_cs1 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: spelling_card1.id,
  studier_id: mrBeau.id,
  deck_id: spelling_deck.id
)
spelling_du_cs2 = CardStudy.create(
  starred: true,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: spelling_card2.id,
  studier_id: mrBeau.id,
  deck_id: spelling_deck.id
)
spelling_du_cs3 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: spelling_card3.id,
  studier_id: mrBeau.id,
  deck_id: spelling_deck.id
)
spelling_du_cs4 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: spelling_card4.id,
  studier_id: mrBeau.id,
  deck_id: spelling_deck.id
)
spelling_du_cs5 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: spelling_card5.id,
  studier_id: mrBeau.id,
  deck_id: spelling_deck.id
)
spelling_du_cs6 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: spelling_card6.id,
  studier_id: mrBeau.id,
  deck_id: spelling_deck.id
)
spelling_du_cs7 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: spelling_card7.id,
  studier_id: mrBeau.id,
  deck_id: spelling_deck.id
)
spelling_du_cs8 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: spelling_card8.id,
  studier_id: mrBeau.id,
  deck_id: spelling_deck.id
)

#baseball card studies-----------------------------
baseball_mb_cs1 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: baseball_card1.id,
  studier_id: mrBeau.id,
  deck_id: baseball_deck.id
)
baseball_mb_cs2 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: baseball_card2.id,
  studier_id: mrBeau.id,
  deck_id: baseball_deck.id
)
baseball_mb_cs3 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: baseball_card3.id,
  studier_id: mrBeau.id,
  deck_id: baseball_deck.id
)
baseball_mb_cs4 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: baseball_card4.id,
  studier_id: mrBeau.id,
  deck_id: baseball_deck.id
)
baseball_mb_cs5 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: baseball_card5.id,
  studier_id: mrBeau.id,
  deck_id: baseball_deck.id
)
baseball_mb_cs6 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: baseball_card6.id,
  studier_id: mrBeau.id,
  deck_id: baseball_deck.id
)
baseball_mb_cs7 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: baseball_card7.id,
  studier_id: mrBeau.id,
  deck_id: baseball_deck.id
)
baseball_mb_cs8 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: baseball_card8.id,
  studier_id: mrBeau.id,
  deck_id: baseball_deck.id
)
baseball_mb_cs9 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: baseball_card9.id,
  studier_id: mrBeau.id,
  deck_id: baseball_deck.id
)
baseball_mb_cs10 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: baseball_card10.id,
  studier_id: mrBeau.id,
  deck_id: baseball_deck.id
)

baseball_sc_cs1 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: baseball_card1.id,
  studier_id: steph_curry.id,
  deck_id: baseball_deck.id
)
baseball_sc_cs2 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: baseball_card2.id,
  studier_id: steph_curry.id,
  deck_id: baseball_deck.id
)
baseball_sc_cs3 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: baseball_card3.id,
  studier_id: steph_curry.id,
  deck_id: baseball_deck.id
)
baseball_sc_cs4 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: baseball_card4.id,
  studier_id: steph_curry.id,
  deck_id: baseball_deck.id
)
baseball_sc_cs5 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: baseball_card5.id,
  studier_id: steph_curry.id,
  deck_id: baseball_deck.id
)
baseball_sc_cs6 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: baseball_card6.id,
  studier_id: steph_curry.id,
  deck_id: baseball_deck.id
)
baseball_sc_cs7 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: baseball_card7.id,
  studier_id: steph_curry.id,
  deck_id: baseball_deck.id
)
baseball_sc_cs8 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: baseball_card8.id,
  studier_id: steph_curry.id,
  deck_id: baseball_deck.id
)
baseball_sc_cs9 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: baseball_card9.id,
  studier_id: steph_curry.id,
  deck_id: baseball_deck.id
)
baseball_sc_cs10 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: baseball_card10.id,
  studier_id: steph_curry.id,
  deck_id: baseball_deck.id
)

baseball_pbj_cs1 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: baseball_card1.id,
  studier_id: pbj.id,
  deck_id: baseball_deck.id
)
baseball_pbj_cs2 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: baseball_card2.id,
  studier_id: pbj.id,
  deck_id: baseball_deck.id
)
baseball_pbj_cs3 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: baseball_card3.id,
  studier_id: pbj.id,
  deck_id: baseball_deck.id
)
baseball_pbj_cs4 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: baseball_card4.id,
  studier_id: pbj.id,
  deck_id: baseball_deck.id
)
baseball_pbj_cs5 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: baseball_card5.id,
  studier_id: pbj.id,
  deck_id: baseball_deck.id
)
baseball_pbj_cs6 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: baseball_card6.id,
  studier_id: pbj.id,
  deck_id: baseball_deck.id
)
baseball_pbj_cs7 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: baseball_card7.id,
  studier_id: pbj.id,
  deck_id: baseball_deck.id
)
baseball_pbj_cs8 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: baseball_card8.id,
  studier_id: pbj.id,
  deck_id: baseball_deck.id
)
baseball_pbj_cs9 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: baseball_card9.id,
  studier_id: pbj.id,
  deck_id: baseball_deck.id
)
baseball_pbj_cs10 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: baseball_card10.id,
  studier_id: pbj.id,
  deck_id: baseball_deck.id
)

#civil war card studies-----------------------------
civil_war_mb_cs1 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: civil_war_card1.id,
  studier_id: mrBeau.id,
  deck_id: civil_war_deck.id
)
civil_war_mb_cs2 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: civil_war_card2.id,
  studier_id: mrBeau.id,
  deck_id: civil_war_deck.id
)
civil_war_mb_cs3 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: civil_war_card3.id,
  studier_id: mrBeau.id,
  deck_id: civil_war_deck.id
)
civil_war_mb_cs4 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: civil_war_card4.id,
  studier_id: mrBeau.id,
  deck_id: civil_war_deck.id
)
civil_war_pbj_cs1 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: civil_war_card1.id,
  studier_id: pbj.id,
  deck_id: civil_war_deck.id
)
civil_war_pbj_cs2 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: civil_war_card2.id,
  studier_id: pbj.id,
  deck_id: civil_war_deck.id
)
civil_war_pbj_cs3 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: civil_war_card3.id,
  studier_id: pbj.id,
  deck_id: civil_war_deck.id
)
civil_war_pbj_cs4 = CardStudy.create(
  starred: false,
  correctness_count: 0,
  learn_count: 0,
  write_count: 0,
  spell_count: 0,
  test_count: 0,
  card_id: civil_war_card4.id,
  studier_id: pbj.id,
  deck_id: civil_war_deck.id
)