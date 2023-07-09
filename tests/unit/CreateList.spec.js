import { shallowMount } from '@vue/test-utils';
import CreateList from '@/views/CreateList.vue';

describe('CreateList', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CreateList);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should add a new ToDoListe when createToDoListe is called with valid inputs', async () => {
    // Set input values
    wrapper.setData({
      aufgabentitel: 'Test Aufgabentitel',
      aufgabe: 'Test Aufgabe',
      date: '2023-07-08',
      dringlichkeit: 'HOCH',
    });

    // Enable the inputs before calling the method
    wrapper.vm.disableInputs = false;

    // Call the method
    wrapper.vm.createToDoListe();

    // Wait for the Vue.nextTick() to ensure the DOM is updated
    await wrapper.vm.$nextTick();

    // Check if the inputs are disabled
    expect(wrapper.find('input[type="text"]').element.disabled).toBe(true);
    expect(wrapper.find('textarea').element.disabled).toBe(true);
    expect(wrapper.find('input[type="date"]').element.disabled).toBe(true);
    expect(wrapper.find('select').element.disabled).toBe(true);
  });
});
