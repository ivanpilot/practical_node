'use strict';
const fs = require('fs');
const expect = require('chai').expect;
const parseRDF = require('../lib/parse-rdf.js');

const rdf = fs.readFileSync(`${__dirname}/pg132.rdf`);

describe('parseRDF', () => {

    it('should be a function', done => {
        expect(parseRDF).to.be.a('function');
        done();
    });

    it('should parse RDF content', done => {
        const book = parseRDF(rdf);
        expect(book).to.be.an('object');
        expect(book).to.have.a.property('id', 132);
        expect(book).to.have.a.property('title', 'The Art of War');
        done();
    });

});
