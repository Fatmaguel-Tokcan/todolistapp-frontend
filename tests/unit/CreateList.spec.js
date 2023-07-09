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
  it('should return the total number of ToDo lists', () => {
    const wrapper = shallowMount(CreateList)
    wrapper.setData({
      ToDoListe: [
        {
          id: 1,
          aufgabentitel: 'Test Aufgabentitel 1',
          aufgabe: 'Test Aufgabe 1',
          datum: '2023-07-08',
          dringlichkeit: 'HOCH',
          erledigt: false
        },
        {
          id: 2,
          aufgabentitel: 'Test Aufgabentitel 2',
          aufgabe: 'Test Aufgabe 2',
          datum: '2023-07-09',
          dringlichkeit: 'MITTEL',
          erledigt: false
        },
        {
          id: 3,
          aufgabentitel: 'Test Aufgabentitel 3',
          aufgabe: 'Test Aufgabe 3',
          datum: '2023-07-10',
          dringlichkeit: 'NIEDRIG',
          erledigt: false
        }
      ]
    })

    expect(wrapper.vm.ToDoListe.length).toBe(3)
  })
  it('initializes the component with empty input fields', () => {
    const wrapper = shallowMount(CreateList);
    expect(wrapper.vm.aufgabentitel).toBe('');
    expect(wrapper.vm.aufgabe).toBe('');
    expect(wrapper.vm.date).toBe(null);
    expect(wrapper.vm.dringlichkeit).toBe('');
  });

  it('renders the component properly', () => {
    const wrapper = shallowMount(CreateList);
    expect(wrapper.exists()).toBe(true);
  });

});
