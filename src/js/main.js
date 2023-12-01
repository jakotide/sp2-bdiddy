import '../scss/main.scss';

// JS
import '../js/components/index.js';
import *  as templates from '../js/templates/listings.js';
import * as listings from '../js/api/listings/index.js';

// listings.getListing("1fd16e0d-8bd0-4aa6-8e82-dc45ad4eb8ad").then(console.log);

async function testTemplates() {
    const cardListings = await listings.getListings();
    console.log('Fetched Listings:', cardListings);

    const newContainer = document.querySelector("#newContainer");
    console.log('New Container:', newContainer);
    const allContainer = document.querySelector("#allContainer");
    
    templates.renderListings(cardListings, newContainer, allContainer);
}

testTemplates();
