Question 1:
Hello,

I'm new to search engines, and there are a lot of concepts I'm not educated on. To make my onboarding smoother, it'd help if you could provide me with some definitions of the following concepts:
- Records
- Indexing

I'm also struggling with understanding what types of metrics would be useful to include in the "Custom Ranking."

Cheers,
George
---
George,

Thanks for reaching out, and I'm happy to answer any questions as you get started. Here are some "human" definitions of the terms you asked about:

- Records: a self-contained set of attributes (keys) and values for those attributes. An example near and dear to my heart: Movies...the record for the movie "The Big Lebowski" could contain attributes like `Release Date: 1998` and `Stars: Jeff Bridges, John Goodman, Steve Buscemi`. When searching or filtering by actor Jeff Bridges, the record for "The Big Lebowski" would be part of the result set because the record contains the value(s) for the attribute `Actor`. [https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/#algolia-records]

- Indexing: creating a collection of records and organizing those records in a particular way to facilitate quick results when interacting with the data. Proper indexing improves user experience by organizing the data in logical ways, helping your users find the right records quickly. One example from Algolia would be having two indices with the same data, but organized differently: Recipes...one index of recipes can be sorted by time (quickest to slowest) for users looking for a quick meal, and another index could be sorted by popularity for users looking for the recipes with the best reviews. [https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/#algolia-index]

- Custom Ranking: going back to the definition of index above, Custom Ranking in Algolia means creating a custom organizing and/or sorting method for your data that makes the most sense to your business goals. Algolia has a set of built-in ranking criteria that we use to help return the right results fast, but you can augment this functionality by adding your own custom criteria. Examples include ratings, video views, conversion rate, etc. [https://www.algolia.com/doc/guides/managing-results/must-do/custom-ranking/#custom-ranking]

 I've included links to our documentation after each so you can dive in further if need be. It's a great resource for both concepts and code/implementation examples...and I hear the search is pretty good too :)

 Please don't hesistate to reach out if you have any further questions.

 Kindly,

 Jason Long
 Solutions Engineer
 Algolia

---

Question 2:
Hello,

Sorry to give you the kind of feedback that I know you do not want to hear, but I really hate the new dashboard design. Clearing and deleting indexes are now several clicks away. I am needing to use these features while iterating, so this is inconvenient.

Regards,
Matt

---

Matt,

First off, thanks for reaching out directly to us about this...we wouldn't be where we are without our customers giving us feedback. I'm sorry that the new design is complicating your workflow; as we add new features and functionality sometimes parts of the UI need to be shifted and relocated for the best possible experience for all users, and I assure you we don't take those design decisions lightly. I will share your feedback with the product team and make sure that your concerns are heard.

If you're doing development often within Algolia, consider using our API client instead of working with indices in the dashboard. There are methods for both of the tasks you mentioned written in a number of different languages, so you could write a small application to handle these operations. Here are links to the API docs for the JS implementation (other languages can be selected via the dropdown on the page):

- [https://www.algolia.com/doc/api-reference/api-methods/clear-objects/]
- [https://www.algolia.com/doc/api-reference/api-methods/delete-index/]

If you have any further questions or would like to discuss how to implement this, please reach out and we'll schedule some time to review.

Thank you again for your candid feedback and for trusting us with your business.

Kindly,

Jason Long
Solutions Engineer
Algolia

---

Question 3:
Hi,

I'm looking to integrate Algolia in my website. Will this be a lot of development work for me? What's the high level process look like?

Regards,
Leo

---

Leo,

Thanks for reaching out! Implementing Algolia into your website is usually a straightforward process, but a lot depends on your setup:

The high-level process of implementing Algolia is: getting your data into Algolia, working with the results to optimize relevance for your users, building the user interface for the search (more on that below) and then iterating and improving on the experience by taking advantage of analytics and insights into search behavior. Here's a case study about how an ecommerce site selling clothes would implement Algolia at a high level: [https://www.algolia.com/doc/guides/going-to-production/case-study/]

As far as the development of the solution goes:

- We have pre-built integrations with a number of ecommerce platforms, CMS and CRM vendors that make the process super simple. You can check those out here: [https://www.algolia.com/integrations/]
- For sites that are not powered by any of our pre-built integrations, we offer a full-featured API client in the web's most popular languages and frameworks like JavaScript, React, PHP, Symfony, Rails, etc. We even offer a production-ready UI library that speeds implementation of Algolia into your site: [https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/js/]
- For integrations that aren't covered by the above, we have an awesome community of users that have posted various implementations and integrations for Algolia for others to use. You can see those here: [https://github.com/algolia/awesome-algolia]

One more resource I'd like to point you to is our resources section: [https://resources.algolia.com] It contains some great content for both business users and developers to learn more about how Algolia works and how to get it to work for you.

If these resources get you kicked off...great! If not and you have additional questions or want a deeper dive into any of these topics, let me know and I'll be happy to set up some time to review with you.

Thanks again for your interest in Algolia!

Kindly,

Jason Long
Solutions Engineer
Algolia
