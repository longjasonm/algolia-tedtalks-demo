# algolia-tedtalks-demo

Demonstration of Algolia using TEDTalks data (speakers, talks, and playlists) by Jason Long.

## The Process

After not performing up to my standards in a recent test of my development abilities, I viewed this challenge as an opportunity to utilize a number of different skillsets; some of which are very familiar, others a bit more difficult and stretched my abilities. After spending about 12 hours developing this demonstration, here is an overview of my process and a couple of areas of the application about which I'm pretty proud :).

### The Steps

#### 1. Set up Node.js scaffolding and app structure.
Straightforward...next.

#### 2. Create [`loader.js`](https://github.com/longjasonm/algolia-tedtalks-demo/blob/master/app/loader.js) to load records via API (already have experience doing that via dashboard).
In my previous experience with Algolia, I'd only interacted with the dashboard-based tools for building indicies, tweaking settings, etc., so I set out to build a CLI-based app to serve all of my data for this demo. Admittedly it is far from a production-ready tool, but it steps through the processes of initializing indices, loading data via local flat JSON files, updating settings, and creating replica indicies for a number of different sort orders provided with the demo data. 

#### 3. Create [`app.js`](https://github.com/longjasonm/algolia-tedtalks-demo/blob/master/app/app.js) and [`index.html`](https://github.com/longjasonm/algolia-tedtalks-demo/blob/master/index.html) to initialize Algolia Instantsearch and required widgets for UI.
Since UI/UX design and markup coding is a relative strength, I decided to build my UI without the defauly CSS provided with the Instantsearch library. I used Bootstrap as the framework for rock-solid behavior, responsive design considerations and a handful of UI libraries. I found Instantsearch to be extremely well-documented and helpful; it behaved exactly as I want, and was super extensible for creating the custom UX I desired. The search experience can be demoed here: https://longjasonm.github.io/algolia-tedtalks-demo/.

One of my favorite parts of this build was the custom `sortBy` widget...make sure to check that one out!

#### 4. Extra: transform demo data for better search experience.
Writing algorithms "by hand" (i.e. no Stack Overflow...MDN only) is a weakness of mine, so I wanted to tackle a data transformation task with the data provided by this sample prospect. The first dataset, `talks.json` is a robust set of records which provided a great search experience right away. The second, `speakers.json` was fairly sparse and searching it wouldn't give the user much useful information at all. My goal was to essentially concatenate some basic information about the TED talks and associate them to the speakers who presented them. The result is located at [https://github.com/longjasonm/algolia-tedtalks-demo/blob/master/app/data-transformation.js].

Let's just say there were a couple fist pumps after I got this one right!

#### 5. Project cleanup and documentation.
With that large hurdle out of the way, it was just locally testing everything to get it just right, setting up GitHub pages, and writing this documentation. 

**Would I have done anything differently?**: I think if this was a real-world situation, I wouldn't have agonized over every pixel of the front end. Getting the search behavior and demonstrating the speed and relevance of the Algolia API is really the end goal of a demo like this.

**Future Plans:** Would love to write this in the React Instantsearch library...maybe next time...

This has been a blast...the speed of Algolia, the well-executed APIs, and well-written documentation made this a super engaging project, and it was really hard to step away from the keyboard until it was done. 

Please provide any feedback directly here in the repo, and feel free to share, fork, and comment! 
