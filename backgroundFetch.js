import { db } from './firebaseConfig';

const backgroundFetchTask = async (taskId) => {
  console.log('Background fetch task:', taskId);

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await response.json();
    console.log('Data:', data);

    const timestamp = Date.now();
    await db.ref(`backgroundFetch/${timestamp}`).set({ data });
    console.log(`Data saved to Firebase at ${timestamp}`);
  } catch (error) {
    console.log('Error:', error);
  }

  // Required to signal to iOS that the background task is complete.
  BackgroundFetch.finish(taskId);
};

export default backgroundFetchTask;