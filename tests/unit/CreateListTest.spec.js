import { shallowMount } from '@vue/test-utils';
import CreateList from '@/views/CreateList.vue';
import flushPromises from 'flush-promises';

// Importiere die mocks.js-Datei
import '../../mocks.js';

describe('CreateList', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CreateList);
  });

  afterEach(() => {
    wrapper.destroy();
  });

it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('initializes data properly', () => {
    expect(wrapper.vm.selectedToDoList).toBeNull();
    expect(wrapper.vm.id).toBe('');
    expect(wrapper.vm.aufgabentitel).toBe('');
    expect(wrapper.vm.aufgabe).toBe('');
    expect(wrapper.vm.date).toBeNull();
    expect(wrapper.vm.dringlichkeit).toBe('');
    expect(wrapper.vm.erledigt).toBe(false);
    expect(wrapper.vm.updatedAufgabentitel).toBe('');
    expect(wrapper.vm.ToDoListe).toEqual([]);
  });

  it('fetches data on mounted', async () => {
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ method: 'GET' })
    );

    await wrapper.vm.$nextTick();

    // Test the result of the fetch request
    expect(wrapper.vm.ToDoListe).toEqual([]);
  });

});
