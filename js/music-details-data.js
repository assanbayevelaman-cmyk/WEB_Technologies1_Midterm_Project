// Verified on 2026-11-11. Full album track lists are informational, not new
// Song Library records. Search continues to index the existing 22 records.
const musicDetailsData = [
    {
        id: "after-hours", type: "album", edition: "Standard edition (2020) · 14 tracks",
        tracks: ["Alone Again", "Too Late", "Hardest To Love", "Scared To Live", "Snowchild", "Escape From LA", "Heartless", "Faith", "Blinding Lights", "In Your Eyes", "Save Your Tears", "Repeat After Me (Interlude)", "After Hours", "Until I Bleed Out"],
        sources: [{ title: "Apple Music — After Hours, original 14-track release", url: "https://music.apple.com/us/album/after-hours/1499378108" }]
    },
    {
        id: "future-nostalgia", type: "album", edition: "Original standard edition (2020) · 11 tracks",
        tracks: ["Future Nostalgia", "Don't Start Now", "Cool", "Physical", "Levitating", "Pretty Please", "Hallucinate", "Love Again", "Break My Heart", "Good in Bed", "Boys Will Be Boys"],
        sources: [{ title: "Official Charts — original Future Nostalgia track list", url: "https://www.officialcharts.com/chart-news/dua-lipas-new-album-future-nostalgia-everything-we-know-so-far__28611/" }]
    },
    {
        id: "divide", type: "album", edition: "Standard edition (2017) · 12 tracks",
        tracks: ["Eraser", "Castle on the Hill", "Dive", "Shape of You", "Perfect", "Galway Girl", "Happier", "New Man", "Hearts Don't Break Around Here", "What Do I Know?", "How Would You Feel (Paean)", "Supermarket Flowers"],
        sources: [{ title: "Ed Sheeran — official Divide track listing", url: "https://www.edsheeran.com/music/571" }]
    },
    {
        id: "21", type: "album", edition: "Standard edition (2011) · 11 tracks",
        tracks: ["Rolling in the Deep", "Rumour Has It", "Turning Tables", "Don't You Remember", "Set Fire to the Rain", "He Won't Go", "Take It All", "I'll Be Waiting", "One And Only", "Lovesong", "Someone Like You"],
        sources: [{ title: "XL Recordings — 21, original 11-track release", url: "https://www.xlrecordings.com/releases/21" }]
    },
    {
        id: "when-we-all-fall-asleep", type: "album", edition: "Standard CD edition (2019) · 14 tracks",
        tracks: ["!!!!!!!", "bad guy", "xanny", "you should see me in a crown", "all the good girls go to hell", "wish you were gay", "when the party’s over", "8", "my strange addiction", "bury a friend", "ilomilo", "listen before i go", "i love you", "goodbye"],
        sources: [{ title: "Billie Eilish — official CD track list and release date", url: "https://shopuk.billieeilish.com/products/when-we-all-fall-asleep-where-do-we-go-cd" }]
    },
    {
        id: "fine-line", type: "album", edition: "Standard CD edition (2019) · 12 tracks",
        tracks: ["Golden", "Watermelon Sugar", "Adore You", "Lights Up", "Cherry", "Falling", "To Be So Lonely", "She", "Sunflower, Vol. 6", "Canyon Moon", "Treat People With Kindness", "Fine Line"],
        sources: [
            { title: "Harry Styles — official Fine Line CD track list", url: "https://store-uk.hstyles.co.uk/products/fine-line-cd" },
            { title: "Apple Music — Fine Line release date", url: "https://music.apple.com/us/album/fine-line/1485802965" }
        ]
    },
    {
        id: "the-weeknd", type: "artist",
        biography: "The Weeknd is the stage name of Toronto-born singer Abel Tesfaye. He first drew attention with a series of mixtapes in 2011, including House of Balloons, before releasing his debut studio album Kiss Land in 2013.",
        sources: [{ title: "Canada’s Walk of Fame — The Weeknd biography", url: "https://www.canadaswalkoffame.com/honourees/the-weeknd/" }]
    },
    {
        id: "dua-lipa", type: "artist",
        biography: "Dua Lipa is a British-Albanian singer and songwriter. Her self-titled debut arrived in 2017, followed by Future Nostalgia in 2020, which brought a disco-influenced sound to her pop music.",
        sources: [
            { title: "National Portrait Gallery — Dua Lipa", url: "https://www.npg.org.uk/collections/search/person/mp168266/dua-lipa" },
            { title: "Official Charts — Future Nostalgia", url: "https://www.officialcharts.com/chart-news/dua-lipas-new-album-future-nostalgia-everything-we-know-so-far__28611/" }
        ]
    },
    {
        id: "ed-sheeran", type: "artist",
        biography: "Ed Sheeran is an English singer and songwriter whose music brings together pop and acoustic influences. His 2017 album ÷ includes Shape of You, Perfect and Castle on the Hill.",
        sources: [
            { title: "AllMusic — Ed Sheeran biography", url: "https://www.allmusic.com/artist/ed-sheeran-mn0002639628" },
            { title: "Ed Sheeran — official Divide track listing", url: "https://www.edsheeran.com/music/571" }
        ]
    },
    {
        id: "adele", type: "artist",
        biography: "Adele is an English singer and songwriter known for her powerful voice and emotional songs. She released her debut album 19 in 2008 and followed it with 21 in 2011, including Rolling in the Deep and Someone Like You.",
        sources: [{ title: "Recording Academy — Adele’s 21 and early career", url: "https://www.grammy.com/news/adele-21-10-year-anniversary/" }]
    },
    {
        id: "billie-eilish", type: "artist",
        biography: "Billie Eilish is a singer and songwriter from Los Angeles who works closely with her brother FINNEAS. They recorded her 2019 debut album When We All Fall Asleep, Where Do We Go? in their family home.",
        sources: [{ title: "Recording Academy — FINNEAS and Billie Eilish’s debut album", url: "https://www.grammy.com/news/meet-first-time-grammy-nominee-finneas-billie-eilish-doing-production-no-ones-ever-done/" }]
    },
    {
        id: "harry-styles", type: "artist",
        biography: "Harry Styles is a British singer and songwriter who first became known as a member of One Direction. He released his first solo album in 2017 and followed it with Fine Line in 2019.",
        sources: [{ title: "Recording Academy — Harry Styles’ solo career", url: "https://www.grammy.com/news/harry-styles-2021-grammys-fine-line-watermelon-sugar-adore-you/" }]
    }
];
