import { supabase } from './supabase.js';

let tasks = [];

async function loadTasks() {
  const { data, error } = await supabase.from('tasks').select('*');
  if (!error) {
    tasks = data;
    refreshTaskDropdown();
  } else {
    console.error(error);
  }
}

async function saveTaskToSupabase(task) {
  if (editingIndex !== null && tasks[editingIndex].id) {
    await supabase.from('tasks').update(task).eq('id', tasks[editingIndex].id);
  } else {
    await supabase.from('tasks').insert(task);
  }
  loadTasks();
}
