# summary-generator
Wikipedia article summary generator

Hosted on https://summary-generator.toolforge.org, though at the moment the UI just sucks.

An API endpoint is available at https://summary-generator.toolforge.org/summary, which takes upto 4 parameters
- article - name of an article on English Wikipedia,
- wikitext - wikitext to generate extract from (specify either `article` or `extract`)
- charLimit - limit the extract to this many characters, or till wherever the sentence ends past this limit.
- hardUpperLimit - a hard upper limit on the number of characters. The extract will be cut off even if the currect sentence hasn't ended. Ellipsis (...) will be added at the end to indicate this.

Sample API request: https://summary-generator.toolforge.org/summary?article=Barack_Obama&charLimit=250&hardUpperLimit=500

The parameters may be sent via GET or POST -- both are supported.