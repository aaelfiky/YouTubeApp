import { expect } from 'chai';
import store from '../../src/store';

describe('Search Query', async () => {
  it('Gets Search Query', async () => {
    const search = 'Amr Diab';
    let expected = '';
    await store.dispatch('setSearch', search).then(() => {
      expected = store.getters.getSearchQuery;
    });
    expect(expected).to.equal(search);
  });
});
