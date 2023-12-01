export function renderListings(listingsData, parent) {
    parent.append(...listingsData.map())
}