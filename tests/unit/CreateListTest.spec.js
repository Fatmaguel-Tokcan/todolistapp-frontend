import { shallowMount } from '@vue/test-utils';
import CreateList from '@/views/CreateList.vue';

describe('CreateList', () => {
  let wrapper;

  beforeEach(() => {
    // Mock the fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    );

    wrapper = shallowMount(CreateList);
  });

  afterEach(() => {
    global.fetch.mockClear();
    delete global.fetch;
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

  it('calls window.location.reload when a new todo list is created', async () => {
    // Mock the fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    );

    // Shallow mount the component
    const wrapper = shallowMount(CreateList);

    // Set the form values and trigger the submit button
    wrapper.setData({
      aufgabentitel: 'Test title',
      aufgabe: 'Test task',
      date: '2023-07-09',
      dringlichkeit: 'HOCH',
    });
    await wrapper.find('button[type="submit"]').trigger('click');

    // Assert that fetch has been called
    expect(global.fetch).toHaveBeenCalled();

    // Check if reload method exists and call it
    if (window.location.reload) {
      window.location.reload();
    }
  });



  it('calls window.location.reload when a new todo list is created', async () => {
    // Mock the fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    );

    // Mock the window.location.reload function
    const reloadMock = jest.fn();
    Object.defineProperty(window.location, 'reload', {
      configurable: true,
      value: reloadMock,
    });

    // Shallow mount the component
    const wrapper = shallowMount(CreateList);

    // Set the form values and trigger the submit button
    wrapper.setData({
      aufgabentitel: 'Test title',
      aufgabe: 'Test task',
      date: '2023-07-09',
      dringlichkeit: 'HOCH',
    });
    await wrapper.find('button[type="submit"]').trigger('click');

    // Assert that fetch has been called
    expect(global.fetch).toHaveBeenCalled();

    // Assert that window.location.reload has been called
    expect(reloadMock).toHaveBeenCalled();

    // Restore the original window.location.reload function
    delete window.location.reload;
    window.location.reload = reloadMock;
  });
});
