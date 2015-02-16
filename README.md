## ALTO XML Command Line Text Parser

---

A simple command line script written in Node that takes as input an XML file in the ALTO schema and an output file.
It will strip the text from the XML and save it to the output. The XML file must use the [ALTO 2.0 schema](http://www.loc.gov/standards/alto/).

Instructions for Use:

1. Install [NodeJS](http://nodejs.org/)
2. Install [NPM] (https://www.npmjs.com/)
3. Clone this Repo
4. From the command line CD into the repo where you saved the repo and run `npm install`
5. Run `node parser.js [input file].xml [output file].txt`