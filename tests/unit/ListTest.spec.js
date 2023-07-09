import { shallowMount } from '@vue/test-utils';
import ToDoListe from '@/views/List.vue';

describe('ToDoListe', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(ToDoListe);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('initializes the component with empty input fields', () => {
    expect(wrapper.vm.aufgabentitel).toBe('');
    expect(wrapper.vm.aufgabe).toBe('');
    expect(wrapper.vm.date).toBe(null);
    expect(wrapper.vm.dringlichkeit).toBe('');
  });

  it('renders the component properly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('filters the ToDoListe by alphabetical order when filterOption is set to "alphabet"', () => {
    wrapper.setData({
      filterOption: 'alphabet',
      ToDoListe: [
        { id: 1, aufgabentitel: 'C', aufgabe: 'Task C', datum: '2023-07-10', dringlichkeit: 'NIEDRIG', erledigt: false },
        { id: 2, aufgabentitel: 'A', aufgabe: 'Task A', datum: '2023-07-08', dringlichkeit: 'HOCH', erledigt: false },
        { id: 3, aufgabentitel: 'B', aufgabe: 'Task B', datum: '2023-07-09', dringlichkeit: 'MITTEL', erledigt: false }
      ]
    });

    const filteredToDoListe = wrapper.vm.filteredToDoListe;
    expect(filteredToDoListe[0].aufgabentitel).toBe('A');
    expect(filteredToDoListe[1].aufgabentitel).toBe('B');
    expect(filteredToDoListe[2].aufgabentitel).toBe('C');
  });

  it('filters the ToDoListe by urgency order when filterOption is set to "urgency"', () => {
    wrapper.setData({
      filterOption: 'urgency',
      ToDoListe: [
        { id: 1, aufgabentitel: 'Task 1', aufgabe: 'Task 1', datum: '2023-07-10', dringlichkeit: 'NIEDRIG', erledigt: false },
        { id: 2, aufgabentitel: 'Task 2', aufgabe: 'Task 2', datum: '2023-07-08', dringlichkeit: 'HOCH', erledigt: false },
        { id: 3, aufgabentitel: 'Task 3', aufgabe: 'Task 3', datum: '2023-07-09', dringlichkeit: 'MITTEL', erledigt: false }
      ]
    });

    const filteredToDoListe = wrapper.vm.filteredToDoListe;
    expect(filteredToDoListe[0].dringlichkeit).toBe('HOCH');
    expect(filteredToDoListe[1].dringlichkeit).toBe('MITTEL');
    expect(filteredToDoListe[2].dringlichkeit).toBe('NIEDRIG');
  });

  it('filters the ToDoListe by date order when filterOption is set to "date"', () => {
    wrapper.setData({
      filterOption: 'date',
      ToDoListe: [
        { id: 1, aufgabentitel: 'Task 1', aufgabe: 'Task 1', datum: '2023-07-10', dringlichkeit: 'NIEDRIG', erledigt: false },
        { id: 2, aufgabentitel: 'Task 2', aufgabe: 'Task 2', datum: '2023-07-08', dringlichkeit: 'HOCH', erledigt: false },
        { id: 3, aufgabentitel: 'Task 3', aufgabe: 'Task 3', datum: '2023-07-09', dringlichkeit: 'MITTEL', erledigt: false }
      ]
    });

    const filteredToDoListe = wrapper.vm.filteredToDoListe;
    expect(filteredToDoListe[0].datum).toBe('2023-07-08');
    expect(filteredToDoListe[1].datum).toBe('2023-07-09');
    expect(filteredToDoListe[2].datum).toBe('2023-07-10');
  });

  it('does not delete any ToDoListe item when deleteToDoListe is called with an invalid id', async () => {
    // Set up the initial state
    wrapper.setData({
      ToDoListe: [
        { id: 1, aufgabentitel: 'Task 1', aufgabe: 'Task 1', datum: '2023-07-10', dringlichkeit: 'NIEDRIG', erledigt: false },
        { id: 2, aufgabentitel: 'Task 2', aufgabe: 'Task 2', datum: '2023-07-08', dringlichkeit: 'HOCH', erledigt: false },
        { id: 3, aufgabentitel: 'Task 3', aufgabe: 'Task 3', datum: '2023-07-09', dringlichkeit: 'MITTEL', erledigt: false }
      ]
    });

    // Call the method to delete a ToDoListe item with an invalid id
    await wrapper.vm.deleteToDoListe(4);

    // Check if no item is deleted
    expect(wrapper.vm.ToDoListe.length).toBe(3);
  });

});
