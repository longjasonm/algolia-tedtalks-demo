// Data transformation demo
const talks = require('../data/tedtalks/talks.json');
const speakers = require('../data/tedtalks/speakers.json');
const fs = require('fs');
let slimmedDownTalks = [];

function trimTalksDown(talks){
    slimmedDownTalks = talks.map(talk => {
        return {
            objectID: talk.objectID,
            name: talk.name,
            speakers: talk.speakers,
            slug: talk.slug
        }
    });
}
trimTalksDown(talks);


function talksToSpeakers(talks, speakers) {
    // Iterate through all speakers
    for (let i = 0; i < speakers.length; i++) {
        const speaker = speakers[i];
        // filter test: if the name of the speaker equals any of the speakers in the array, then write it to the new attribute.
        const speakerName = speaker.name;
        const result = talks.filter(talk => talk.speakers.find(speaker => speaker === speakerName));
        // create new key on speaker object for talks, then store array of result objects.
        speaker.talks = result;
    }
}

// Refactor
// speakers.forEach(speaker => {
//     const name = speaker.name;
//     const talkJoin = talks.filter(talk => talk.speakers.find(speaker => speaker === name));
//     speakers.talks = talkJoin;
// });

talksToSpeakers(slimmedDownTalks, speakers);
// Write results to json file.
fs.writeFile('../data/speakers_with_talks.json', JSON.stringify(speakers), (err) => {if (err) throw err});