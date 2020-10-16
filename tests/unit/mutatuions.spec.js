import { expect } from 'chai';
// import { shallowMount } from '@vue/test-utils';
import { mutations } from '../../src/store/index';
// import HelloWorld from '@/components/HelloWorld.vue';

const { increment } = mutations;
// destructure assign `mutations`

describe('mutations', () => {
  it('INCREMENT', () => {
    // mock state
    const state = { count: 0 };
    // apply mutation
    increment(state);
    // assert result
    expect(state.count).to.equal(1);
  });
});
