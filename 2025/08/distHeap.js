class distHeap {
  constructor(newMax) {
    this.maxResults = newMax || 10;
    this.results = [];     // Den globala listan som håller resultaten
  }

  updateResults(newResult) {
    if (!this.results.find(r => r.pos1 === newResult.pos1 && r.pos2 === newResult.pos2)) {
      if (this.results.length < this.maxResults) {
        this.results.push(newResult);

        this.results.sort((a, b) => a.distance - b.distance);
        return;
      }

      const worstResult = this.results[this.results.length - 1];

      if (newResult.distance < worstResult.distance) {
        this.results.pop();
        this.results.push(newResult);

        this.results.sort((a, b) => a.distance - b.distance);
      }
    }
  }

  getTopResults() {
    return this.results;
  }
}


module.exports = distHeap;