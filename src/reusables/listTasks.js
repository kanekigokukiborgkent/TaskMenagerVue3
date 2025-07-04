export const Tasks = [];

export const firstTask = {
  id: '1',
  Titlu: 'Aprobare Cerere',
  Descriere: 'Aproba cererea clientului #54343',
  Deadline: '2025-06-19',
  Prioritate: 'high',
  Status: 'to do',
  Etichete:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
};
export const secondTask = {
  id: '2',
  Titlu: 'Comanda Nr.09823',
  Descriere: 'Cerceteaza comanda Nr.09823',
  Deadline: '2025-04-19',
  Prioritate: 'medium',
  Status: 'in progres',
  Etichete:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
};
export const thirdTask = {
  id: '3',
  Titlu: 'Cercetare indeplinire cereri',
  Descriere: 'Cerceteaza cazul ordinii indeplinirii cererilor',
  Deadline: '2025-05-20',
  Prioritate: 'low',
  Status: 'done',
  Etichete:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
};
export const forthTask = {
  id: '4',
  Titlu: 'test4',
  Descriere: 'Cerceteaza cazul ordinii indeplinirii cererilor',
  Deadline: '2025-05-20',
  Prioritate: 'low',
  Status: 'done',
  Etichete:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
};
export const fifthTask = {
  id: '5',
  Titlu: 'test5',
  Descriere: 'Cerceteaza cazul ordinii indeplinirii cererilor',
  Deadline: '2025-05-20',
  Prioritate: 'low',
  Status: 'done',
  Etichete:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
};
export const sixthTask = {
  id: '6',
  Titlu: 'test6',
  Descriere: 'Cerceteaza cazul ordinii indeplinirii cererilor',
  Deadline: '2025-05-20',
  Prioritate: 'low',
  Status: 'done',
  Etichete:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
};

Tasks.push({ ...firstTask });
Tasks.push({ ...secondTask });
Tasks.push({ ...thirdTask });
Tasks.push({ ...forthTask });
Tasks.push({ ...fifthTask });
Tasks.push({ ...sixthTask });

export default {
  Tasks,
};
